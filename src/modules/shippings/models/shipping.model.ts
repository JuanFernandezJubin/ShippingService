import { 
    Model,
    AllowNull, 
    AutoIncrement, 
    Column, 
    NotEmpty, 
    PrimaryKey, 
    Table ,
    DataType,
    NotNull
} from "sequelize-typescript";
import { DataTypes } from "sequelize/types";


export interface ShippingI {
    id?: number,
    customer: string,
    descrip: string,
    status: string,
    origin_lat: number,
    origin_long: number,
    current_lat: number,
    current_long: number,
    end_lat: number,
    end_long: number,
    aprox_distance: number,
    finish_at: Date   
}

@Table({
    tableName: 'shipping',
    timestamps: true
})
export default class Shipping extends Model implements ShippingI {

    @AutoIncrement
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
    })
    id?: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.STRING(100)
    })
    customer!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.TEXT
    })
    descrip!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.STRING(10),
        
    })
    status!: string;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    origin_lat!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    origin_long!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    current_lat!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    current_long!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    end_lat!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.DECIMAL(11,8)
    })
    end_long!: number;

    @AllowNull(false)
    @NotEmpty
    @Column({
        type: DataType.FLOAT
    })
    aprox_distance!: number;

    @AllowNull(false)
    @Column({
        type: DataType.DATE
    })
    finish_at!: Date;
}