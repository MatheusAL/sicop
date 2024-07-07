import NextAuth from "next-auth"
import Github from "next-auth/providers/github"

import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "../database";

export const{
    handlers: {GET, POST},
    auth,
} = NextAuth({ adapter: PrismaAdapter(prisma), 
    providers: [Github]})