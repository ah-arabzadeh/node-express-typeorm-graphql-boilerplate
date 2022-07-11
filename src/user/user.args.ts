import { ArgsType, Field } from "type-graphql";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserInput } from "./user.input";

@ArgsType()
export class UserArgs {
    @Field()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput;
}
