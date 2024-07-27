import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const processos = await prisma.processo.findMany();
    return Response.json({ data: processos });
  } catch (error) {
    console.error('Error fetching maquinas:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newProcesso = await prisma.processo.create({
          data: {
            referencia: data.referencia,
            descricao: data.descricao,
            maquinaId: data.maquinaId,
            produtoId: data.produtoId,
            tempo: parseInt(data.tempo)
          },
        });
        return new Response(JSON.stringify({ data: newProcesso }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error creating processo:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}