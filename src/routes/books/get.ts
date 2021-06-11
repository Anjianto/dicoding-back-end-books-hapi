import Hapi from "@hapi/hapi";

import { books } from "../../data";

const getBook: Hapi.ServerRoute = {
  method: "Get",
  path: "/books/{bookId}",
  handler: (req, hToolkit) => {
    try {
      const book = books.find((b) => b.id === req.params.bookId);

      if (!book) {
        return hToolkit
          .response({
            status: "fail",
            message: "Buku tidak ditemukan",
          })
          .code(404);
      }

      return hToolkit
        .response({
          status: "success",
          data: {
            book,
          },
        })
        .code(200);
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

export default getBook;
