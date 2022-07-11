import { InputType, Field } from "type-graphql";
import { IsOptional, Length } from "class-validator";
import { User } from "./user.entity";
import { CUSTOM_MSG } from "../_global-resources";

@InputType()
export class UserInput implements Partial<User> {

    @Field()
    @Length(2, 50, {
        message: CUSTOM_MSG.ValidateInput.Msg_Length
    })
    name: string;

    @Field()
    @Length(4, 50, {
        message: CUSTOM_MSG.ValidateInput.Msg_Length
    })
    password: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(2, 50, {
        message: CUSTOM_MSG.ValidateInput.Msg_Length
    })
    persianName: string;

    @Field({ nullable: true })
    @IsOptional()
    @Length(7, 254, {
        message: CUSTOM_MSG.ValidateInput.Msg_Length
    })
    email: string;

    @Field({ nullable: true })
    @IsOptional()
    permissions: string;
}
