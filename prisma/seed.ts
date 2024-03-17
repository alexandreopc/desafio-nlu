import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();
async function main() {
  const password = await hash('abc123', 10);

  await prisma.user.upsert({
    where: { email: 'adm@nlu.com' },
    update: {},
    create: {
      name: 'admin',
      email: 'adm@nlu.com',
      password,
      role: 1,
      tasks: {
        create: [
          {
            name: 'Criar uma nova task',
            content:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          },
          {
            name: 'Task de teste',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
          },
        ],
      },
    },
  });

  await prisma.user.upsert({
    where: { email: 'user@nlu.com' },
    update: {},
    create: {
      name: 'user',
      email: 'user@nlu.com',
      password,
      role: 2,
      tasks: {
        create: [
          {
            name: 'Entregar o desafio ate Domingo',
            content: 'Texto de para preencher espaco.',
          },
          {
            name: 'Eu sou uma task',
            content: 'E sou a descricao da task',
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
