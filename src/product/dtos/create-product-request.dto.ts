import { Expose } from 'class-transformer';
import { IsIn, IsObject, IsString, IsUUID } from 'class-validator';
import { ProductTypeEnum } from '@app/product/types/product-type.enum';

export class CreateProductRequestDto {
  @IsString()
  @Expose()
  public readonly name: string;

  @IsUUID(4, { each: true })
  @Expose()
  public readonly categories: string[];

  @IsString()
  @IsIn(Object.values(ProductTypeEnum))
  @Expose()
  public readonly type: ProductTypeEnum;

  @IsObject()
  @Expose()
  public readonly data: Record<string, unknown>;
}
