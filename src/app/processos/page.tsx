import ProcessActions from '@/components/ProcessActions';

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

export default function Processos() {
    const machines = [
        {
          id: "INV001",
          name: "Overlock",
          description: "process description"
        },
        {
          id: "INV001",
          name: "Reta",
          description: "process description"
        },
        {
          id: "INV001",
          name: "Colarete",
          description: "process description"
        },
        {
            id: "INV001",
            name: "Refiladeira",
            description: "process description"
        },
        {
            id: "INV001",
            name: "Botoneira",
            description: "process description"
        },
    ]
    return (<main className="min-h-screen p-6">
            <h1 className="text-4xl"> Processos </h1>
            <section className="pt-4 px-2">
                <ProcessActions />
                <Table className="z-0">
                    <TableCaption>Lista dos processos realizados na empresa.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Id</TableHead>
                        <TableHead className="text-center">Nome</TableHead>
                        <TableHead className="text-center">Descrição</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {machines.map((machine) => (
                        <TableRow key={machine.id}>
                            <TableCell className="font-medium text-center">{machine.id}</TableCell>
                            <TableCell className="font-medium text-center">{machine.name}</TableCell>
                            <TableCell className="font-medium text-center">{machine.description}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </section>
        </main>)
}
  
