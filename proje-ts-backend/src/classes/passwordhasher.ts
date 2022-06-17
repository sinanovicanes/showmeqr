import bcrypt from "bcrypt";

export class PasswordManager {
    static instance: PasswordManager;

    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new PasswordManager();
        }

        return this.instance;
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, bcrypt.genSaltSync(10));
    }

    async isValidPassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }
}