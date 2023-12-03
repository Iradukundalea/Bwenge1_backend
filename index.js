import express from "express";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import { userCourseTypedefs } from "./typedefs/userCourseTypedefs.js";
import { moocCourseTypedefs } from "./typedefs/moocCourseTypedefs.js";
import { spocCourseTypedefs } from "./typedefs/spocCourseTypedefs.js";
import { userQuizTypedefs } from "./typedefs/userQuizTypedefs.js";
import { institutionTypeDefs } from "./typedefs/institutionTypedefs.js";
import { BwengeUserTypedefs } from "./typedefs/userTypedefs.js";
import { BwengeshortcoursesTypedefs } from "./typedefs/bwengeshortcoursesTypedefs.js";
import { FollowerFolloweeTypedefs } from "./typedefs/FollowerFolloweeTypedefs.js";
import { bwengearticlesTypedefs } from "./typedefs/bwengearticlesTypedefs.js";
import { userarticlequizTypedefs } from "./typedefs/userarticlequizTypedefs.js";
import { universityProjectsTypedefs } from "./typedefs/universityProjectsTypedefs.js";
import { bwengecommunityTypedefs } from "./typedefs/bwengeCommunityTypedefs.js";
import { bwengeqasTypedefs } from "./typedefs/bwengeqasTypedefs.js";
import { dailyContestTypedefs } from "./typedefs/dailycontestsTypedefs.js";
import { UserDailyContestTypedefs } from "./typedefs/userDailyContestTypedefs.js";

import { moocCourseResolvers } from "./resolvers/moocCourseResolvers.js";
import { spocCourseResolvers } from "./resolvers/spocCourseResolvers.js";
import { userCourseResolvers } from "./resolvers/userCourseResolvers.js";
import { resolverMap } from "./resolvers/dateScalarResolver.js";
import { userQuizResolvers } from "./resolvers/userQuizResolvers.js";
import { InstitutionsResolvers } from "./resolvers/institutionResolver.js";
import { BwengeUserResolver } from "./resolvers/BwengeUserResolver.js";
import { BwengeshortcoursesResolvers } from "./resolvers/BwengeshortcoursesResolvers.js";
import { FollowerFolloweeResolver } from "./resolvers/FollowerFolloweeResolver.js";
import { bwengearticlesResolvers } from "./resolvers/BwengeArticlesResolves.js";
import { userarticlequizResolvers } from "./resolvers/userarticlequizResolvers.js";
import { UnivProjectsResolvers } from "./resolvers/UnivProjectsResolvers.js";
import { BwengeCommunitiesResolvers } from "./resolvers/BwengeCommunitiesResolvers.js";
import { bwengeqasResolvers } from "./resolvers/BwengeQasResolvers.js";
import { DailyContestsResolvers } from "./resolvers/DailyContestsResolvers.js";
import { userDailyContestResolvers } from "./resolvers/userDailyContestResolvers.js";

import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import fileUpload from "express-fileupload";

import ErrorHandler from "./middleware/error.js";

import authRoutes from "./routes/auth.js";
import privateRoutes from "./routes/private.js";
import paperRoutes from "./routes/papers.js";
import coursesRoutes from "./routes/courses.js";
import partnershipRoutes from "./routes/partnership.js";
import serviseRoutes from "./routes/service.js";
import moocRoutes from "./routes/mooccourses.js";
import spocRoutes from "./routes/spoccourse.js";
import enrollRoutes from "./routes/enroll.js";
import quizTimeRoutes from "./routes/quiztime.js";
import articleQuizTimeRoutes from "./routes/articlequiztime.js";
import institutionRoutes from "./routes/institution.js";
import nsangizaRoutes from "./routes/nsangiza.js";
import shortcourseRoutes from "./routes/shortcourse.js";
import subscribeRoutes from "./routes/subscriber.js";
import articleRoutes from "./routes/article.js";
import communityRoutes from "./routes/community.js";
import userdailycontestRoutes from "./routes/userDailyContest.js";

import dotenv from "dotenv";
import server from "http";
import { getS3File } from "./middleware/s3.js";
import https from "https";
import { Server } from "socket.io";
import Websocket from "ws";
dotenv.config({ path: "./config.env" });

const app = express();
const server1 = server.createServer(app);
const io = new Server(server1, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
io.on("connection", function (socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function (data) {
    console.log(data);
  });
});

import { fileURLToPath } from "url";
import { bwengeNsangizaTypedefs } from "./typedefs/bwengensangizaTypedefs.js";
import { nsangizaResolver } from "./resolvers/nsangizaResolver.js";
import { getNsangizaS3File } from "./middleware/NsangizaS3.js";
import { diasporaProjectsTypedefs } from "./typedefs/diasporaProjectsTypedefs.js";
import { diasporaProjectsResolvers } from "./resolvers/diasporaProjectsResolvers.js";
import { getBWENGE_DIASPORA_PROJECTSS3File } from "./middleware/DiasporaProjectsS3.js";
import { bwengelongcoursesTypedefs } from "./typedefs/bwengelongcoursesTypedefs.js";
import { bwengelongcoursesResolvers } from "./resolvers/BwengelongcoursesResolvers.js";
import { getBwengeCourseS3File } from "./middleware/BwengeLongCoursesS3.js";
import { getProfilePicS3File } from "./middleware/ProfilePicturesS3.js";
import { getCommunityProfilePicS3File } from "./middleware/BwengeCommunityS3.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));
// app.use("/ppts", express.static(path.join(__dirname, "ppts")));
// app.use("/courses", express.static(path.join(__dirname, "courses")));
// app.use("/longcourses", express.static(path.join(__dirname, "longcourses")));
// app.use("/Mooccourses", express.static(path.join(__dirname, "Mooccourses")));
app.use("/Mooccourses", (req, res) => {
  console.log(decodeURI(req.originalUrl));
  const theurl = decodeURI(req.originalUrl);
  const resul = getS3File(theurl.substr(1, theurl.length - 1));
  // resul.pipe(res);
  res.send(resul);
});

