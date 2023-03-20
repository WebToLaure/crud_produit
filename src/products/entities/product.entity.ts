import { BaseEntity, Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";



@Entity('products')
export class Product extends BaseEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;


    @ApiProperty()
    @Column()
    nom: string;


    @ApiProperty()
    @Column({
        type: "decimal",
        precision: 6,
        scale: 2,
        default: 0
    })
    price: number;


    @ApiProperty()
    @Column()
    quantity: number;


}
