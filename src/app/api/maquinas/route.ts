import { PrismaClient } from '@prisma/client';
import { auth } from '@/app/services/auth';

const prisma = new PrismaClient();

export async function GET() {
  const session = await auth();
  try {
    const userId = session?.user.id;
    const maquinas = await prisma.maquina.findMany({
      where: { userId }
    });
    return Response.json({ data: maquinas });
  } catch (error) {
    console.error('Error fetching maquinas:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}


export async function POST(request: Request) {
  const session = await auth();  
  try {
      if(session?.user?.id) { 
        const data = await request.json();
        const userId = session?.user?.id;
        const newMaquina = await prisma.maquina.create({
          data: {
            nome: data.nome,
            descricao: data.descricao,
            userId
          },
        });
        return new Response(JSON.stringify({ data: newMaquina }), {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }
    } catch (error) {
      console.error('Error creating maquina:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
}