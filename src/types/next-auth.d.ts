import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      IsAuthenticated: boolean;
      Message: string;
      roles: string;
      Token: string;
      uid: string;
    } & DefaultSession["user"];
  }
  interface User {
    IsAuthenticated: boolean;
    Message: string;
    roles: string;
    Token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    IsAuthenticated: boolean;
    Message: string;
    roles: string;
    token: string;
    uid: string;
  }
}
