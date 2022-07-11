// https://github.com/typeorm/typeorm/blob/master/docs/connection-options.md
import {
    DataSource,
    EntityTarget,
    ObjectLiteral
} from "typeorm";

export class HelperDB {

    public async findOne<E>(dataSource: DataSource, entity: EntityTarget<E>, options: ObjectLiteral): Promise<E | null> {
        const repo = dataSource.getRepository(entity);
        return repo.findOne(options)
            .then(r => {
                return r;
            })
            .catch(err => {
                throw err;
            });
    }

    public async insert<E>(dataSource: DataSource, entity: EntityTarget<E>, data: E): Promise<E> {
        const repo = dataSource.getRepository(entity);
        return repo.save(data)
            .then(r => {
                return r;
            })
            .catch(err => {
                throw err;
            });
    }
}