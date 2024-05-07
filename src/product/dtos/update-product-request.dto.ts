import { Expose } from 'class-transformer';
import { IsIn, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';
import { ProductTypeEnum } from '@app/product/types/product-type.enum';

export class UpdateProductRequestDto {
  @IsString()
  @IsOptional()
  @Expose()
  public readonly name?: string;

  @IsUUID(4, { each: true })
  @IsOptional()
  @Expose()
  public readonly categories?: string[];

  @IsString()
  @IsIn(Object.values(ProductTypeEnum))
  @IsOptional()
  @Expose()
  public readonly type?: ProductTypeEnum;

  @IsObject()
  @IsOptional()
  @Expose()
  public readonly data?: Record<string, unknown>;
}
