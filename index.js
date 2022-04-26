import prisma from '@prisma/client';

const prismaClient = new prisma.PrismaClient();

(async () => {
  await prismaClient.user.create({
    data:
          {
            name: 'Daniel',
            birthDate: new Date(),
            country: 'Brasil',
            region: 'NORTE',
          },
  });
})();
