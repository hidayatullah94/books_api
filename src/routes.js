const {
   addBooks, getAllBooks ,getBooksById, updateBooks, deleteBooks,
} = require('./handler');

const routes = [
  
  {
    method: 'POST',
    path: '/books',
    handler: addBooks,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBooksById,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: updateBooks,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBooks,
  },
];

module.exports = { routes };
