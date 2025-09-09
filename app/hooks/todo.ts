"use client";

import * as anchor from "@project-serum/anchor";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TODO_PROGRAM_PUBKEY } from "@/connection";
import todoIDL from "@/connection/todo.json";
import { toast } from "sonner";
import { SystemProgram, PublicKey } from "@solana/web3.js";
import { findProgramAddressSync } from "@project-serum/anchor/dist/cjs/utils/pubkey";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { authorFilter } from "@/lib/filter";

type Todo = {
	pubkey: PublicKey;
	authority: PublicKey;
	idx: number;
	content: string;
	marked: boolean;
};

// Hook: expose on-chain todos and actions
export function useTodo() {
	const { connection } = useConnection();
	const wallet = useAnchorWallet();

	const [todos, setTodos] = useState<Todo[]>([]);
	const [loading, setLoading] = useState(false);

	const program = useMemo(() => {
		if (!wallet || !connection) return null;
		const provider = new anchor.AnchorProvider(connection, wallet as any, {
			preflightCommitment: "processed",
		});
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return new (anchor as any).Program(todoIDL as any, TODO_PROGRAM_PUBKEY, provider);
	}, [wallet, connection]);

	const getUserPDA = useCallback((authority: PublicKey) => {
		return findProgramAddressSync([Buffer.from("USER_STATE"), authority.toBuffer()], TODO_PROGRAM_PUBKEY);
	}, []);

	const getTodoPDA = useCallback((authority: PublicKey, idx: number) => {
		return findProgramAddressSync([Buffer.from("TODO_STATE"), authority.toBuffer(), Buffer.from([idx])], TODO_PROGRAM_PUBKEY);
	}, []);

	const fetchTodos = useCallback(async () => {
		if (!program || !wallet) return;
		setLoading(true);
		try {
			const authorBase58 = wallet.publicKey!.toBase58();

			const programAccounts = await connection.getProgramAccounts(TODO_PROGRAM_PUBKEY, {
				filters: [authorFilter(authorBase58)],
			});

			const parsed: Todo[] = [];
			for (const acc of programAccounts) {
				try {
					const decoded = await program.account.todoAccount.fetch(acc.pubkey);
					parsed.push({
						pubkey: acc.pubkey,
						authority: new PublicKey(decoded.authority),
						idx: Number(decoded.idx),
						content: decoded.content as string,
						marked: Boolean(decoded.marked),
					});
				} catch (e) {
					// fallback: ignore malformed account
				}
			}

			// sort by idx asc
			parsed.sort((a, b) => a.idx - b.idx);
			setTodos(parsed);
		} catch (err) {
			console.error("fetchTodos", err);
			toast.error("Failed to fetch todos from chain");
		} finally {
			setLoading(false);
		}
	}, [program, wallet, connection]);

	useEffect(() => {
		if (wallet && program) fetchTodos();
	}, [wallet, program, fetchTodos]);

	const initializeUser = useCallback(async () => {
		if (!program || !wallet) throw new Error("Wallet not connected");
		try {
			const [userPda] = getUserPDA(wallet.publicKey!);
			await program.methods
				.initializeUser()
				.accounts({
					authority: wallet.publicKey!,
					userProfile: userPda,
					systemProgram: SystemProgram.programId,
				})
				.rpc();
			toast.success("User initialized");
			await fetchTodos();
		} catch (err: any) {
			console.error("initializeUser", err);
			toast.error(err?.message ?? "Failed to initialize user");
		}
	}, [program, wallet, getUserPDA, fetchTodos]);

	const addTodo = useCallback(
		async (content: string) => {
			if (!program || !wallet) throw new Error("Wallet not connected");
			try {
					const [userPda] = getUserPDA(wallet.publicKey!);
					const acctInfo = await connection.getAccountInfo(userPda);
					if (!acctInfo) {
						await initializeUser();
						let attempts = 0;
						while (attempts < 6) {
							const ai = await connection.getAccountInfo(userPda);
							if (ai) break;
							await new Promise((r) => setTimeout(r, 500));
							attempts += 1;
						}
					}

					const user = await program.account.userProfile.fetch(userPda);
					const lastTodo = Number(user.lastTodo || 0);
				const [todoPda] = getTodoPDA(wallet.publicKey!, lastTodo);

				await program.methods
					.addTodo(content)
					.accounts({
						userProfile: userPda,
						todoAccount: todoPda,
						authority: wallet.publicKey!,
						systemProgram: SystemProgram.programId,
					})
					.rpc();

				toast.success("Todo added on-chain");
				await fetchTodos();
			} catch (err: any) {
				console.error("addTodo", err);
				toast.error(err?.message ?? "Failed to add todo");
			}
		},
		[program, wallet, getUserPDA, getTodoPDA, fetchTodos]
	);

	const markTodo = useCallback(
		async (idx: number) => {
			if (!program || !wallet) throw new Error("Wallet not connected");
			try {
				const [userPda] = getUserPDA(wallet.publicKey!);
				const [todoPda] = getTodoPDA(wallet.publicKey!, idx);
				await program.methods
					.markTodo(idx)
					.accounts({
						userProfile: userPda,
						todoAccount: todoPda,
						authority: wallet.publicKey!,
						systemProgram: SystemProgram.programId,
					})
					.rpc();
				toast.success("Marked todo");
				await fetchTodos();
			} catch (err: any) {
				console.error("markTodo", err);
				toast.error(err?.message ?? "Failed to mark todo");
			}
		},
		[program, wallet, getUserPDA, getTodoPDA, fetchTodos]
	);

	const removeTodo = useCallback(
		async (idx: number) => {
			if (!program || !wallet) throw new Error("Wallet not connected");
			try {
				const [userPda] = getUserPDA(wallet.publicKey!);
				const [todoPda] = getTodoPDA(wallet.publicKey!, idx);
				await program.methods
					.removeTodo(idx)
					.accounts({
						userProfile: userPda,
						todoAccount: todoPda,
						authority: wallet.publicKey!,
						systemProgram: SystemProgram.programId,
					})
					.rpc();
				toast.success("Removed todo");
				await fetchTodos();
			} catch (err: any) {
				console.error("removeTodo", err);
				toast.error(err?.message ?? "Failed to remove todo");
			}
		},
		[program, wallet, getUserPDA, getTodoPDA, fetchTodos]
	);

	const incomplete = todos.filter((t) => !t.marked).map((t) => t.content);
	const completed = todos.filter((t) => t.marked).map((t) => t.content);

	return {
		todos,
		incomplete,
		completed,
		loading,
		fetchTodos,
		initializeUser,
		addTodo,
		markTodo,
		removeTodo,
	};
}