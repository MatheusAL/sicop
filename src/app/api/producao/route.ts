import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/services/auth';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const session = await auth();
    try {
        if(session?.user?.id) {
            const userId = session?.user?.id;
            const producao = await prisma.producao.findMany({
                where: { userId },
                include: {
                    colaborador: {
                    select: {
                        nome: true,
                    }
                    },
                    produto: {
                    select: {
                        nome: true,
                    }
                    },
                    processo: {
                    select: {
                        referencia: true,
                    }
                    }
                }
            });
            return Response.json({ data: producao });
        }
    
    
    } catch (error) {
        console.error('Error fetching producao:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}


export async function POST(request: Request) {
    const session = await auth();
    try {
        if(session?.user?.id) {
            const requestData = await request.json();
            const dateString = requestData.dataProducao;
            const date = new Date(dateString);
            const userId = session?.user?.id;
            const newProducao = await prisma.producao.create({
            data: {
                produtoId: parseInt(requestData.produtoId),
                processoId: parseInt(requestData.processoId),
                colaboradorId: parseInt(requestData.colaboradorId),
                tempo: parseInt(requestData.tempo),
                data: date.toISOString(),
                userId
            },
            });
            return new Response(JSON.stringify({ data: newProducao }), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
            });
        }
      } catch (error) {
        console.error('Error creating producao:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}