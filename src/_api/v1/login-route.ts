import { Router, Request, Response } from "express";
import { BASE_CONFIG } from "../../base-config";
import { HelperJWT } from "../../_helpers";
import { UserService } from "../../user/user.service";
import { Token, CUSTOM_MSG } from "../../_global-resources";
import { CoreLogger } from "../../_core";

const loginRoute = Router();

loginRoute.post("*", async (req: Request, res: Response) => {
    const scope = "loginRoute";
    try {
        const un = req.body.username;
        const pw = req.body.password;
        if (un && pw) {
            const userService: UserService = new UserService();
            userService.findUserByUsernamePassword(un, pw)
                .then(u => {
                    if (u === null) {
                        res.status(404);
                        res.json(CUSTOM_MSG.LoginRoute.Error_UserNotFound);
                        res.end();
                    } else {
                        const token = {} as Token;
                        token.userId = u.id;
                        token.permissions = u.permissions.split("/");
                        token.madeAt = Date.now();
                        token.endOfLife = token.madeAt + BASE_CONFIG.jwtEndOfLife;
                        token.lastRefresh = Date.now();
                        HelperJWT.makeToken(
                            token,
                            BASE_CONFIG.jwtSecretKey,
                            BASE_CONFIG.jwtAlgorithm
                        ).then(j => {
                            res.status(200);
                            res.json({
                                msg: CUSTOM_MSG.LoginRoute.Msg_Welcome,
                                data: {
                                    token: j,
                                }
                            });
                            res.end();

                        }).catch(err => {
                            CoreLogger.error(
                                CUSTOM_MSG.LoginRoute.ErrorOnMakeingToken,
                                err,
                                scope
                            );
                            res.status(500);
                            res.json(CUSTOM_MSG.LoginRoute.ErrorOnMakeingToken);
                            res.end();
                        });
                    }
                })
                .catch(err => {
                    CoreLogger.error(
                        CUSTOM_MSG.LoginRoute.ErrorOnFetchUser,
                        err,
                        scope
                    );
                    res.status(500);
                    res.json(CUSTOM_MSG.LoginRoute.ErrorOnFetchUser);
                    res.end();
                });
        } else {
            res.status(400);
            res.json(CUSTOM_MSG.LoginRoute.Error_InputIsInvalid);
            res.end();
        }
    } catch (error) {
        const msg = CUSTOM_MSG.UnknownInternalError;
        CoreLogger.error(
            msg,
            error,
            scope
        );
        res.status(500);
        res.json(msg);
        res.end();
    }
});

export { loginRoute };