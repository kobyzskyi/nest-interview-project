import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CategoryService } from '@app/category/services/category.service';
import { CreateCategoryRequestDto } from '@app/category/dtos/create-category-request.dto';
import { UpdateCategoryRequestDto } from '@app/category/dtos/update-category-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { Repository } from 'typeorm';

@Controller('categories')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  @Post()
  public async createCategory(@Body() request: CreateCategoryRequestDto) {
    if (request.name === undefined) {
      request.name = await this.#generateCategoryName();
    }

    return await this.categoryService.create(request);
  }

  @Put(':id')
  public async updateCategory(
    @Param('id') id: string,
    @Body() request: UpdateCategoryRequestDto,
  ) {
    return await this.categoryService.update(id, request);
  }

  async #generateCategoryName(number = 1): Promise<string> {
    const name = `Category ${number}`;

    if (
      await this.categoryRepository.findOne({
        where: { name },
      })
    ) {
      return this.#generateCategoryName(number + 1);
    }

    return name;
  }
}
