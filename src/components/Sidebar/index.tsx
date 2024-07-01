'use client'
import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-gray-600 focus:outline-none md:hidden"
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed h-full inset-y-0 left-0 w-72 z-50 bg-white shadow-md transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:relative md:translate-x-0`}
      >
        <div className="relative h-full">
          <button
            onClick={toggleSidebar}
            className="absolute top-2 right-2 p-2 text-gray-600 focus:outline-none md:hidden"
          >
            <FiX size={24} />
          </button>
          <div className="flex items-center justify-center p-4 border-b">
          <a href="#" className="text-gray-800 text-lg font-semibold">
              SICOP
            </a>
          </div>
          <div className="flex flex-col p-4 space-y-4 mt-10">
            <Link href="/producao" onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Produção
            </Link>
            <Link href="/colaboradores" onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Colaboradores
            </Link>
            <Link href="/maquinas"  onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Máquinas
            </Link>
            <Link href="/processos" onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Processos
            </Link>
            <Link href="/produtos" onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Produtos
            </Link>
            <Link href="/relatorio" onClick={toggleSidebar} className="text-gray-800 hover:text-blue-500">
              Relatório
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
