import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  timestamps: false,
})
export class User extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  username!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  password!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  email!: string;

  @Default(false)
  @Column({
    type: DataType.BOOLEAN,
  })
  isAdmin!: boolean;
}
