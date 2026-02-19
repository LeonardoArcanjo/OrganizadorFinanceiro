import mongoose from "mongoose";

const databaseLogin = process.env.DATABASE_LOGIN;
const databasePwd = encodeURIComponent(process.env.DATABASE_PASSWORD); // encodeURIComponent is called in case password has special characters

async function connectDatabase() {
  mongoose.connect(
    `mongodb://${databaseLogin}:${databasePwd}@mongo:27017/FinancialDB?authSource=admin`
  );
// Change host ip for container name (mongo) to try to connect correctly to database in docker.
  return mongoose.connection;
}

export default connectDatabase;
