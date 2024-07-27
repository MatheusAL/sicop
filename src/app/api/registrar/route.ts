import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export async function POST(request: Request) {
    try{
        const {email, password, name } = await request.json();
        //validation
        const hashedPassword = await hash(password, 10);
        let user = {
            email: email,
            password: hashedPassword,
            name: name,
        };
        const createUser = await prisma.user.create({ data: user })
        return NextResponse.json({message: 'Conta criada com sucesso!', status: 200, email, hashedPassword});
    } catch(e) {
        console.log({ e });
    }

    return NextResponse.json({message: 'Conta criada com sucesso!', status: 200});
}