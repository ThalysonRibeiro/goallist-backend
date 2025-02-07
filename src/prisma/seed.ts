import prismaClient from ".";

async function seed() {
  // criar usuario
  const user1 = await prismaClient.user.create({
    data: {
      id: "4f742324-9ef8-49ba-bf77-75309b311a02",
      name: "Katarina",
      email: "kat.p@gmail.com",
      password: "$2a$08$JNIbm0QEyqVK.wqlseBTRem6BHzch0xccmC9v.lVmhxn2Y1miprtK",
      goal: {
        create: [
          {
            title: "Exercitar 3 vezes por semana",
            desired_weekly_frequency: 3,
            created_at: new Date('2025-02-05T10:00:00Z'), // Segunda-feira dessa semana
            GoalCompletion: {
              create: [
                {
                  user_id: "4f742324-9ef8-49ba-bf77-75309b311a02",
                  created_at: new Date('2025-02-05T15:30:00Z'), // Segunda-feira
                },
                {
                  user_id: "4f742324-9ef8-49ba-bf77-75309b311a02",
                  created_at: new Date('2025-02-06T14:20:00Z'), // Terça-feira
                },
                {
                  user_id: "4f742324-9ef8-49ba-bf77-75309b311a02",
                  created_at: new Date('2025-02-07T16:45:00Z'), // Quarta-feira
                },
                {
                  user_id: "4f742324-9ef8-49ba-bf77-75309b311a02",
                },
              ]
            },
          },
          {
            title: "Ler 5 vezes por semana",
            desired_weekly_frequency: 5,
            created_at: new Date('2025-02-05T10:00:00Z'), // Segunda-feira dessa semana
            GoalCompletion: {
              create: [
                {
                  user_id: "4f742324-9ef8-49ba-bf77-75309b311a02",
                  created_at: new Date('2025-02-05T20:00:00Z'), // Segunda-feira
                }
              ]
            },
          }
        ],
      },
    },
  });

  console.log({ user1 });
}

seed()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });