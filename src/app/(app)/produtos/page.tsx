import ProdutsActions from '@/components/ProductsActions';

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

export default function Produtos() {
    const products = [
        {
          id: "INV001",
          name: "Produto 1",
          available_time: "100",
        },
        {
          id: "INV001",
          name: "Produto 2",
          available_time: "200",
        },
        {
          id: "INV001",
          name: "Produto 3",
          available_time: "200",
        },
    ]
    return (<main className="min-h-screen p-6">
            <h1 className="text-4xl"> Produtos </h1>
            <section className="pt-4 px-2">
                <ProdutsActions />
                <Table className="z-0">
                    <TableCaption>Lista dos produtos da empresa.</TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-center">Id</TableHead>
                        <TableHead className="text-center">Produto</TableHead>
                        <TableHead className="text-center">Descrição</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium text-center">{product.id}</TableCell>
                            <TableCell className="font-medium text-center">{product.name}</TableCell>
                            <TableCell className="text-center">{product.available_time}</TableCell>
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
  
