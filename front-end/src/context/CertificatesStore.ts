import { makeAutoObservable } from "mobx";
import { GiftCertificate } from "../types/gift-certeficates/GiftCertificates";
import GiftCertificateService from "../http/service/GiftCertificatesService";
import { CreateGiftCertificateDto } from "../types/gift-certeficates/CreateGiftCertificateDto";
import { UpdateGiftCertificateDto } from "../types/gift-certeficates/UpdateGiftCertificateDto";

export default class GiftCertificateStore {
  certificates = [] as GiftCertificate[];
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  addCertificate(certificate: GiftCertificate) {
    this.certificates = [...this.certificates, certificate];
  }

  setCertificates(certificates: GiftCertificate[]) {
    this.certificates = certificates;
  }

  async add(dto: CreateGiftCertificateDto) {
    try {
      this.setLoading(true);
      const response = await GiftCertificateService.create(dto);
      this.addCertificate(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async getAll() {
    try {
      this.setLoading(true);
      const response = await GiftCertificateService.getAll();
      this.setCertificates(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }

  async delete(id: number) {
    try {
      await GiftCertificateService.delete(id);
    } catch (e) {
      console.log(e);
    }
  }

  async update(dto: UpdateGiftCertificateDto, id: number) {
    try {
      await GiftCertificateService.update(dto, id);
    } catch (e) {
      console.log(e);
    }
  }

}
