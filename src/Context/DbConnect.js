import mongoose, { mongo } from "mongoose";

const databaseLogin = process.env.DATABASE_LOGIN;
const databasePwd = encodeURIComponent(process.env.DATABASE_PASSWORD); // encodeURIComponent is called in case password has special characters

async function connectDatabase() {
  mongoose.connect(
    `mongodb+srv://${databaseLogin}:${databasePwd}@mycluster.g57a8jt.mongodb.net/OrganizadorFinanceiro?retryWrites=true&w=majority&appName=MyCluster`
  );

  return mongoose.connection;
}

export default connectDatabase;
