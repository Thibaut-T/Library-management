import { PlainAuthorPresenter } from '../authors/author.presenter';
import { GenrePresenter } from '../genres/genre.presenter';
import { BookId } from '../../entities';
import { BookModel, PlainBookModel } from '../../models';

export class PlainBookPresenter {
  id: BookId;

  name: string;

  writtenOn: Date;

  author: PlainAuthorPresenter;

  genres: string[];
  
  private constructor(data: PlainBookPresenter) {
    Object.assign(this, data);
  }


  public static from(data: PlainBookModel): PlainBookPresenter {
    return new PlainBookPresenter({
      id: data.id,
      name: data.name,
      genres: data.genres,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
    });
  }
}

export class BookPresenter {
  id: string;

  name: string;

  author: PlainAuthorPresenter;

  writtenOn: Date;

  genres: GenrePresenter[];

  private constructor(data: BookPresenter) {
    Object.assign(this, data);
  }

  public static from(data: BookModel): BookPresenter {
    return new BookPresenter({
      id: data.id,
      name: data.name,
      writtenOn: data.writtenOn,
      author: PlainAuthorPresenter.from(data.author),
      genres: data.genres.map(GenrePresenter.from),
    });
  }
}

