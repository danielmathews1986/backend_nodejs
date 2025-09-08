import { Table, Column, Model, DataType, HasMany, Default, AllowNull, Unique } from 'sequelize-typescript';
import Budgest from './Budgest';

@Table({
    tableName: 'Users'
})

class User extends Model {
    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.STRING(60)
    })
    declare password: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.STRING(60)
    })
    declare email: string

    @Column({
        type: DataType.STRING(6)
    })
    declare token: string

    @Default(false)
    @Column({
        type: DataType.BOOLEAN
    })
    declare confirmed: boolean

    @HasMany(() => Budgest, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    declare budget: Budgest[]
}

export default User