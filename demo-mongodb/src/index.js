import db from "./connection.js";

const createCollection = async () => {
  await db.connection.createCollection("subject", {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "hours",
    },
  });
};

const insertData = async () => {
  await db.connection.collection("subject").insertMany([
    {
      metadata: {
        subjectId: 1,
        subjectName: "Sistemas Gestores de Base de Dados",
        students: [2050619, 200000, 200001, 200002],
      },
      timestamp: new Date("2021-11-05T00:00:00.000Z"),
    },
    {
      metadata: {
        subjectId: 1,
        subjectName: "Sistemas Gestores de Base de Dados",
        students: [2050619, 200000, 200001, 200002, 200003],
      },
      timestamp: new Date("2021-11-06T00:00:00.000Z"),
    },
    {
      metadata: {
        subjectId: 1,
        subjectName: "Sistemas Gestores de Base de Dados",
        students: [2050619, 200000, 200002, 200003],
      },
      timestamp: new Date("2021-11-08T00:00:00.000Z"),
    },
    {
      metadata: {
        subjectId: 1,
        subjectName: "Sistemas Gestores de Base de Dados",
        students: [2050619],
      },
      timestamp: new Date("2021-11-14T00:00:00.000Z"),
    },
  ]);
};

const setup = async () => {
  await createCollection();
  await insertData();
};

const queryData = async () => {
  // Query 1: Quantos alunos estavam inscritos no dia 14/11?
  const query1 = await db.connection.collection("subject").findOne({
    timestamp: new Date("2021-11-14T00:00:00.000Z"),
  });
  const res_query1 = query1.metadata.students.length;
  console.log(
    `Estavam inscrito(s) ${res_query1} na disciplina de SGDB no dia 14/11.`
  );

  // Query 2: Quantos alunos desistiram entre o dia 08/11 a 14/11?
  const query2_part1 = await db.connection.collection("subject").findOne({
    timestamp: new Date("2021-11-14T00:00:00.000Z"),
  });
  const query2_part2 = await db.connection.collection("subject").findOne({
    timestamp: new Date("2021-11-08T00:00:00.000Z"),
  });
  const res_query2 =
    query2_part2.metadata.students.length -
    query2_part1.metadata.students.length;
  console.log(
    `Desistiram da disciplina de SGBD ${res_query2} alunos entre 08/11 a 14/11.`
  );

  // Query 3: Qual foi a média de alunos inscritos durante o dia 05/11 a 14/11?
  const start = new Date("2021-11-05T00:00:00.000Z");
  const end = new Date("2021-11-14T00:00:00.000Z");
  const query3 = db.connection.collection("subject").find({
    timestamp: { $gte: start, $lte: end },
  });
  let i = 0;
  let j = 0;
  await query3.forEach((e) => {
    i += e.metadata.students.length;
    j++;
  });
  const res_query3 = i / j;
  console.log(
    `Média de alunos em SGBD entre o período 05/11 a 14/11: ${res_query3}`
  );
};

// Rodar apenas uma vez
//setup();

console.time("Tempo de completude das queries:");
await queryData();
console.timeEnd("Tempo de completude das queries:");
