import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Email: {
          label: "Email",
          type: "text",
          placeholder: "jsmith@gmail.com",
        },
        Password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(
            "http://ear-mart.runasp.net/api/Auth/Login",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                Email: credentials?.Email,
                Password: credentials?.Password,
              }),
            }
          );
          const user = await response.json();

          if (user?.IsAuthenticated) {
            return user;
          } else {
            throw new Error(user?.Message || "Authentication failed");
          }
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // if i want to add more data to the token
      if (user && "Token" in user) {
        const decodedToken = parseJwt(user.Token as string);
        return {
          ...token,
          ...decodedToken,
          token: user.Token,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        IsAuthenticated: token.IsAuthenticated,
        Message: token.Message,
        roles: token.roles,
        Token: token.token,
      };
      return session;
    },
  },
});

export { handler as GET, handler as POST };