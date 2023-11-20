import { makeAutoObservable } from "mobx";
import UserService from "../http/service/UserService";
import { User } from "../types/user/User";

export default class Store {
  user = {} as User;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: User) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async registration(username: string, email: string, password: string) {
    try {
      const response = await UserService.register({
        username,
        email,
        password,
      });
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await UserService.logout();
      this.setAuth(false);
      this.setUser({} as User);
    } catch (e) {
      console.log(e);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await UserService.refresh();
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}
