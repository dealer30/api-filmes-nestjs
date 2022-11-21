class CreatePeopleBaseDto {
  name: string;
  movieId: string;
}

export class CreateActorDto extends CreatePeopleBaseDto {}
export class CreateDirectorDto extends CreatePeopleBaseDto {}
export class CreateWriterDto extends CreatePeopleBaseDto {}
