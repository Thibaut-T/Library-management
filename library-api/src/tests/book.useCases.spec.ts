import { BookUseCases } from '../useCases/books/book.useCases';
import { BookRepository, AuthorRepository, BookGenreRepository } from '../repositories';
import { BookId } from '../entities';
import { createBookUtils } from '../repositories/books/book.utils';
describe('BookUseCases', () => {
    describe('getAllPlain', () => {
      it('should call repository function', async () => {
            const repository1 = { getAllPlain: jest.fn() } as unknown as BookRepository;
            const repository2 = { getAllPlain: jest.fn() } as unknown as AuthorRepository;
            const repository3 = { getAllPlain: jest.fn() } as unknown as BookGenreRepository;
            const useCases = new BookUseCases(repository1, repository2, repository3);
        });
    });

    describe('getById', () => {
        it('should call repository function', async () => {
            const repository1 = { getById: jest.fn() } as unknown as BookId;
        });
    });
    

describe('addBook', () => {

  it('should add a book with required fields', async () => {
    // Prepare test data
    const repository1 = { addBook: jest.fn() } as unknown as BookUseCases;

    const book1 = {
        name : 'Test Book',
        writtenOn : new Date(),
        author : 'test Author',
        genreId : {1},
      
    };
    const fixture = createBookUtils(book1,'test Author');

    const addBookSpy = jest
      .spyOn(repository1, 'addBook');

    // Call the addBook function
    const result = { addBook: jest.fn() } as unknown as BookRepository;
    expect(result.addBook).toBeCalledWith(book1);

    // You can also add more specific assertions based on the expected output.
  });
/**
  it('should throw an error when "name" is missing', async () => {
    const newBook = {
      // Missing name
      author: 'Test Author',
      writtenOn: new Date(),
      genreId: 'Test Genre',
    };

    // Use async/await or promise rejection handling to catch the error
    await expect(result(newBook)).rejects.toThrow('Book name is required');
  });

  it('should throw an error when "author" is missing', async () => {
    const newBook = {
      name: 'Test Book',
      // Missing author
      writtenOn: new Date(),
      genreId: 'Test Genre',
    };

    await expect(addBook(newBook)).rejects.toThrow('Book author is required');
  });

  it('should set "writtenOn" to the current date if not provided', async () => {
    const newBook = {
      name: 'Test Book',
      author: 'Test Author',
      genreId: 'Test Genre',
    };

    // Call the addBook function
    const result = await addBook(newBook);

    // Assert that "writtenOn" is set to a date close to the current time
    expect(result.writtenOn).toBeInstanceOf(Date);
    expect(Math.abs(result.writtenOn.getTime() - new Date().getTime())).toBeLessThan(1000); // Tolerate up to 1 second difference
  });

  it('should throw an error when "genreId" is missing', async () => {
    const newBook = {
      name: 'Test Book',
      author: 'Test Author',
      writtenOn: new Date(),
      // Missing genreId
    };

    await expect(addBook(newBook)).rejects.toThrow('Book genre is required');
  });*/
  });

});

