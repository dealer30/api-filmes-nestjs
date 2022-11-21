import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoDB, BannerDB } from './photo.entity';
import { PhotoService } from './photo.service';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoDB, BannerDB])],
  providers: [PhotoService],
})
export class PhotosModule {}
