import {
  Table,
  Column,
  Model,
  DataType,
  Default,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: "videos",
  timestamps: false,
})
export class Video extends Model {
  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  title!: string;

  @AllowNull(false)
  @Column({
    type: DataType.STRING,
  })
  url!: string;

  @Default(0)
  @Column({
    type: DataType.INTEGER,
  })
  votes!: number;
}
