import * as jwt from "jsonwebtoken";

export class HelperJWT {

    public static async makeToken(
        payload: string | object,
        secretKey: string,
        algorithm: jwt.Algorithm = "HS256"
    ): Promise<string> {
        return jwt.sign(
            payload,
            secretKey,
            {
                algorithm: algorithm,
            }
        );
    }

    public static async verifyToken(
        token: string,
        secretKey: string,
    ): Promise<jwt.JwtPayload | string | undefined> {
        return jwt.verify(token, secretKey);
    }
}