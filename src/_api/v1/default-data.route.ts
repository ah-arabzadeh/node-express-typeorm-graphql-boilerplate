import { Router, Request, Response, NextFunction } from "express";
import * as crypto from "crypto";
import { User, UserService } from "../../user";
import { CoreLogger } from "../../_core";
import { AUTH_PERMISSIONS, CUSTOM_MSG } from "../../_global-resources";
import { HelperCrypto } from "../../_helpers";

const defaultDataRoute = Router();

defaultDataRoute.get("/make-super-admin", async (req: Request, res: Response, next: NextFunction) => {
    const scope = "defaultDataRoute/make-super-admin";
    const userService = new UserService();
    try {
        const t = await userService.__findOneById(1, undefined);
        if (t !== null) { //The `superAdmin` already exist
            next();
        } else {
            const user = new User();
            user.id = 1;
            user.name = "superAdmin";
            user.persianName = "سوپر ادمین";
            user.createdById = 1;
            user.updatedById = 1;
            user.permissions = AUTH_PERMISSIONS.makeSuperAdminPermissions();
            const pass = crypto.randomBytes(3).toString("hex");
            user.password = await HelperCrypto.makeHashString(pass);
            const u = await userService.__create(user);
            if (u instanceof User === false) {
                res.status(500);
                res.json("Can not create the `superAdmin` :(");
                res.end;
            } else {
                res.status(200);
                res.json("The `superAdmin` was made successfully, The password is:`" + pass + "`");
                res.end;
            }
        }
    } catch (err) {
        CoreLogger.error(
            CUSTOM_MSG.UnknownInternalError.txt,
            err,
            scope
        );
        res.status(500);
        res.json(CUSTOM_MSG.UnknownInternalError.txt);
        res.end;
    }
});

export { defaultDataRoute };