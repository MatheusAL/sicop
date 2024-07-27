import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const produtos = await prisma.produto.findMany();
    return Response.json({ data: produtos });
  } catch (error) {
    console.error('Error fetching produtos:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newProduct = await prisma.produto.create({
          data: {
            nome: data.nome,
            descricao: data.descricao,
          },
        });
        return new Response(JSON.stringify({ data: newProduct }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error creating produto:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}