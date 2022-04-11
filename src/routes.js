const {
  getAllBooks, addBooks, getBooksById, updateBooks, deleteBooks,
} = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBooksById,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBooks,
  },
];

module.exports = { routes };
