import { GenreId } from '../../entities';
import { GenreModel } from '../../models';

export class GenrePresenter {
  id: GenreId;

  name: string;

  private constructor(data: GenrePresenter) {
    Object.assign(this, data);
  }

  public static from(data: GenreModel): GenrePresenter {
    return new GenrePresenter({
      id: data.id,
      name: data.name,
    });
  }
}
