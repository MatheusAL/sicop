import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/services/auth';

const prisma = new PrismaClient();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const produtoId = searchParams.get('produtoId');
    const session = await auth();
    try {
      if(session?.user?.id) { 
        let processos = {};
        const userId = session?.user?.id;
        if (!produtoId) {
            processos = await prisma.processo.findMany({
              where: { userId }
            });
            return Response.json({ data: processos });
        }

        processos =  await prisma.processo.findMany({
            where: {
                produtoId: parseInt(produtoId),
            }
        });
        return Response.json({ data: processos });
      }
      
    } catch (error) {
      console.error('Error fetching processos:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
}


export async function POST(request: Request) {
    const session = await auth();
    try {
        if(session?.user?.id) { 
          const data = await request.json();
          const userId = session?.user?.id;
          const newProcesso = await prisma.processo.create({
            data: {
              referencia: data.referencia,
              descricao: data.descricao,
              maquinaId: parseInt(data.maquinaId),
              produtoId: parseInt(data.produtoId),
              tempo: parseInt(data.tempo),
              userId
            },
          });
          return new Response(JSON.stringify({ data: newProcesso }), {
            status: 201,
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (error) {
        console.error('Error creating processo:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
}