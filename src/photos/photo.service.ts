import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PhotoDB, BannerDB } from 'src/photos/photo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(PhotoDB)
    private readonly photo_repo: Repository<PhotoDB>,
    @InjectRepository(BannerDB)
    private readonly banner_repo: Repository<BannerDB>,
  ) {}

  public async createPhotos(
    urls: string[],
    movieId: string,
  ): Promise<PhotoDB[]> {
    const photos = urls.map((url) => {
      const photo = new PhotoDB();
      photo.movie = movieId;
      photo.photoUrl = url;
      return photo;
    });
    return photos;
  }

  public async createBanner(url: string, movieId: string): Promise<BannerDB> {
    const banner = new BannerDB();
    banner.movie = movieId;
    banner.photoUrl = url;
    return banner;
  }

  public async savePhotos(
    photos: PhotoDB[] | BannerDB,
  ): Promise<PhotoDB[] | PhotoDB> {
    if (photos instanceof BannerDB) {
      return this.banner_repo.save(photos);
    } else {
      return this.photo_repo.save([...photos]);
    }
  }

  public async deletePhotos(
    photos: PhotoDB[] | BannerDB,
  ): Promise<void | PhotoDB> {
    if (photos instanceof BannerDB) {
      await this.banner_repo.remove(photos);
    } else {
      await this.photo_repo.remove(photos);
    }
  }
}