app.use("/NsangizaTheme", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const resul = getNsangizaS3File(theurl.substr(1, theurl.length - 1));
  // resul.pipe(res);
  res.send(resul);
});
app.use("/Projects", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const fileUrl = getBWENGE_DIASPORA_PROJECTSS3File(
    theurl.substr(1, theurl.length - 1)
  );
  res.redirect(fileUrl);
});
app.use("/profilepics", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const resul = getProfilePicS3File(theurl.substr(1, theurl.length - 1));
  // resul.pipe(res);
  res.send(resul);
});
app.use("/Bwengelongcourses", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const resul = getBwengeCourseS3File(theurl.substr(1, theurl.length - 1));
  // resul.pipe(res);
  res.send(resul);
});
app.use("/Bwengeshortcourses", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const resul = getBwengeCourseS3File(theurl.substr(1, theurl.length - 1));
  // resul.pipe(res);
  res.send(resul);
});

app.use("/communityprofilepics", (req, res) => {
  const theurl = decodeURI(req.originalUrl);
  const resul = getCommunityProfilePicS3File(
    theurl.substr(1, theurl.length - 1)
  );
  // resul.pipe(res);
  res.send(resul);
});

app.use(cors());
app.use("/auth", authRoutes);
app.use("/private", privateRoutes);
app.use("/paper", paperRoutes);
app.use("/course", coursesRoutes);
app.use("/shortcourse", shortcourseRoutes);
app.use("/partnership", partnershipRoutes);
app.use("/service", serviseRoutes);
app.use("/mooc", moocRoutes);
app.use("/spoc", spocRoutes);
app.use("/enroll", enrollRoutes);
app.use("/quizTime", quizTimeRoutes);
app.use("/articlequizTime", articleQuizTimeRoutes);
app.use("/institution", institutionRoutes);
app.use("/article", articleRoutes);
app.use("/nsangiza", nsangizaRoutes);
app.use("/community", communityRoutes);
app.use("/userdailycontest", userdailycontestRoutes);

app.use("", subscribeRoutes);

app.use(ErrorHandler);
io.on("connection", function (socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function (data) {
    console.log(data);
  });
});

async function startServer() {
  const apolloServer = new ApolloServer({
    typeDefs: [
      userCourseTypedefs,
      moocCourseTypedefs,
      userQuizTypedefs,
      institutionTypeDefs,
      BwengeUserTypedefs,
      bwengeNsangizaTypedefs,
      spocCourseTypedefs,
      diasporaProjectsTypedefs,
      bwengelongcoursesTypedefs,
      BwengeshortcoursesTypedefs,
      FollowerFolloweeTypedefs,
      bwengearticlesTypedefs,
      userarticlequizTypedefs,
      universityProjectsTypedefs,
      bwengecommunityTypedefs,
      bwengeqasTypedefs,
      dailyContestTypedefs,
      UserDailyContestTypedefs,
    ],
    resolvers: [
      moocCourseResolvers,
      spocCourseResolvers,
      userCourseResolvers,
      resolverMap,
      userQuizResolvers,
      InstitutionsResolvers,
      BwengeUserResolver,
      nsangizaResolver,
      diasporaProjectsResolvers,
      bwengelongcoursesResolvers,
      BwengeshortcoursesResolvers,
      FollowerFolloweeResolver,
      bwengearticlesResolvers,
      userarticlequizResolvers,
      UnivProjectsResolvers,
      BwengeCommunitiesResolvers,
      bwengeqasResolvers,
      DailyContestsResolvers,
      userDailyContestResolvers,
    ],
    introspection: false,
    playground: false,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app: app });
  app.get("/", (req, res) => {
    res.send("graphql ok golo");
  });

  const CONNECTION_URL =
    process.env.MONGO_URI ||
    "mongodb+srv://elvito21:Joseph21pilots@nodeapp1.dvghq.mongodb.net/bwengedb?retryWrites=true&w=majority";

  mongoose
    .connect(CONNECTION_URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      const PORT = process.env.PORT || 5000;
      server1.listen(PORT, () => {
        console.log(`Listening to port ${PORT}...`);
      });

      console.log("MongoDB connected correctly");
    })
    .catch((error) => console.log(error));
}

startServer();

// const CONNECTION_URL = 'mongodb+srv://elvito21:Joseph21pilots@nodeapp1.dvghq.mongodb.net/bwengedb?retryWrites=true&w=majority';

// const PORT = process.env.PORT || 5000;

// mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
//     .catch((error) => console.log(error))
