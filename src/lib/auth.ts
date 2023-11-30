import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from "./prisma";
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/sign-in',
        // signOut:''
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                // const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
                if (!credentials?.email || !credentials?.password) {
                    return null
                }
                const existingUser = await prisma.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })
                if (!existingUser) {
                    return null
                }

                const passwordValid = await compare(credentials.password, existingUser.password)
                if (!passwordValid) {
                    return null
                }
                return {
                    id: `${existingUser.id}`,
                    username: existingUser.username,
                    email: existingUser.email
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            return token
        },
        async session({ session, token }) {

            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }
        }


    }
}