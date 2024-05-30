import { AuthenticationData } from "../../types/AuthenticationData";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export class Authenticator {
    generateToken(info: AuthenticationData): string {
        const token = jwt.sign(
            { id_usuario: info.id_usuario, tipo: info.tipo }, // Incluir tipo no token
            "meuSegredo",
            { expiresIn: "12h" }
        );
        return token;
    }

    getTokenData(token: string): AuthenticationData {
        const payload = jwt.verify(token, "meuSegredo");
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