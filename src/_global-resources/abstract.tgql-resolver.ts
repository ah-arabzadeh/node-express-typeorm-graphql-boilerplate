import {
    Resolver,
    Query,
    Arg,
    Int,
    ClassType,
    Args,
    Authorized
} from "type-graphql";
import { EntitySource, AbstractTgqlService, ArgsDeepTgql } from "./";
import { AUTH_PERMISSIONS } from "./";
import { ObjectLiteral } from "typeorm";


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createAbstractTgqlResolver<T extends EntitySource>(suffix: string, objectTypeCls: ClassType) {

    class Service extends AbstractTgqlService<T> {
        constructor() {
            super(objectTypeCls);
        }
    }

    @Resolver({ isAbstract: true })
    abstract class AbstractTgqlResolver {

        private baseService: Service;

        constructor(
            private relationLevel1?: ObjectLiteral,
            private relationLevel2?: ObjectLiteral,
            private relationLevel3?: ObjectLiteral,
            private relationLevel4?: ObjectLiteral,
            private relationLevel5?: ObjectLiteral
        ) {
            this.baseService = new Service();
        }


        @Authorized(AUTH_PERMISSIONS.makeArrayOfPermissionForFindOneByIdQuery())
        @Query(type => objectTypeCls, { name: `${suffix}___FindOneById`, nullable: true })
        public async __findOneById(
            @Arg("id", type => Int) id: number,
            @Args() { goDeep1, goDeep2, goDeep3, goDeep4, goDeep5 }: ArgsDeepTgql
        ): Promise<T | null> {
            const rel = this.__getRel(goDeep1, goDeep2, goDeep3, goDeep4, goDeep5);
            return this.baseService.__findOneById(id, rel)
                .then(t => {
                    return t;
                })
                .catch(err => {
                    return err;
                });
        }

        protected __getRel(
            goDeep1?: boolean,
            goDeep2?: boolean,
            goDeep3?: boolean,
            goDeep4?: boolean,
            goDeep5?: boolean
        ): ObjectLiteral | undefined {

            let rel: object | undefined = undefined;

            if (goDeep1) {
                rel = this.relationLevel1;
            }
            if (goDeep2) {
                rel = this.relationLevel1;
                if (this.relationLevel2) {
                    rel = this.relationLevel2;
                }
            }
            if (goDeep3) {
                rel = this.relationLevel1;
                if (this.relationLevel2) {
                    rel = this.relationLevel2;
                }
                if (this.relationLevel3) {
                    rel = this.relationLevel3;
                }
            }
            if (goDeep4) {
                rel = this.relationLevel1;
                if (this.relationLevel2) {
                    rel = this.relationLevel2;
                }
                if (this.relationLevel3) {
                    rel = this.relationLevel3;
                }
                if (this.relationLevel4) {
                    rel = this.relationLevel4;
                }
            }
            if (goDeep5) {
                rel = this.relationLevel1;
                if (this.relationLevel2) {
                    rel = this.relationLevel2;
                }
                if (this.relationLevel3) {
                    rel = this.relationLevel3;
                }
                if (this.relationLevel4) {
                    rel = this.relationLevel4;
                }
                if (this.relationLevel5) {
                    rel = this.relationLevel5;
                }
            }

            return rel;
        }
    }

    return AbstractTgqlResolver;
}

