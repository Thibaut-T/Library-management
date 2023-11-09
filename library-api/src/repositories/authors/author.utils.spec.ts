
import { AuthorId, Author, Book } from '../../entities';
import { PlainAuthorPresenter } from '../../controllers/authors/author.presenter';
import { AuthorModel } from '../../models';
import { createAuthorId } from './author.utils';
import { createAuthor } from './author.utils';





describe('createAuthorId', () => {
    it('should create an AuthorId object with the given id', () => {
        const id = '123';
        const authorId = createAuthorId(id);
        expect(authorId).toBe(id);
    });
});


describe('createAuthor', () => {
    it('should throw an error if author is not provided', () => {
        expect(() => createAuthor(null)).toThrow('Author is required');
    });
});



describe('createAuthor name, last name', () => {
    it('should create an AuthorModel object with the correct first and last name', () => {
        const authorName = 'John Doe';
        const authorModel = createAuthor(authorName);
        expect(authorModel).toBeInstanceOf(Author);
        expect(authorModel.firstName).toBe('John');
        expect(authorModel.lastName).toBe('Doe');
    });
});




