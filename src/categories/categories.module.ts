import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './categories.entity';
import { CategoryService } from './categories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
})
export class CategoriesModule {}
