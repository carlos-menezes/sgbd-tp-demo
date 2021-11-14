import db from "./connection.js";

const createCollection = async () => {
  await db.connection.createCollection("temporaltest", {
    timeseries: {
      timeField: "timestamp",
      metaField: "metadata",
      granularity: "hours",
    },
  });
};

const insertData = async () => {
  await db.connection.collection("temporaltest").insertMany([
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T00:00:00.000Z"),
      temp: 12,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T04:00:00.000Z"),
      temp: 11,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T08:00:00.000Z"),
      temp: 11,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T12:00:00.000Z"),
      temp: 12,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T16:00:00.000Z"),
      temp: 16,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-18T20:00:00.000Z"),
      temp: 15,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T00:00:00.000Z"),
      temp: 13,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T04:00:00.000Z"),
      temp: 12,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T08:00:00.000Z"),
      temp: 11,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T12:00:00.000Z"),
      temp: 12,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T16:00:00.000Z"),
      temp: 17,
    },
    {
      metadata: { sensorId: 5578, type: "temperature" },
      timestamp: new Date("2021-05-19T20:00:00.000Z"),
      temp: 12,
    },
  ]);
};

const queryData = async () => {
  const data = await db.connection.collection("temporaltest").findOne({
    timestamp: new Date("2021-05-18T00:00:00.000Z"),
  });
  console.log(data);
};

await queryData();

/* const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
});

const studentModel = mongoose.model("Student", studentSchema);

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  students: [
    {
      id: {
        type: mongoose.Types.ObjectId,
        ref: "Student",
      },
      enrolled_at: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  enrolled: {
    type: Number,
    default: 0,
  },
});

const subjectModel = mongoose.model("Subject", subjectSchema);

const student1 = await studentModel.create({
  name: "Francisco Barros",
  number: 2050619,
});

const subject = await subjectModel.create({});
 */
