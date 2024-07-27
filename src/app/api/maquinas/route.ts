import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const maquinas = await prisma.maquina.findMany();
    return Response.json({ data: maquinas });
  } catch (error) {
    console.error('Error fetching maquinas:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newMaquina = await prisma.maquina.create({
          data: {
            nome: data.nome,
            descricao: data.descricao,
          },
        });
        return new Response(JSON.stringify({ data: newMaquina }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error creating maquina:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}