import { PlainBookModel, GenreModel } from '@/models';

//create a function to find the book name in books from the id
export const findName = (id: string, array: (PlainBookModel | GenreModel)[]) => {
    let objName = "";
    array.forEach((obj) => {
      if (obj.id === id) {
        objName = obj.name;
      }
    });
    return objName;
};

//create a function to find the book id in books from the name
export const findId = (name: string, array: (PlainBookModel | GenreModel)[]) => {
    let objId = "";
    array.forEach((obj) => {
      if (obj.name === name) {
        objId = obj.id;
      }
    });
    return objId;
};