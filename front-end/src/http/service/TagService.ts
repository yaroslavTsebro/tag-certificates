import { AxiosResponse } from "axios";
import $api from "..";
import { CreateTagDto } from "../../types/tag/CreateTagDto";
import { Tag } from "../../types/tag/Tag";
import { UpdateTagDto } from "../../types/tag/UpdateTagDto";

export default class TagService {
  static async create(dto: CreateTagDto): Promise<AxiosResponse<Tag>> {
    return $api.post<Tag>("/tag", { ...dto });
  }

  static async getById(id: number): Promise<AxiosResponse<Tag>> {
    return $api.get<Tag>(`/tag/${id}`);
  }

  static async getByNameLike(name: string): Promise<AxiosResponse<Tag[]>> {
    return $api.get<Tag[]>(`/tag/name-like/${name}`);
  }

  static async delete(id: number): Promise<AxiosResponse<number>> {
    return $api.delete<number>(`/tag/${id}`);
  }

  static async update(
    dto: UpdateTagDto,
    id: number
  ): Promise<AxiosResponse<Tag>> {
    return $api.put<Tag>(`/tag/${id}`, { ...dto });
  }

  static async getTagsCreatedByUser(): Promise<AxiosResponse<Tag[]>> {
    return $api.get<Tag[]>(`/tag/created-by-me`);
  }
}
