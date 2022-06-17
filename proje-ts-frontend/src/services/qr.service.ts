import QR from "qrcode";
import { Config } from "@/config/";

export class QRService {
    static instance: QRService;

    static getInstance() {
        if (!this.instance) {
            this.instance = new QRService();
        }

        return this.instance;
    }

    async createQR(address: string) {
        return await QR.toDataURL(Config.qrUrl + address);
    }
}