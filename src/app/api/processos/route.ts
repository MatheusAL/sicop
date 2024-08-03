import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const produtoId = searchParams.get('produtoId');
  try {
    let processos = {};
    if (!produtoId) {
        processos = await prisma.processo.findMany();
        return Response.json({ data: processos });
    }

    processos =  await prisma.processo.findMany({
        where: {
            produtoId: parseInt(produtoId),
        }
    });
    return Response.json({ data: processos });
    
  } catch (error) {
    console.error('Error fetching processos:', error);
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
            maquinaId: parseInt(data.maquinaId),
            produtoId: parseInt(data.produtoId),
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