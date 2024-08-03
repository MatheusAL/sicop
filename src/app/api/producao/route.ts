import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
  try {
    
    const producao = await prisma.producao.findMany();
    return Response.json({ data: producao });
    
    
  } catch (error) {
    console.error('Error fetching producao:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        const newProducao = await prisma.producao.create({
          data: {
            produtoId: parseInt(requestData.produtoId),
            processoId: parseInt(requestData.processoId),
            tempo: parseInt(requestData.tempo),
            data: requestData.date,
            colaboradorId: parseInt(requestData.colaboradorId),
          },
        });
        return new Response(JSON.stringify({ data: newProducao }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error creating producao:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}