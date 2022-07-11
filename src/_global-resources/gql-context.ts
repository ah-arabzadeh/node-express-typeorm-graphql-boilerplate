import { Token } from "./";

export interface GQLContext {
    token: string;
    decodedToken: Token;
}