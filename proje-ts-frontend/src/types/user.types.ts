export interface userData {
    username: string;
    address?: string;
    password?: string;
    mail?: string;
}

export interface extendedUserData extends userData {
    userId: number;
    image?: string;
    connections: connection[];
}

export interface connection {
    name: string;
    username?: string;
    format?: string;
}