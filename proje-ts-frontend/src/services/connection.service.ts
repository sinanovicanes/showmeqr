import { connection } from "@/types/user.types";

export class ConnectionService {
    static instance: ConnectionService;
    validConnections = [
        { name: "github", format: "https://github.com/%s" },
        { name: "twitter", format: "https://twitter.com/%s" },
        { name: "instagram", format: "https://instagram.com/%s" },
        { name: "spotify" },
        { name: "facebook", format: "https://facebook.com/%s" },
        { name: "snapchat" },
        { name: "steam", format: "https://steamcommunity.com/id/%s" }
    ]

    static getInstance() {
        if (!this.instance) {
            this.instance = new ConnectionService();
        }

        return this.instance;
    }

    isValidConnection(name: string) {
        return !!this.validConnections.find(item => item.name == name);
    }

    getAvailableConnections(connections?: connection[]): connection[] {
        const availableConnections: connection[] = [];

        if (!connections) return availableConnections;

        this.validConnections.forEach(con => {
            if (!connections.find(item => item.name == con.name)) {
                availableConnections.push(con);
            }
        });

        return availableConnections;
    }

    getConnectionUrl(connection: string, username: string): string {
        const connectionData = this.validConnections.find(item => item.name == connection);

        if (!connectionData?.format) return "";

        return connectionData.format.replace("%s", username);
    }
}