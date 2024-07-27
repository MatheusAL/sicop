import ProductionActions from '@/components/ProductionActions';

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

export default function Producao() {
    const production = [
        {
          id: "INV001",
          user: "Matheus",
          product: "Produto 1",
          machine: "Overlock",
          operation: "INV001",
          date: '10/07/2024',
          time: "10"
        },
        {
            id: "INV001",
            user: "Matheus",
            product: "Produto 1",
            machine: "Overlock",
            operation: "INV001",
            date: '10/07/2024',
            time: "10"
        },
        {
            id: "INV001",
            user: "Matheus",
            product: "Produto 1",
            machine: "Overlock",
            operation: "INV001",
            date: '10/07/2024',
            time: "10"
        },
        {
            id: "INV001",
            user: "Matheus",
            product: "Produto 1",
            machine: "Overlock",
            operation: "INV001",
            date: '10/07/2024',
            time: "10"
        },
        {
            id: "INV001",
            user: "Matheus",
            product: "Produto 1",
            machine: "Overlock",
            operation: "INV001",
            date: '10/07/2024',
            time: "10"
        },
    ]
    return (<main className="min-h-screen p-6 w-full">
            <h1 className="text-4xl"> Produção </h1>
            <section className="pt-4 px-2 ">
                <ProductionActions />
                <div className="overflow-auto">
                    <Table className="z-0 min-w-full">
                        <TableCaption>Lista de produção da empresa</TableCaption>
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px] text-center">Id</TableHead>
                            <TableHead className="text-center">Colaborador</TableHead>
                            <TableHead className="text-center">Produto</TableHead>
                            <TableHead className="text-center">Máquina</TableHead>
                            <TableHead className="text-center">Operação</TableHead>
                            <TableHead className="text-center">Data</TableHead>
                            <TableHead className="text-center">Tempo(s)</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {production.map((prod) => (
                            <TableRow key={prod.id}>
                                <TableCell className="font-medium text-center">{prod.id}</TableCell>
                                <TableCell className="font-medium text-center">{prod.user}</TableCell>
                                <TableCell className="font-medium text-center">{prod.product}</TableCell>
                                <TableCell className="font-medium text-center">{prod.machine}</TableCell>
                                <TableCell className="font-medium text-center">{prod.operation}</TableCell>
                                <TableCell className="font-medium text-center">{prod.date}</TableCell>
                                <TableCell className="font-medium text-center">{prod.time}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            </section>
        </main>)
}
  
