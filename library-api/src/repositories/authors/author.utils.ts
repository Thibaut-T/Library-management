import { PlainAuthorPresenter } from "../../controllers/authors/author.presenter";
import { AuthorModel } from "../../models"
import { AuthorId, Author, Book} from '../../entities';

export function createAuthorId(id: string): AuthorId {
    return id as AuthorId;
};

export const createAuthor = (author: string): AuthorModel=> {
    if (!author) {
        throw new Error('Author is required');
    }
    const firstName = author.split(" ")[0];
    const lastName = author.split(" ")[1];
    const newAuthor = new Author()
    newAuthor.firstName = firstName;
    newAuthor.lastName = lastName;
    newAuthor.photoUrl = "";
    return newAuthor;
};
