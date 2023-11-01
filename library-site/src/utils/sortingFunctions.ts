import { useBooksProviders } from '@/hooks';
import { PlainBookModel } from '@/models';

export function parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JavaScript Date object
  }

//export a function for sorting books by name
export function useSortByName(books: PlainBookModel[]) {
    return books.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
    });
}
export function useSortByNameInv(books: PlainBookModel[]) {
    return books.sort((a, b) => {
        if (a.name > b.name) return -1;
        else if (a.name < b.name) return 1;
        else return 0;
    });
}

//export a function for sorting books by author
export function useSortByAuthor(books: PlainBookModel[]) {
    return books.sort((a, b) => {
        if (a.author.lastName < b.author.lastName) return -1;
        else if (a.author.lastName > b.author.lastName) return 1;
        else return 0;
    });
}
export function useSortByAuthorInv(books: PlainBookModel[]) {
    return books.sort((a, b) => {
        if (a.author.lastName > b.author.lastName) return -1;
        else if (a.author.lastName < b.author.lastName) return 1;
        else return 0;
    });
}

//export a function for sorting books by date
export function useSortByDate(books: PlainBookModel[]) {
    return books.sort((a, b) => {
      const dateA = parseDate(a.writtenOn.toString());
      const dateB = parseDate(b.writtenOn.toString());
      return dateA.getTime() - dateB.getTime();
    });
}

export function useSortByDateInv(books: PlainBookModel[]) {
    return books.sort((a, b) => {
      const dateA = parseDate(a.writtenOn.toString());
      const dateB = parseDate(b.writtenOn.toString());
      return dateB.getTime() - dateA.getTime();
    });
}