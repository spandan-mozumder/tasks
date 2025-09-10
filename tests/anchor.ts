import * as anchor from "@coral-xyz/anchor";
import BN from "bn.js";
import assert from "assert";
import * as web3 from "@solana/web3.js";
import type { Constant } from "../target/types/constant";

describe("Test", () => {
  
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Constant as anchor.Program<Constant>;
  
  it("initialize", async () => {
    
    const newAccountKp = new web3.Keypair();

    
    const data = new BN(42);
    const txHash = await program.methods
      .initialize(data)
      .accounts({
        newAccount: newAccountKp.publicKey,
        signer: program.provider.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([newAccountKp])
      .rpc();
    console.log(`Use 'solana confirm -v ${txHash}' to see the logs`);

    
    await program.provider.connection.confirmTransaction(txHash);

    
    const newAccount = await program.account.newAccount.fetch(
      newAccountKp.publicKey
    );

    console.log("On-chain data is:", newAccount.data.toString());

    
    assert(data.eq(newAccount.data));
  });
});
