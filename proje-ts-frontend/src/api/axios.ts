import Axios from "axios";
import { Config } from "@/config/";

export const axios = Axios.create({
    baseURL: Config.axiosURL
});