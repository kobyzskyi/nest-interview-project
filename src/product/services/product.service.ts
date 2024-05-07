import { CreateProductRequestDto } from '@app/product/dtos/create-product-request.dto';
import { ProductEntity } from '@app/product/entities/product.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from '@app/category/services/category.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateProductRequestDto } from '@app/product/dtos/update-product-request.dto';
import { DesktopDataChecker } from '@app/product/services/desktop-data-checker';
import { TabletDataChecker } from '@app/product/services/tablet-data-checker';
import { SmartphoneDataChecker } from '@app/product/services/smartphone-data-checker';
import { LaptopDataChecker } from '@app/product/services/laptop-data-checker';
import { ProductTypeEnum } from '@app/product/types/product-type.enum';

export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
    private readonly categoryService: CategoryService,
    public readonly desktopDataChecker: DesktopDataChecker,
    public readonly tabletDataChecker: TabletDataChecker,
    public readonly smartphoneDataChecker: SmartphoneDataChecker,
    public readonly laptopDataChecker: LaptopDataChecker,
  ) {}

  public async createProduct(
    request: CreateProductRequestDto,
  ): Promise<ProductEntity> {
    try {
      const existedProdWithSameName = await this.productRepository.findOne({
        where: { name: request.name },
      });

      if (existedProdWithSameName) {
        throw new BadRequestException('Product with same name already exists');
      }

      const categories = await this.categoryService.getByIds(
        request.categories,
      );

      if (categories.length !== request.categories.length) {
        throw new NotFoundException('Some categories not found');
      }

      this.#checkProductData(request.type, request.data);

      const productEntity = this.productRepository.create({
        ...request,
        categories,
      });

      return await this.productRepository.save(productEntity);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new Error(error);
    }
  }

  public async updateProduct(
    id: string,
    request: UpdateProductRequestDto,
  ): Promise<ProductEntity> {
    try {
      const existedProd = await this.productRepository.findOne({
        where: { id: id },
      });

      if (!existedProd) {
        throw new NotFoundException('Product not found');
      }

      const existedProdWithSameName = await this.productRepository.findOne({
        where: { name: request.name, id: Not(id) },
      });

      if (existedProdWithSameName) {
        throw new BadRequestException('Product with same name already exists');
      }

      const categories = await this.categoryService.getByIds(
        request.categories,
      );

      if (categories.length !== request.categories.length) {
        throw new NotFoundException('Some categories not found');
      }

      if (request.type || request.data) {
        this.#checkProductData(request.type, request.data);
      }

      const productEntity = this.productRepository.create({
        ...request,
        categories,
      });

      return this.productRepository.save(productEntity);
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new Error(error);
    }
  }

  public async searchByName(name: string): Promise<ProductEntity[]> {
    const sql = `SELECT id FROM product WHERE name LIKE '%${name}%'`;

    const result = await this.productRepository.query(sql);

    return this.productRepository.findBy({
      id: In(result.map(({ id }) => id)),
    });
  }

  #checkProductData(
    productType: ProductTypeEnum,
    data: Record<string, unknown>,
  ): void {
    let result = false;

    switch (productType) {
      case ProductTypeEnum.DESKTOP:
        result = this.desktopDataChecker.isDesktopData(data);
        break;
      case ProductTypeEnum.TABLET:
        result = this.tabletDataChecker.isTabletData(data);
        break;
      case ProductTypeEnum.SMARTPHONE:
        result = this.smartphoneDataChecker.isSmartphoneData(data);
        break;
      case ProductTypeEnum.LAPTOP:
        result = this.laptopDataChecker.isLaptopData(data);
        break;
      default:
        throw new BadRequestException('Invalid product type');
    }

    if (!result) {
      throw new BadRequestException('Invalid product data');
    }
  }
}
