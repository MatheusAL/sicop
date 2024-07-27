import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from 'bcrypt'

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../database";

export const {
    handlers,
    auth,
} = NextAuth({ adapter: PrismaAdapter(prisma), 
    pages: {
        signIn: '/auth/',
        verifyRequest: '/auth',
        error: '/auth',
        newUser:'/'
        
    },
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            credentials: {
              email: {},
              password: {}
            },
            async authorize(credentials, req) {
                const user = await prisma.user.findFirstOrThrow({
                    where: {
                        email: credentials.email as string
                    }
                });
                if (!user) {
                    throw new Error("User not found.")
                  }
                const passwordCorrect =  await compare(credentials?.password as string || '', user.password);
                if(passwordCorrect) {
                    return user;
                }


                return null
                }
          })
    ]})