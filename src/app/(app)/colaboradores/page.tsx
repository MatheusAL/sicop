import Actions from '@/components/Actions';
import { getUsers } from '@/server/actions';

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

export default function Colaboradores() {
    const users = [
        {
          id: "INV001",
          name: "Matheus",
          available_time: "100",
        },
        {
          id: "INV001",
          name: "Ludimilla",
          available_time: "200",
        },
        {
          id: "INV001",
          name: "Aldo",
          available_time: "200",
        },
    ]
    return (<main className="min-h-screen p-6">
            <h1 className="text-4xl"> Colaboradores </h1>
            <section className="pt-4 px-2">
                <Actions />
                <Table className="z-0">
                    <TableCaption>Lista dos colaboradores da empresa.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Id</TableHead>
                        <TableHead className="text-center">Nome</TableHead>
                        <TableHead className="text-center">Tempo disponível(s)</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className="font-medium text-center">{user.id}</TableCell>
                            <TableCell className="font-medium text-center">{user.name}</TableCell>
                            <TableCell className="text-center">{user.available_time}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                    <TableFooter>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell className="text-center">$2,500.00</TableCell>
                    </TableRow>
                    </TableFooter>
                </Table>
            </section>
        </main>)
}
  
