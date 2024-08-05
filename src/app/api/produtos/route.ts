import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/services/auth';

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  try {
    if(session?.user?.id){
      const userId = session?.user?.id;
      const produtos = await prisma.produto.findMany({
        where: {userId}
      });
      return Response.json({ data: produtos });
    }
  } catch (error) {
    console.error('Error fetching produtos:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {  
  const session = await auth();
  try {
      if(session?.user?.id){
        const data = await request.json();
        const newProduct = await prisma.produto.create({
          data: {
            nome: data.nome,
            descricao: data.descricao,
            userId: session?.user?.id
          },
        });
        return new Response(JSON.stringify({ data: newProduct }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error creating produto:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
}