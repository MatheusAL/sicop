import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const colaboradores = await prisma.colaborador.findMany();
    return Response.json({ data: colaboradores });
  } catch (error) {
    console.error('Error fetching colaboradores:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newColaborador = await prisma.colaborador.create({
          data: {
            nome: data.nome,
            tempoDisponivel: parseInt(data.tempoDisponivel)
          },
        });
        return new Response(JSON.stringify({ data: newColaborador }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error creating colaborador:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}