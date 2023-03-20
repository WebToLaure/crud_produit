
import { ApiProperty } from "@nestjs/swagger";
import { IsString,IsNumber, IsNotEmpty} from "class-validator";


export class CreateProductDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    nom: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    quantity: number;

}