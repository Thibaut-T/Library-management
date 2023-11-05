import { PlainAuthorModel, PlainBookModel, bookToAdd, GenreModel } from "@/models";

//function to adapat the data from the site to the data from the api
export function adaptToPlainBook(data: bookToAdd) {
    const adaptedData = {
        id: "I need an ID",
        name: data.name,
        writtenOn: data.writtenOn,
        author: adaptToPlainAuthor(data.author)
    };
    return adaptedData;
}

export function adaptToPlainAuthor(data: string) {
    const adaptedData = {
        id: "I need an ID",
        firstname: data.split(" ")[0],
        Lastname: data.split(" ")[1],
    };
    return adaptedData;
}

export function adaptToGenreModel(data: string[]): GenreModel[] {
    const returnData = data.map((adaptedData) => ({
      id: adaptedData.split("+")[0],
      name: adaptedData.split("+")[1],
    }));
    return returnData;
}
