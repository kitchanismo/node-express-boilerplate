import { UserController } from "../controllers/UserController";
import { IRoute } from "../interfaces/IRoute";

const userRoutes: IRoute<UserController>[] = [
  {
    method: "get",
    path: "/api/users",
    controller: UserController,
    action: "index",
  },
  {
    method: "get",
    path: "/api/users/:id",
    controller: UserController,
    action: "getOne",
  },
  {
    method: "post",
    path: "/api/users",
    controller: UserController,
    action: "store",
  },
  {
    method: "put",
    path: "/api/users/:id",
    controller: UserController,
    action: "update",
  },
  {
    method: "delete",
    path: "/api/users/:id",
    controller: UserController,
    action: "delete",
  },
];

export const routes = [...userRoutes];
