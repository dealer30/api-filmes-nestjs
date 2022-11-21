import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor, Director, Writer } from 'src/people/people.entity';
import { Repository } from 'typeorm';

type PeopleType = Actor[] | Director[] | Writer[];
type PeopleEntity = typeof Actor | typeof Director | typeof Writer;

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(Actor)
    private readonly actor_repo: Repository<Actor>,
    @InjectRepository(Director)
    private readonly director_repo: Repository<Director>,
    @InjectRepository(Writer)
    private readonly writer_repo: Repository<Writer>,
  ) {}

  public async createPeople(
    people: string[],
    movieId: string,
    entity: PeopleEntity,
  ): Promise<PeopleType> {
    const peopleDB = people.map((person) => {
      const personDB = new entity();
      personDB.movie = movieId;
      personDB.name = person;
      return personDB;
    });

    return peopleDB;
  }

  public async savePeople(
    people: PeopleType,
    entity: PeopleEntity,
  ): Promise<PeopleType> {
    switch (entity) {
      case Actor:
        return this.actor_repo.save([...people]);
      case Director:
        return this.director_repo.save([...people]);
      case Writer:
        return this.writer_repo.save([...people]);
    }
  }

  public async deletePeople(
    people: PeopleType,
    entity: PeopleEntity,
  ): Promise<void> {
    switch (entity) {
      case Actor:
        people.map((actor) => this.actor_repo.remove(actor));
        break;
      case Director:
        people.map((director) => this.director_repo.remove(director));
        break;
      case Writer:
        people.map((writer) => this.writer_repo.remove(writer));
        break;
    }
  }
}
