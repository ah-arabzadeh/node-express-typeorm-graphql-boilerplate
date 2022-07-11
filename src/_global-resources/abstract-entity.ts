import {
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    VersionColumn
} from "typeorm";
import {
    ObjectType,
    Field,
    ID
} from "type-graphql";

@ObjectType({ isAbstract: true })
export abstract class AbstractEntity {
    @Field(type => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column()
    createdById: number;

    @Field()
    @Column()
    updatedById: number;

    @Field()
    @Column({
        default: true,
    })
    enable: boolean;

    @Column({
        default: false,
    })
    deleted: boolean;

    @VersionColumn()
    version: number;
}
