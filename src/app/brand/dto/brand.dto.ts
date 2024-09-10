import { IsNotEmpty, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';


export class NewBrandDto {
	@IsNotEmpty()
	name: string;

	@IsNotEmpty()
	category_id: string;

	@IsNotEmpty()
	category_name: string;

	@IsNotEmpty()
	sub_category_id: string;

	@IsNotEmpty()
	sub_category_name: string;

	@Optional()
	image: string;
}