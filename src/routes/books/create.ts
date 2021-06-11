import Hapi from "@hapi/hapi";
import { nanoid } from "nanoid";

import { Book, books } from "../../data";

function response400(message: string, hToolkit: Hapi.ResponseToolkit) {
  return hToolkit
    .response({
      status: "fail",
      message,
    })
    .code(400);
}

const validate = (data: Book, hToolkit: Hapi.ResponseToolkit) => {
  if (!data.name) {
    return response400(
      "Gagal menambahkan buku. Mohon isi nama buku",
      hToolkit,
    ).code(400);
  }

  if (!data.year) {
    return response400(
      "Gagal menambahkan buku. Mohon isi tahun terbit buku",
      hToolkit,
    ).code(400);
  }

  if (Number.isNaN(parseInt(`${data.year}`, 10))) {
    return response400(
      "Gagal menambahkan buku. Tahun harus berupa angka",
      hToolkit,
    );
  }

  if (!data.author) {
    return response400(
      "Gagal menambahkan buku. Mohon isi Penulis buku",
      hToolkit,
    ).code(400);
  }

  if (!data.summary) {
    return response400(
      "Gagal menambahkan buku. Mohon isi Ringkasan buku",
      hToolkit,
    ).code(400);
  }

  if (!data.author) {
    return response400(
      "Gagal menambahkan buku. Mohon isi Penerbit buku",
      hToolkit,
    ).code(400);
  }

  if (!data.pageCount) {
    return response400(
      "Gagal menambahkan buku. Mohon isi total halaman buku",
      hToolkit,
    ).code(400);
  }

  if (Number.isNaN(parseInt(`${data.pageCount}`, 10))) {
    return response400(
      "Gagal menambahkan buku. Total halaman buku harus berupa angka",
      hToolkit,
    );
  }

  if (!data.readPage && data.readPage !== 0) {
    return response400(
      "Gagal menambahkan buku. Mohon isi total halaman yang di baca",
      hToolkit,
    ).code(400);
  }

  if (Number.isNaN(parseInt(`${data.readPage}`, 10))) {
    return response400(
      "Gagal menambahkan buku. Total halaman yang di baca harus berupa angka",
      hToolkit,
    );
  }

  if (data.readPage > data.pageCount) {
    return response400(
      "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
      hToolkit,
    );
  }

  if (typeof data.reading !== "boolean") {
    return response400(
      "Gagal menambahkan buku. Status baca buku harus berisikan false atau true",
      hToolkit,
    );
  }

  return false;
};

const createBook: Hapi.ServerRoute = {
  method: "POST",
  path: "/books",
  handler: (req, hToolkit) => {
    try {
      const data = req.payload as Book;

      const isValid = validate(data, hToolkit);
      if (isValid) {
        return isValid;
      }

      data.year = parseInt(`${data.year}`, 10);
      data.pageCount = parseInt(`${data.pageCount}`, 10);
      data.readPage = parseInt(`${data.readPage}`, 10);

      data.id = nanoid(16);
      data.finished = data.readPage === data.pageCount;
      data.insertedAt = new Date().toISOString();
      data.updatedAt = new Date().toISOString();

      books.push(data);

      return hToolkit
        .response({
          status: "success",
          message: "Buku berhasil ditambahkan",
          data: {
            bookId: data.id,
          },
        })
        .code(201);
    } catch {
      return hToolkit
        .response({
          status: "error",
          message: "Buku gagal ditambahkan",
        })
        .code(500);
    }
  },
};

export default createBook;
