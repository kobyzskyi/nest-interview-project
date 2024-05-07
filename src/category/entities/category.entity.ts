import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';
import { ProductEntity } from '@app/product/entities/product.entity';

@Entity('category')
export class CategoryEntity {
  @PrimaryColumn({ type: 'uuid' })
  public readonly id = uuidV4();

  @Column({ type: 'varchar', nullable: false })
  public name: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  @JoinTable()
  public products: ProductEntity[];
}
