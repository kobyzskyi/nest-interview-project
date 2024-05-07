import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { ProductTypeEnum } from '@app/product/types/product-type.enum';

@Entity('product')
export class ProductEntity {
  @PrimaryColumn({ type: 'uuid' })
  public readonly id = uuidV4();

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @ManyToMany(() => CategoryEntity, (category) => category.products)
  public categories: CategoryEntity[];

  @Column({ type: 'varchar', nullable: false })
  public type: ProductTypeEnum;

  @Column({ type: 'jsonb', nullable: false })
  public data: Record<string, unknown> = {};
}
