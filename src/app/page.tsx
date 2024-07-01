import Card from "@/components/Card";
import Sidebar from '@/components/Sidebar';
import { FaPeopleGroup } from "react-icons/fa6";
import { FaGears } from "react-icons/fa6";
import { FaBoxesPacking } from "react-icons/fa6";
import { FaArrowsSpin } from "react-icons/fa6";
import { FaFileExcel } from "react-icons/fa";

export default function Home() {
  return (
    <main className="min-h-screen text-black bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <Card name="Produtos" icon={<FaBoxesPacking size={32}/>}  pageLink="/produtos" />
          <Card name="Processos" icon={<FaArrowsSpin size={32} />} pageLink="/processos" />
          <Card name="Colaboradores" icon={<FaPeopleGroup size={32} />} pageLink="/colaboradores" />
          <Card name="Máquinas" icon={<FaPeopleGroup size={32} />} pageLink="/maquinas"/>
          <Card name="Produção" icon={<FaGears size={32} />} pageLink="/producao" />
          <Card name="Relatório" icon={<FaFileExcel size={32}/>} pageLink="/relatorio" />
          
        </div>
      </div>
    </main>
  );
}
