import { CLIENT_URL } from "../../common/config";

type CorsConfig = {
    origin: string;
    methods: string[];
}

export const corsConfig: CorsConfig = {
    origin: CLIENT_URL,
    methods: ["GET", "POST"]
};