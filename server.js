import express from "express";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

import mongoose from "mongoose";
import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Mooccourses", express.static(path.join(__dirname, "Mooccourses")));
app.use(cors());

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.use((req, res) => {
    res.send("Hello from express apollo");
  });

  const CONNECTION_URL =
    "mongodb+srv://elvito21:Joseph21pilots@nodeapp1.dvghq.mongodb.net/bwengedb?retryWrites=true&w=majority";

  await mongoose.connect(CONNECTION_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("mongodb connected...");
  const PORT = process.env.PORT || 4000;

  app.listen(PORT, () => console.log("server is running on port 4000"));
}

startServer();
