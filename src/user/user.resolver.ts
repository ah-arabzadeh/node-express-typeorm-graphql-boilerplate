import {
    Resolver,
    Authorized,
    Mutation,
    Args,
    Ctx
} from "type-graphql";
import { User, UserService } from "./";
import { createAbstractTgqlResolver, AUTH_PERMISSIONS, GQLContext } from "../_global-resources";
import { UserArgs } from "./user.args";

const AbstractResolver = createAbstractTgqlResolver<User>("user", User);

@Resolver(type => User)
export class UserResolver extends AbstractResolver {

    private service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }


    @Authorized(AUTH_PERMISSIONS.makePermissionString(
        AUTH_PERMISSIONS.User.Code,
        AUTH_PERMISSIONS.User.Permissions.Create
    ))
    @Mutation(type => User, { name: "user___Create" })
    public async create(@Args() { user }: UserArgs, @Ctx() context: GQLContext): Promise<User | null> {
        return this.service.create(user, context)
            .then(u => {
                return u;
            })
            .catch(err => {
                return err;
            });
    }
}
