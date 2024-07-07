import { NextResponse } from "next/server";
import { hash } from 'bcrypt';

export async function POST(request: Request) {
    try{
        const {email, password } = await request.json();
        //validation
        const hashedPassword = await hash(password, 10);
        return NextResponse.json({message: 'success', status: 200, email, hashedPassword});
    } catch(e) {
        console.log({ e });
    }

    return NextResponse.json({message: 'Conta criada com sucesso!', status: 200});
}