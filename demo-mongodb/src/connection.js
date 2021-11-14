import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "temporal",
  })
  .catch((err) => console.log(err));

mongoose.connection.on("open", () => console.log("Base de dados conectada!"));

export default mongoose
