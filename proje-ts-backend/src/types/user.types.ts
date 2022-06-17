export interface newUser {
    username: string;
    password: string;
    mail: string;
}

export interface userData extends newUser {
    userId: number;
    connections: connection[];
}

export interface connection {
    name: string;
    username: string;
}

export interface loginData {
    username: string;
    password: string;
}