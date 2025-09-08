import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Default,
  AllowNull,
  Unique,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import Tarjeta from "./Tajeta";
import User from './User';

@Table({
  tableName: "Cliente",
})
class Cliente extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare name: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare last: string;

  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.STRING(60),
  })
  declare email: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare pais: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare direccion: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare ciudad: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING(60),
  })
  declare provincia: string;

  
  @AllowNull(false)
  @Unique(true)
  @Column({
    type: DataType.DECIMAL,
  })
  declare dni: number;

  @AllowNull(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  declare cuenta: boolean;

  @HasMany(() => Tarjeta, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  declare tarjeta: Tarjeta[];

  @ForeignKey(() => User)
    declare userId: number

  @BelongsTo(() => User)
    declare user: User
}

export default Cliente;
