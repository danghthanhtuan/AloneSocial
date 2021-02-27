import { str } from "envalid"

const validateEnv = () =>{
    cleanEnv:(process.env, {
        NODE_ENV: str(),
        MONGO_URI :str()
    });
};

export default validateEnv;