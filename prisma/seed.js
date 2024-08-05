const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Criação de assinaturas
  const subscriptionBasic = await prisma.subscription.create({
    data: {
      type: 'basic'
    }
  });

  const subscriptionPremium = await prisma.subscription.create({
    data: {
      type: 'premium'
    }
  });

}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
