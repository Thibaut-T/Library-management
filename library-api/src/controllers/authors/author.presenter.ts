import { AuthorId, Book} from 'library-api/src/entities';
import { BookModel, PlainAuthorModel } from 'library-api/src/models';
import { adaptBookEntityToBookModel } from 'library-api/src/repositories/books/book.utils';

export class PlainAuthorPresenter {
  id: AuthorId;

  firstName: string;

  lastName: string;

  photoUrl: string;

  private constructor(data: PlainAuthorPresenter) {
    Object.assign(this, data);
  }

  public static from(data: PlainAuthorModel): PlainAuthorPresenter {
    return new PlainAuthorPresenter({
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      photoUrl: data.photoUrl,
    });
  }
}
