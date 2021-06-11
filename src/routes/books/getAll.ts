import Hapi from "@hapi/hapi";

import { Book, books } from "../../data";

type AllBooks = Array<Required<Pick<Book, "id" | "name" | "publisher">>>;

export const getAllBooks: Hapi.ServerRoute = {
  method: "Get",
  path: "/books",
  handler: (req, hToolkit) => {
    try {
      const allBooks: AllBooks = [];

      filterBook(req, allBooks);

      return hToolkit.response({
        status: "success",
        data: {
          books: allBooks,
        },
      });
    } catch {
      return hToolkit
        .response({
          status: "error",
          message: "Buku gagal didapatkan",
        })
        .code(500);
    }
  },
};

const filterBook = (req: Hapi.Request, allBooks: AllBooks) => {
  return books.map((book) => {
    console.log(req.query);
    if (req.query.name && book.name.includes(req.query.name)) {
      return allBooks.push({
        id: book.id as string,
        name: book.name,
        publisher: book.publisher,
      });
    } else if (req.query.reading) {
      if (req.query.reading === "0" && !book.reading) {
        return allBooks.push({
          id: book.id as string,
          name: book.name,
          publisher: book.publisher,
        });
      } else if (req.query.reading === "1" && book.reading) {
        return allBooks.push({
          id: book.id as string,
          name: book.name,
          publisher: book.publisher,
        });
      }
    } else if (req.query.finished) {
      if (req.query.finished === "0" && !book.finished) {
        return allBooks.push({
          id: book.id as string,
          name: book.name,
          publisher: book.publisher,
        });
      } else if (req.query.finished === "1" && book.finished) {
        return allBooks.push({
          id: book.id as string,
          name: book.name,
          publisher: book.publisher,
        });
      }
    } else {
      return allBooks.push({
        id: book.id as string,
        name: book.name,
        publisher: book.publisher,
      });
    }
  });
};
