import {Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, AllowNull} from 'sequelize-typescript'
import Budgest from './Budgest'

@Table({
    tableName: 'expenses'
})

class Expense extends Model{

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string

    @AllowNull(false)
    @Column({
        type: DataType.DECIMAL
    })
    declare aumont: number

    @ForeignKey(()=> Budgest)
    declare budgetId: number

    @BelongsTo(()=> Budgest)
    declare budget: Budgest
}

export default Expense