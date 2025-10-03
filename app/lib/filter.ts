export interface Memcmp {
  offset: number;
  bytes: string;
}

export interface AuthorFilter {
  memcmp: Memcmp;
}

export const authorFilter = (authorBase58PublicKey: string): AuthorFilter => ({
  memcmp: {
    offset: 8,
    bytes: authorBase58PublicKey,
  },
});
