import Hapi from "@hapi/hapi";

import { books } from "../../data";

const deleteBook: Hapi.ServerRoute = {
  method: "DELETE",
  path: "/books/{bookId}",
  handler: (req, hToolkit) => {
    try {
      const bookIndex = books.findIndex(
        (book) => book.id === req.params.bookId,
      );

      if (bookIndex === -1) {
        return hToolkit
          .response({
            status: "fail",
            message: "Buku gagal dihapus. Id tidak ditemukan",
          })
          .code(404);
      }

      books.splice(bookIndex, 1);

      return hToolkit
        .response({
          status: "success",
          message: "Buku berhasil dihapus",
        })
        .code(200);
    } catch {
      return hToolkit
        .response({
          status: "error",
          message: "Buku gagal dihapus",
        })
        .code(500);
    }
  },
};

export default deleteBook;
