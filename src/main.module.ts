import { Module } from '@nestjs/common';
import { CategoryModule } from '@app/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as process from 'process';
import { ProductModule } from '@app/product/product.module';

@Module({
  imports: [
    CategoryModule,
    ProductModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_DB_HOST,
      port: Number(process.env.POSTGRES_DB_PORT),
      username: process.env.POSTGRES_DB_USERNAME,
      password: process.env.POSTGRES_DB_PASSWORD,
      database: process.env.POSTGRES_DB_NAME,
    }),
  ],
})
export class MainModule {}
