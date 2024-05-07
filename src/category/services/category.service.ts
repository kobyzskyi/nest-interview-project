import { In, Not, Repository } from 'typeorm';
import { CategoryEntity } from '@app/category/entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryRequestDto } from '@app/category/dtos/create-category-request.dto';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateCategoryRequestDto } from '@app/category/dtos/update-category-request.dto';

export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async create(
    request: CreateCategoryRequestDto,
  ): Promise<CategoryEntity> {
    try {
      const existedCatWithSameName = await this.categoryRepository.findOne({
        where: { name: request.name },
      });

      if (existedCatWithSameName) {
        throw new BadRequestException('Category with same name already exists');
      }

      return this.categoryRepository.save(
        this.categoryRepository.create(request),
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async update(
    id: string,
    req: UpdateCategoryRequestDto,
  ): Promise<CategoryEntity> {
    try {
      const existedCat = await this.categoryRepository.findOneBy({ id });

      if (!existedCat) {
        throw new NotFoundException('Category not found');
      }

      const existedCatWithSameName = await this.categoryRepository.findOne({
        where: { name: req.name, id: Not(id) },
      });

      if (existedCatWithSameName) {
        throw new BadRequestException('Category with same name already exists');
      }

      return await this.categoryRepository.save(
        this.categoryRepository.merge(existedCat, req),
      );
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(error);
    }
  }

  public async getByIds(ids: string[]): Promise<CategoryEntity[]> {
    return this.categoryRepository.findBy({ id: In(ids) });
  }
}
