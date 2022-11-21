import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor, Director, Writer } from './people.entity';
import { PeopleService } from './people.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actor, Director, Writer])],
  providers: [PeopleService],
})
export class PeopleModule {}
