'use client'
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

export interface CustomTableProps {
    data: Array<any>;
    headers: Array<String>;
    tableDescription: String;
}

export default function CustomTable({data, headers, tableDescription}: CustomTableProps){
    
    return (
        <Table className="z-0">
        <TableCaption>{tableDescription}</TableCaption>
        <TableHeader>
        <TableRow>
            {headers.map((header, index) => (
                <TableHead key={index} className="text-center">{header}</TableHead>
            ))}
        </TableRow>
        </TableHeader>
        <TableBody>
        {data.length > 0 ? (
                data.map((item, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                            <TableCell key={colIndex} className="font-medium text-center">
                                {item[header]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={headers.length} className="text-center">
                        Sem dados disponíveis
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    </Table>
    );
}