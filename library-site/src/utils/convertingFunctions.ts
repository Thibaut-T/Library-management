import { PlainAuthorModel, PlainBookModel, bookToAdd } from "@/models";

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