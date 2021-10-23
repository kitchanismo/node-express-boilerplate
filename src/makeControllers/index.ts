import { IContext } from "../interfaces/IContext";
import { Response, Request } from "express";

export const createController = (route) => {
  return (req: Request, res: Response, next: Function) => {
    const action = new route.controller()[route.action]({
      req,
      res,
      next,
    } as IContext);

    if (action instanceof Promise) {
      return action
        .then((data) => res.send(data))
        .catch((error) => res.status(401).send({ error: error.message }));
    }
    return res.json(action);
  };
};
