import mysql from "mysql";
import { Config } from "../config";
import { loginData, newUser } from "../types/user.types";
import { PasswordManager } from "./passwordhasher";


export class Database {
    // connection: mysql.Connection;
    pool: mysql.Pool;
    PasswordManager: PasswordManager = PasswordManager.getInstance();
    static instance: Database;

    constructor() {
        this.pool = mysql.createPool(Config.dataBase);
    }

    Query = async (query: string): Promise<any> => new Promise((resolve, reject) => {
        this.pool.query(query, (error, result) => {

            if (error) {
                resolve(false);
                return;
            }

            resolve(result);
        })
    })

    static getInstance() {
        if (this.instance == undefined) {
            this.instance = new Database();
        }

        return this.instance;
    }

    async getNewAddress(): Promise<any> {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let address = "";
    
        for (let i=0; i < 20; i++) {
            address += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        const res = await this.Query(`SELECT id FROM users WHERE address = "${address}"`);

        if (res.length > 0) {
            return await this.getNewAddress();
        }
    
        return address;
    }
    
    async newConnection(userId: number, name: string, username: string) {
        await this.Query(`INSERT INTO user_connections (user_id, name, username) VALUES (${userId}, "${name}", "${username}")`);

        return true;
    }

    async removeConnection(userId: number, name: string) {
        const res = await this.Query(`DELETE FROM user_connections WHERE user_id = "${userId}" AND name = "${name}"`);

        return res.affectedRows > 0;
    }

    async getConnections(userId: number) {
        return await this.Query(`SELECT name, username FROM user_connections WHERE user_id = "${userId}"`);
    }

    async newUser(userData: newUser) {
        const isExist = await this.Query(`SELECT id FROM users WHERE username = "${userData.username}" OR mail = "${userData.mail}"`);
        
        if (isExist.length > 0) {
            return false;
        }

        const address = await this.getNewAddress();
        const res = await this.Query(`INSERT INTO users (username, password, mail, address) VALUES ("${userData.username}", "${await this.PasswordManager.hashPassword(userData.password)}", "${userData.mail}", "${address}")`);

        if (res) {
            return this.login(userData);
        }

        return false;
    }

    async getUserConnections(address: string) {
        const res = await this.Query(`SELECT id FROM users WHERE address = "${address}"`);

        if (res[0]) {
            return await this.getConnections(res[0].id);
        }

        return false;
    }

    async login(loginData: loginData) {
        const res = await this.Query(`SELECT * FROM users WHERE username = "${loginData.username}" OR mail = "${loginData.username}"`);

        if (res[0]) {
            if (await this.PasswordManager.isValidPassword(loginData.password, res[0].password)) {
                return {
                    userId: res[0].id,
                    username: res[0].username,
                    mail: res[0].mail,
                    address: res[0].address,
                    connections: await this.getConnections(res[0].id)
                }
            }
        }

        return false;
    }

    async updateUserImage(userId: number, image: string) {
        await this.Query(`UPDATE users SET image = ${image} WHERE id = ${userId}`);

        return true;
    }
}