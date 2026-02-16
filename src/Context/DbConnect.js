import mongoose from "mongoose";

const databaseLogin = process.env.DATABASE_LOGIN;
const databasePwd = encodeURIComponent(process.env.DATABASE_PASSWORD); // encodeURIComponent is called in case password has special characters

async function connectDatabase() {
  mongoose.connect(
    `mongodb://${databaseLogin}:${databasePwd}@localhost:27017/FinancialDB?authSource=admin`
  );

  return mongoose.connection;
}

export default connectDatabase;
