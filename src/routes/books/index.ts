import Hapi from "@hapi/hapi";
import createBook from "./create";
import deleteBook from "./delete";
import getBook from "./get";
import getAllBooks from "./getAll";
import updateBook from "./update";

const bookRoutes: Hapi.ServerRoute[] = [
  createBook,
  getAllBooks,
  getBook,
  updateBook,
  deleteBook,
];

export default bookRoutes;
