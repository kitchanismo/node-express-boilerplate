import { User } from "./../entities/User";

let users: User[] = [
  {
    id: 1,
    username: "kitchan",
    password: "password",
  },
];

export class UserService {
  async getAll() {
    return Promise.resolve<User[]>(users);
  }

  async getOne(id: number) {
    return users.find((user) => user?.id === id);
  }

  async store(user: User) {
    users?.push(user);
    return await users;
  }

  async update(id: number, user: User) {
    const updatedUsers = users?.map((_user) => {
      if (_user?.id === id) return { id: _user?.id, ...user };

      return _user;
    });
    users = updatedUsers;
    return await updatedUsers;
  }

  async delete(id: number) {
    users = users?.filter((user) => user?.id !== id);
    return users;
  }
}
