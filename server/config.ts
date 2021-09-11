
import { config } from "dotenv";

config();

const AUTH_SERVICE_URL: string = process.env.AUTH_SERVICE_URL as string;

export { AUTH_SERVICE_URL };