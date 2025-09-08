import { Table, Column, Model, DataType, HasMany, BelongsTo, ForeignKey, AllowNull, Unique } from 'sequelize-typescript'
import Cliente from './Cliente'

@Table({
    tableName: 'Tarjeta'
})

class Tarjeta extends Model {

    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare name: string


    @AllowNull(false)
    @Column({
        type: DataType.STRING(100)
    })
    declare tipo: string

    @AllowNull(false)
    @Unique(true)
    @Column({
        type: DataType.DECIMAL
    })
    declare pin: number

    @AllowNull(true)
    @Column({
        type: DataType.DECIMAL
    })
    declare saldo: number


    @ForeignKey(()=> Cliente)
    declare clienteId: number

    @BelongsTo(()=> Cliente)
    declare cliente: Cliente
}

export default Tarjeta