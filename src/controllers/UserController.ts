import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { IContext } from "./../interfaces/IContext";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async index({ req, res }: IContext) {
    return await this.userService?.getAll();
  }

  async getOne({ req, res }: IContext) {
    return await this.userService?.getOne(+req?.params?.id);
  }

  async store({ req, res }: IContext) {
    const user = req.body as User;
    return await this.userService?.store(user);
  }

  async update({ req, res }: IContext) {
    const user = req.body as User;
    const id = +req?.params?.id;
    return await this.userService?.update(id, user);
  }

  async delete({ req, res }: IContext) {
    return await this.userService?.delete(+req?.params?.id);
  }
}
