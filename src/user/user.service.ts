import { CoreDatabase, CoreLogger } from "../_core";
import { User, UserInput } from "./";
import { AbstractTgqlService, CUSTOM_MSG, GQLContext } from "../_global-resources";
import { HelperCrypto } from "../_helpers";

export class UserService extends AbstractTgqlService<User> {
    constructor() {
        super(User);
    }

    public async findUserByUsernamePassword(username: string, password: string): Promise<User | null> {
        const scope = "UserService/findUserByUsernamePassword";
        return this.db.findOne<User>(CoreDatabase.dataSource, User, { where: { "name": username } })
            .then(async usr => {
                if (usr !== null) { //user exist
                    if (await HelperCrypto.verifyHashedString(password, usr.password)) {
                        return usr;
                    } else {
                        return null;
                    }
                } else { //user not found
                    return null;
                }
            })
            .catch(err => {
                CoreLogger.error(
                    CUSTOM_MSG.Database.Error_OnSelect,
                    err,
                    scope
                );
                return err;
            });
    }

    public async create(userInput: UserInput, context: GQLContext): Promise<User> {
        const scope = "UserService/create";

        const user = new User();
        Object.assign(user, userInput);
        return HelperCrypto.makeHashString(userInput.password)
            .then(async hs => {
                user.password = hs;
                user.createdById = context.decodedToken.userId;
                user.updatedById = context.decodedToken.userId;
                return super.__create(user)
                    .then(u => {
                        return u;
                    })
                    .catch(err => {
                        return err;
                    });
            }).catch(err => {
                return err;
            });
    }
}
