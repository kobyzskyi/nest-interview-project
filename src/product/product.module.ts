import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '@app/product/entities/product.entity';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { CategoryService } from '@app/category/services/category.service';
import { ProductService } from '@app/product/services/product.service';
import { DesktopDataChecker } from '@app/product/services/desktop-data-checker';
import { TabletDataChecker } from '@app/product/services/tablet-data-checker';
import { SmartphoneDataChecker } from '@app/product/services/smartphone-data-checker';
import { LaptopDataChecker } from '@app/product/services/laptop-data-checker';
import { ProductController } from '@app/product/controllers/product.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, CategoryEntity])],
  controllers: [ProductController],
  providers: [
    CategoryService,
    ProductService,
    DesktopDataChecker,
    TabletDataChecker,
    SmartphoneDataChecker,
    LaptopDataChecker,
  ],
  exports: [],
})
export class ProductModule {}
