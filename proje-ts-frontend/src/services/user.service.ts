import { extendedUserData, userData } from "@/types/user.types";
import { ref } from "vue";
import { axios } from "@/api/axios";

const devData = {
    userId: 1,  
    username: "Onur Gök",
    password: "123",
    mail: "onur_gök@gmail.com",
    connections: [
        {name: "github", username: "elit10"},
        {name: "instagram", username: "_onurgok_"},
        {name: "twitter", username: "Crayz_Onur"},
        // {name: "spotify", username: "Deneme"},
        // {name: "snapchat", username: "Deneme"},
        {name: "steam", username: "OnurGok"}
    ]
}

export class UserService {
    static instance: UserService;
    userData = ref<extendedUserData | undefined>();
    editConnections = ref(false);

    static getInstance() {
        if (!this.instance) {
            this.instance = new UserService();
        }

        return this.instance;
    }

    async login(data: userData) {
        const response = await axios.post("/Login", data);

        if (response.data) {
            this.userData.value = response.data;

            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password!);
            return true;
        }

        return false;
    }
    
    async register(data: userData) {
        const response = await axios.post("/Register", data);

        if (response.data) {
            this.userData.value = response.data;

            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password!);
            return true;
        }

        return false;
    }

    async resetMail(data: Partial<userData>) {
        const response = await axios.post("ResetMail", data);

        return response.data;
    }

    logOut() {
        localStorage.clear();
        this.userData.value = undefined;
    }

    getProfilePicture() {
        if (!this.userData.value || !this.userData.value.image) {
            return require('../assets/placeholder.png');
        }

        return this.userData.value.image
    }

    async newConnection(name: string, username: string) {
        const response = await axios.post("/NewConnection", {
            userId: this.userData.value?.userId,
            name,
            username
        });

        this.userData.value!.connections.push({name: name, username});
        return response.data
    }

    async removeConnection(name: string) {
        const index = this.userData.value!.connections.findIndex(connection => connection.name == name);

        if (index != -1) {
            const response = await axios.post("/RemoveConnection", {
                userId: this.userData.value?.userId,
                name
            });
            
            this.userData.value!.connections.splice(index, 1);

            return response.data;
        }
    }

    async updateUserImage(image: string) {
        this.userData.value!.image = image;

        const response = await axios.post("/UpdateUserImage", {
            userId: this.userData.value?.userId,
            image
        });

        return response.data;
    }
}