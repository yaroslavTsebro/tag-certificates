import { AxiosResponse } from "axios";
import $api from "..";
import { CreateUserDto } from "../../types/user/CreateUserDto";
import { User } from "../../types/user/User";

export default class UserService {
  static async register({
    username,
    email,
    password,
  }: CreateUserDto): Promise<AxiosResponse<User>> {
    return $api.post<User>("/auth/register", { username, email, password });
  }

  static async login(
    email: string,
    password: string
  ): Promise<AxiosResponse<User>> {
    return $api.post<User>("/auth/login", { email, password });
  }

  static async logout(): Promise<AxiosResponse<User>> {
    return $api.post<User>("/auth/logout");
  }

  static async profile(): Promise<AxiosResponse<User>> {
    return $api.get<User>("/auth/profile");
  }

  static async changeUsername(username: string): Promise<AxiosResponse<User>> {
    return $api.post<User>("/auth/change-username", { username });
  }

  static async delete(): Promise<AxiosResponse<User>> {
    return $api.delete<User>("/auth");
  }
}
