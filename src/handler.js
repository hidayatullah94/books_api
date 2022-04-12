const { nanoid } = require('nanoid');
const { books } = require('./books');

// handler addbook
const addBooks = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const id = nanoid(16);
  let finished = false;
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt;

  // value finished
  if (pageCount === readPage) {
    finished = true;
  }

  // validasi name
  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  // validasi page
  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  // add book
  books.push({
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    insertedAt,
    updatedAt,
    finished
  });

  if (books.findIndex((book) => book.id === id) !== -1) {
    return h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201);
  }
  return h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  }).code(500);
};

// handler get all book
const getAllBooks = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name) {
    const book = books.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
    return h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id : book.id,
          name: book.name,
          publisher: book.publisher
        })),
      },
    }).code(200);
  }

  if (reading) {
    const book = books.filter((book) => Number(book.reading) === Number(reading));
    return h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id : book.id,
          name: book.name,
          publisher: book.publisher
        })),
      },
    }).code(200);
  }

  if (finished) {
    const book = books.filter((book) => Number(book.finished) === Number(finished));
    return h.response({
      status: 'success',
      data: {
        books: book.map((book) => ({
          id : book.id,
          name: book.name,
          publisher: book.publisher
        })),
      },
    }).code(200);
  }

  return h.response({
    status: 'success',
    data: {
      books: books.map((book) =>  ({
        id : book.id,
        name: book.name,
        publisher: book.publisher
      })),
    },
  }).code(200)
};

// handler get book by id
const getBooksById = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((book) => book.id === bookId)[0];

  if (book === undefined) {
    return h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    }).code(404);
  }

  return h.response({
    status: 'success',
    data: {
      book
    },
  }).code(200);
};

// handler edit book
const updateBooks = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt= new Date().toISOString()
  const index = books.findIndex((book) => book.id === bookId);

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    }).code(400);
  }

  if (readPage > pageCount) {
    return h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    }).code(400);
  }
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt
    };
    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  }).code(404);
};

// handler delete book
const deleteBooks = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books.splice(index, 1);

    return h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    }).code(200);
  }

  return h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  }).code(404);
};

module.exports = {
   addBooks, getAllBooks ,getBooksById, updateBooks, deleteBooks,
};
