import { EntityTarget, ObjectLiteral } from "typeorm";
import { CoreDatabase, CoreLogger } from "../_core";
import { HelperDB } from "../_helpers";
import { EntitySource, CUSTOM_MSG } from "./";

export abstract class AbstractTgqlService<T extends EntitySource> {

    protected db;
    protected entity: EntityTarget<T>;

    constructor(entity: EntityTarget<T>) {
        this.entity = entity;
        this.db = new HelperDB();
    }

    /**
     *
     * @param id The id of a record
     * @param relations For example: In city table, The relations can be: { county: {province: true} }
     */
    public async __findOneById(id: number, relations: ObjectLiteral | undefined): Promise<T | null> {
        const scope = `AbstractTgqlService(${this.entity})/__findOneById`;
        return this.db.findOne<T>(CoreDatabase.dataSource, this.entity, { where: { id: id }, relations: relations })
            .then(t => {
                return t;
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

    public async __create(input: T): Promise<T> {
        const scope = `AbstractTgqlService(${this.entity})/__create`;
        return this.db.insert<T>(CoreDatabase.dataSource, this.entity, input)
            .then(r => {
                return r;
            })
            .catch(err => {
                CoreLogger.error(
                    CUSTOM_MSG.Database.Error_OnInsert,
                    err,
                    scope
                );
                return err;
            });
    }
}
