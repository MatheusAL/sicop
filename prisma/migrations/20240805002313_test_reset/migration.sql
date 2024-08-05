/*
  Warnings:

  - Added the required column `userId` to the `Colaborador` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Maquina` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Processo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Producao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Produto` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subscriptionId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Subscription" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Colaborador" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "tempoDisponivel" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Colaborador_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Colaborador" ("id", "nome", "tempoDisponivel") SELECT "id", "nome", "tempoDisponivel" FROM "Colaborador";
DROP TABLE "Colaborador";
ALTER TABLE "new_Colaborador" RENAME TO "Colaborador";
CREATE TABLE "new_Maquina" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Maquina_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Maquina" ("descricao", "id", "nome") SELECT "descricao", "id", "nome" FROM "Maquina";
DROP TABLE "Maquina";
ALTER TABLE "new_Maquina" RENAME TO "Maquina";
CREATE TABLE "new_Processo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "referencia" TEXT NOT NULL,
    "maquinaId" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "tempo" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Processo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_maquinaId_fkey" FOREIGN KEY ("maquinaId") REFERENCES "Maquina" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Processo_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Processo" ("descricao", "id", "maquinaId", "produtoId", "referencia", "tempo") SELECT "descricao", "id", "maquinaId", "produtoId", "referencia", "tempo" FROM "Processo";
DROP TABLE "Processo";
ALTER TABLE "new_Processo" RENAME TO "Processo";
CREATE TABLE "new_Producao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "colaboradorId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "processoId" INTEGER NOT NULL,
    "data" DATETIME NOT NULL,
    "tempo" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Producao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producao_colaboradorId_fkey" FOREIGN KEY ("colaboradorId") REFERENCES "Colaborador" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producao_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Producao_processoId_fkey" FOREIGN KEY ("processoId") REFERENCES "Processo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Producao" ("colaboradorId", "data", "id", "processoId", "produtoId", "tempo") SELECT "colaboradorId", "data", "id", "processoId", "produtoId", "tempo" FROM "Producao";
DROP TABLE "Producao";
ALTER TABLE "new_Producao" RENAME TO "Producao";
CREATE TABLE "new_Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Produto_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Produto" ("descricao", "id", "nome") SELECT "descricao", "id", "nome" FROM "Produto";
DROP TABLE "Produto";
ALTER TABLE "new_Produto" RENAME TO "Produto";
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "image" TEXT,
    "password" TEXT NOT NULL,
    "subscriptionId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_User" ("createdAt", "email", "emailVerified", "id", "image", "name", "password", "updatedAt") SELECT "createdAt", "email", "emailVerified", "id", "image", "name", "password", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
