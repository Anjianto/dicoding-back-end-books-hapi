import Hapi from "@hapi/hapi";

import { books } from "../../data";

export const getBook: Hapi.ServerRoute = {
  method: "Get",
  path: "/books/{bookId}",
  handler: (req, hToolkit) => {
    try {
      const book = books.find((book) => book.id === req.params.bookId);
      return book
        ? hToolkit
            .response({
              status: "success",
              data: {
                book,
              },
            })
            .code(200)
        : hToolkit
            .response({
              status: "fail",
              message: "Buku tidak ditemukan",
            })
            .code(404);
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
