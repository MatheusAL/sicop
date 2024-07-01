import MachineActions from '@/components/MachineActions';

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

export default function Maquinas() {
    const machines = [
        {
          id: "INV001",
          name: "Overlock",
        },
        {
          id: "INV001",
          name: "Reta",
        },
        {
          id: "INV001",
          name: "Colarete",
        },
        {
            id: "INV001",
            name: "Refiladeira",
        },
        {
            id: "INV001",
            name: "Botoneira",
        },
    ]
    return (<main className="min-h-screen p-6">
            <h1 className="text-4xl"> Máquinas </h1>
            <section className="pt-4 px-2">
                <MachineActions />
                <Table className="z-0">
                    <TableCaption>Lista das máquinas utilizadas na empresa.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Id</TableHead>
                        <TableHead className="text-center">Nome</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {machines.map((machine) => (
                        <TableRow key={machine.id}>
                            <TableCell className="font-medium text-center">{machine.id}</TableCell>
                            <TableCell className="font-medium text-center">{machine.name}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </section>
        </main>)
}
  
