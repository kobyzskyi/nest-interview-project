import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryRequestDto {
  @IsOptional()
  @IsString()
  public readonly name?: string;
}
