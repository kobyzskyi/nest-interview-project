import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { CategoryService } from '@app/category/services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  controllers: [],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
