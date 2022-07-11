import { ArgsType, Field }  from "type-graphql";

@ArgsType()
export class ArgsDeepTgql {

    @Field({ nullable: true })
    goDeep1?: boolean;

    @Field({ nullable: true })
    goDeep2?: boolean;

    @Field({ nullable: true })
    goDeep3?: boolean;

    @Field({ nullable: true })
    goDeep4?: boolean;

    @Field({ nullable: true })
    goDeep5?: boolean;
}
