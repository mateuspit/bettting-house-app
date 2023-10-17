import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const myEnv = dotenv.config({ path: ".env.development" });
dotenvExpand.expand(myEnv);