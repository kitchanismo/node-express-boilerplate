import { config } from "dotenv";
import "reflect-metadata";
import * as path from "path";
import * as cors from "cors";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { routes } from "./src/routes";
import { authenticateToken, authenticateAdmin } from "./src/utils/jwt";
import { createController } from "./src/makeControllers";
//import { createConnection } from "typeorm";

config();

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use(cors());

const PORT: number = +process.env.PORT || 5000;

// createConnection()
//   .then(async (connection) => {
routes.forEach((route) => {
  app[route.method](
    route.path,
    authenticateToken(route.isProtected),
    authenticateAdmin(route.isAdmin),
    //add middleware here
    createController(route)
  );
});

app.listen(PORT, () => {
  console.log(`Listening on http://${process.env.TYPEORM_HOST}:${PORT}`);
});
//})
// .catch((error) => {
//   console.log(error.message);
// });
