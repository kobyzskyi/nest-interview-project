import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryRequestDto {
  @IsOptional()
  @IsString()
  public name: string;
}
