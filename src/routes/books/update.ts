import Hapi from "@hapi/hapi";

import { Book, books } from "../../data";

export const updateBook: Hapi.ServerRoute = {
  method: "PUT",
  path: "/books/{bookId}",
  handler: (req, hToolkit) => {
    try {
      const book = books.findIndex((book) => book.id === req.params.bookId);

      if (book === -1) {
        return hToolkit
          .response({
            status: "fail",
            message: "Gagal memperbarui buku. Id tidak ditemukan",
          })
          .code(404);
      }

      const data = req.payload as Book;

      const isValid = validate(data, hToolkit);
      if (isValid) {
        return isValid;
      }

      data.year = parseInt(`${data.year}`);
      data.pageCount = parseInt(`${data.pageCount}`);
      data.readPage = parseInt(`${data.readPage}`);

      data.finished = data.readPage === data.pageCount;
      data.updatedAt = new Date().toISOString();

      books[book] = {
        ...books[book],
        ...data,
      };

      return hToolkit
        .response({
          status: "success",
          message: "Buku berhasil diperbarui",
        })
        .code(200);
    } catch {
      return hToolkit
        .response({
          status: "error",
          message: "Buku gagal diperbarui",
        })
        .code(500);
    }
  },
};

const validate = (data: Book, hToolkit: Hapi.ResponseToolkit) => {
  if (!data.name) {
    return response400(
      "Gagal memperbarui buku. Mohon isi nama buku",
      hToolkit
    ).code(400);
  } else if (!data.year) {
    return response400(
      "Gagal memperbarui buku. Mohon isi tahun terbit buku",
      hToolkit
    ).code(400);
  } else if (isNaN(parseInt(`${data.year}`))) {
    return response400(
      "Gagal memperbarui buku. Tahun harus berupa angka",
      hToolkit
    );
  } else if (!data.author) {
    return response400(
      "Gagal memperbarui buku. Mohon isi Penulis buku",
      hToolkit
    ).code(400);
  } else if (!data.summary) {
    return response400(
      "Gagal memperbarui buku. Mohon isi Ringkasan buku",
      hToolkit
    ).code(400);
  } else if (!data.author) {
    return response400(
      "Gagal memperbarui buku. Mohon isi Penerbit buku",
      hToolkit
    ).code(400);
  } else if (!data.pageCount) {
    return response400(
      "Gagal memperbarui buku. Mohon isi total halaman buku",
      hToolkit
    ).code(400);
  } else if (isNaN(parseInt(`${data.pageCount}`))) {
    return response400(
      "Gagal memperbarui buku. Total halaman buku harus berupa angka",
      hToolkit
    );
  } else if (!data.readPage && data.readPage !== 0) {
    return response400(
      "Gagal memperbarui buku. Mohon isi total halaman yang di baca",
      hToolkit
    ).code(400);
  } else if (isNaN(parseInt(`${data.readPage}`))) {
    return response400(
      "Gagal memperbarui buku. Total halaman yang di baca harus berupa angka",
      hToolkit
    );
  } else if (data.readPage > data.pageCount) {
    return response400(
      "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
      hToolkit
    );
  } else if (typeof data.reading !== "boolean") {
    return response400(
      "Gagal memperbarui buku. Status baca buku harus berisikan false atau true",
      hToolkit
    );
  }

  return false;
};

const response400 = (message: string, hToolkit: Hapi.ResponseToolkit) => {
  return hToolkit
    .response({
      status: "fail",
      message,
    })
    .code(400);
};
