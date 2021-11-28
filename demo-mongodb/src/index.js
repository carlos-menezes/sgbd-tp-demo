import db from './connection.js'

const createCollection = async () => {
    await db.connection.createCollection('subject', {
        timeseries: {
            timeField: 'timestamp',
            metaField: 'metadata',
            granularity: 'hours'
        }
    })
    await db.connection.createCollection('subject_nontemporal')
}

const insertData = async (database) => {
    await db.connection.collection(database).insertMany([
        {
            metadata: {
                subjectId: 1,
                subjectName: 'Sistemas Gestores de Base de Dados',
                students: [2050619, 200000, 200001, 200002],
                enrolled: 4
            },
            timestamp: new Date('2021-11-05T00:00:00.000Z')
        },
        {
            metadata: {
                subjectId: 1,
                subjectName: 'Sistemas Gestores de Base de Dados',
                students: [2050619, 200000, 200001, 200002, 200003],
                enrolled: 5
            },
            timestamp: new Date('2021-11-06T00:00:00.000Z')
        },
        {
            metadata: {
                subjectId: 1,
                subjectName: 'Sistemas Gestores de Base de Dados',
                students: [2050619, 200000, 200002, 200003],
                enrolled: 4
            },
            timestamp: new Date('2021-11-08T00:00:00.000Z')
        },
        {
            metadata: {
                subjectId: 1,
                subjectName: 'Sistemas Gestores de Base de Dados',
                students: [2050619],
                enrolled: 1
            },
            timestamp: new Date('2021-11-14T00:00:00.000Z')
        }
    ])
}

const setup = async () => {
    try {
        await createCollection()
    } catch {}

    try {
        await insertData('subject')
        await insertData('subject_nontemporal')
    } catch {}
}

const queryData = async (collection) => {
    // Query 1: Quantos alunos estavam inscritos no dia 14/11?
    console.time('Tempo de completude da query 1')
    const query1 = await db.connection.collection(collection).findOne({
        timestamp: new Date('2021-11-14T00:00:00.000Z')
    })
    const res_query1 = query1.metadata.enrolled
    console.timeEnd('Tempo de completude da query 1')
    console.log(`Estavam inscrito(s) ${res_query1} aluno(s) na disciplina de SGDB no dia 14/11.`)

    // Query 2: Quantos alunos desistiram entre o dia 08/11 a 14/11?
    console.time('Tempo de completude da query 2')
    const query2_part1 = await db.connection.collection(collection).findOne({
        timestamp: new Date('2021-11-14T00:00:00.000Z')
    })
    const query2_part2 = await db.connection.collection(collection).findOne({
        timestamp: new Date('2021-11-08T00:00:00.000Z')
    })
    const res_query2 = query2_part2.metadata.enrolled - query2_part1.metadata.enrolled
    console.timeEnd('Tempo de completude da query 2')
    console.log(`Desistiram da disciplina de SGBD ${res_query2} alunos entre 08/11 a 14/11.`)

    // Query 3: Qual foi a média de alunos inscritos durante o dia 05/11 a 14/11?
    const start_query3 = new Date('2021-11-05T00:00:00.000Z')
    const end_query3 = new Date('2021-11-14T00:00:00.000Z')
    let res_query3
    console.time('Tempo de completude da query 3')
    await db.connection
        .collection(collection)
        .aggregate([
            { $match: { timestamp: { $gte: start_query3, $lte: end_query3 } } },
            { $group: { _id: null, average: { $avg: '$metadata.enrolled' } } }
        ])
        .forEach((e) => (res_query3 = e.average))

    console.timeEnd('Tempo de completude da query 3')
    console.log(`Média de alunos em SGBD entre o período 05/11 a 14/11: ${res_query3}`)
}

await setup()
console.log("Temporal\n")
await queryData('subject')
console.log("\nNão Temporal\n")
await queryData('subject_nontemporal')
