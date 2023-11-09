import { PlainAuthorPresenter } from './author.presenter';
import { PlainAuthorModel } from '../../models';
import { AuthorId } from '../../entities';

const autheurId1: AuthorId = 'John Doe' as AuthorId;

describe('PlainAuthorPresenter', () => {
  it('should create a PlainAuthorPresenter instance from PlainAuthorModel', () => {
    const plainAuthorModel: PlainAuthorModel = {
      id: autheurId1,
      firstName: 'John',
      lastName: 'Doe',
    };

    const plainAuthorPresenter = PlainAuthorPresenter.from(plainAuthorModel);

    expect(plainAuthorPresenter).toBeInstanceOf(PlainAuthorPresenter);
    expect(plainAuthorPresenter.id).toBe(plainAuthorModel.id);
    expect(plainAuthorPresenter.firstName).toBe(plainAuthorModel.firstName);
    expect(plainAuthorPresenter.lastName).toBe(plainAuthorModel.lastName);
  });
});
