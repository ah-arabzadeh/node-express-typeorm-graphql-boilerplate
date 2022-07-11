import * as express from "express";
import { CUSTOM_MSG, Token } from "../_global-resources";
import { AuthChecker } from "type-graphql";
import { BASE_CONFIG } from "../base-config";
import { GQLContext } from "../_global-resources";
import { HelperJWT } from "../_helpers";
import { CoreLogger } from "./core.logger";

export class CoreAuth {

    public static async authenticate(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const scope = "CoreAuth/authenticate";

        const token = req.headers.token || null;
        if (typeof token === "string" && token !== null) {
            HelperJWT.verifyToken(token, BASE_CONFIG.jwtSecretKey)
                .then(t => {
                    CoreAuth.refreshToken(<Token>t)
                        .then(r => {
                            if (r == null) {
                                res.status(401);
                                res.json(CUSTOM_MSG.CoreAuth.Error_TokenExpired);
                                res.end;
                            } else {
                                HelperJWT.makeToken(r, BASE_CONFIG.jwtSecretKey)
                                    .then(rt => {
                                        res.set({ "refreshedToken": rt });
                                        next();
                                    })
                                    .catch(err => {
                                        CoreLogger.error(CUSTOM_MSG.CoreAuth.Error_OnMakeRefreshedToken, err, scope);
                                        res.status(401);
                                        res.json(CUSTOM_MSG.CoreAuth.Error_OnMakeRefreshedToken);
                                        res.end;
                                    });
                            }
                        });
                })
                .catch(err => {
                    CoreLogger.error(
                        CUSTOM_MSG.CoreAuth.Error_OnVerifyToken,
                        err,
                        scope
                    );
                    res.status(401);
                    res.json(CUSTOM_MSG.CoreAuth.Error_OnVerifyToken);
                    res.end;
                });
        }
        else {
            res.status(403);
            res.json(CUSTOM_MSG.CoreAuth.Error_AccessDenied);
            res.end;
        }
    }

    public static authChecker: AuthChecker<GQLContext> = (
        { root, args, context, info }, roles,
    ) => {
        const tok: Token = context.decodedToken;
        if (tok !== null) {
            if (tok.permissions) {
                let hasPermission = false;
                for (const val of roles) {
                    if (tok.permissions.includes(val)) {
                        hasPermission = true;
                        break;
                    }
                }
                return hasPermission;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    private static async refreshToken(decodedToken: Token): Promise<Token | null> {
        const scope = "CoreAuth/refreshToken";
        try {
            //client is active
            if ((Date.now() - decodedToken.lastRefresh) < BASE_CONFIG.jwtRefreshPeriod) {
                decodedToken.lastRefresh = Date.now();
                if (decodedToken.lastRefresh < decodedToken.endOfLife) {
                    return decodedToken;
                } else { // token is expired
                    return null;
                }
            }
            //client is idle
            else {
                return null;
            }
        } catch (err) {
            CoreLogger.error("Error on refreshing 'token' ", err, scope);
            return null;
        }
    }

}

