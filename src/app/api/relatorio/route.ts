import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  try {
    
    const productionData = await prisma.producao.findMany({
        include: {
            colaborador: {
                select: {
                    id: true,
                    nome: true,
                    tempoDisponivel: true,
                }
            },
        }
    });
    const efficiencyData = productionData.reduce((acc, item) => {
        const { colaborador, data, tempo } = item;
        const dateString = data.toISOString().split('T')[0]; // Get the date part only

        if (!acc[colaborador.id]) {
            acc[colaborador.id] = {};
        }
        if (!acc[colaborador.id][dateString]) {
            acc[colaborador.id][dateString] = { totalTempo: 0, tempoDisponivel: colaborador.tempoDisponivel, nome: colaborador.nome };
        }

        acc[colaborador.id][dateString].totalTempo += tempo;
        return acc;
    }, {});

    const efficiencyReport = [];
    Object.keys(efficiencyData).forEach(colaboradorId => {
        Object.keys(efficiencyData[colaboradorId]).forEach(date => {
            const { totalTempo, tempoDisponivel, nome } = efficiencyData[colaboradorId][date];
            const eficiencia = Math.round((totalTempo / tempoDisponivel) * 100);
            efficiencyReport.push({ nome, date, eficiencia });
        });
    });

    return Response.json({ data: efficiencyReport });
    
    
  } catch (error) {
    console.error('Error fetching relatorio:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}