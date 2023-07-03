import mongoose from "mongoose";

const connectDb = async ()=>{
    return mongoose
    .connect( process.env.MONGO_URL , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.log("db error", error);
      process.exit(1);
    });
}

export default connectDb ;