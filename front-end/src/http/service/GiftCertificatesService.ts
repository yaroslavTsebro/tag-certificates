import { AxiosResponse } from "axios";
import $api from "..";
import { GiftCertificate } from "../../types/gift-certeficates/GiftCertificates";
import { CreateGiftCertificateDto } from "../../types/gift-certeficates/CreateGiftCertificateDto";
import { UpdateGiftCertificateDto } from "../../types/gift-certeficates/UpdateGiftCertificateDto";

export default class GiftCertificateService {
  static async create(
    dto: CreateGiftCertificateDto
  ): Promise<AxiosResponse<GiftCertificate>> {
    return $api.post<GiftCertificate>("/gift-certificate", { ...dto });
  }

  static async getById(id: number): Promise<AxiosResponse<GiftCertificate>> {
    return $api.get<GiftCertificate>(`/gift-certificate/${id}`);
  }

  static async getAll(): Promise<AxiosResponse<GiftCertificate[]>> {
    return $api.get<GiftCertificate[]>(`gift-certificate`);
  }

  static async getByCode(
    code: string
  ): Promise<AxiosResponse<GiftCertificate[]>> {
    return $api.get<GiftCertificate[]>(`/gift-certificate/code/${code}`);
  }

  static async delete(id: number): Promise<AxiosResponse<number>> {
    return $api.delete<number>(`/gift-certificate/${id}`);
  }

  static async update(
    dto: UpdateGiftCertificateDto,
    id: number
  ): Promise<AxiosResponse<GiftCertificate>> {
    return $api.put<GiftCertificate>(`/gift-certificate/${id}`, { ...dto });
  }
}
