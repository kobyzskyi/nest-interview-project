import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from '@app/product/services/product.service';
import { ProductEntity } from '@app/product/entities/product.entity';
import { CreateProductRequestDto } from '@app/product/dtos/create-product-request.dto';
import { UpdateProductRequestDto } from '@app/product/dtos/update-product-request.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  public async createProduct(
    @Body() createRequest: CreateProductRequestDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createRequest);
  }

  @Put(':id')
  public async updateProduct(
    @Param('id') id: string,
    @Body() updateRequest: UpdateProductRequestDto,
  ): Promise<ProductEntity> {
    return await this.productService.updateProduct(id, updateRequest);
  }

  @Get(':searchString')
  public async searchProduct(
    @Param('searchString') searchString: string,
  ): Promise<ProductEntity[]> {
    return await this.productService.searchByName(searchString);
  }
}
