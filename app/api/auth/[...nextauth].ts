import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/app/lib/prisma";
import { compare } from "bcrypt";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: '/login'},
  session: {strategy: 'jwt'},
  providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Username", type: "text", placeholder: "jsmith" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {

      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const existingUser = await prisma.user.findUnique({ where: { email: credentials.email } })
      if (!existingUser) {
        return null
      }

      const passwordMatch = await compare(credentials.password, existingUser.password)
      if (!passwordMatch) {
        return null
      }

      return {
        id: existingUser.id + '',
        name: existingUser.name,
        email: existingUser.email
      }
    }
  })
],
}
export default NextAuth(authOptions)