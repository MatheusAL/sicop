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
          ref: "INV001",
          machine: "Overlock",
          description: "process description",
          time: "10"
        },
        {
          id: "INV001",
          ref: "INV001",
          machine: "Reta",
          description: "process description",
          time: "10"
        },
        {
          id: "INV001",
          ref: "INV001",
          machine: "Colarete",
          description: "process description",
          time: "10"
        },
        {
            id: "INV001",
            ref: "INV001",
            machine: "Refiladeira",
            description: "process description",
            time: "10"
        },
        {
            id: "INV001",
            ref: "INV001",
            machine: "Botoneira",
            description: "process description",
            time: "10"
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
                        <TableHead className="text-center">Referência</TableHead>
                        <TableHead className="text-center">Máquina</TableHead>
                        <TableHead className="text-center">Descrição</TableHead>
                        <TableHead className="text-center">Tempo(s)</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {machines.map((machine) => (
                        <TableRow key={machine.id}>
                            <TableCell className="font-medium text-center">{machine.id}</TableCell>
                            <TableCell className="font-medium text-center">{machine.ref}</TableCell>
                            <TableCell className="font-medium text-center">{machine.machine}</TableCell>
                            <TableCell className="font-medium text-center">{machine.description}</TableCell>
                            <TableCell className="font-medium text-center">{machine.time}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </section>
        </main>)
}
  
