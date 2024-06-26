import { AuthenticationData } from "../../types/AuthenticationData";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";
import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = "meuSegredo"; 

export class Authenticator {
    generateToken(info: AuthenticationData): string {
        const token = jwt.sign(
            { id_usuario: info.id_usuario, tipo: info.tipo },
            SECRET_KEY,
            { expiresIn: "12h" }
        );
        return token;
    }

    getTokenData(token: string): AuthenticationData {
        const payload = jwt.verify(token, SECRET_KEY);
        return payload as AuthenticationData;
    }
}

export class HashManager {
    public async hash(text: string): Promise<string> {
        const rounds = Number(process.env.BCRYPT_COST);
        const salt = await bcrypt.genSalt(rounds);
        return bcrypt.hash(text, salt);
    }

    public async compare(text: string, hash: string): Promise<boolean> {
        return bcrypt.compare(text, hash);
    }
}
