"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
exports.addProduct = addProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const API_URL = "https://backend-e-commerce-9fdb.onrender.com";
var API_URL = 'http://localhost:4000';

function getAllProducts() {
  var response;
  return regeneratorRuntime.async(function getAllProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/products"));

        case 3:
          response = _context.sent;
          return _context.abrupt("return", response.data);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log('Error fetching all products:', _context.t0.message);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function getProductById(id) {
  var response;
  return regeneratorRuntime.async(function getProductById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/product/".concat(id)));

        case 3:
          response = _context2.sent;
          return _context2.abrupt("return", response.data);

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching product with id ".concat(id, ":"), _context2.t0);
          throw _context2.t0;

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function addProduct(formData) {
  var response;
  return regeneratorRuntime.async(function addProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/product', formData, {
            headers: {
              'Content-Type': 'multipart/form-data' // Set content type for file upload

            }
          }));

        case 3:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 7:
          _context3.prev = 7;
          _context3.t0 = _context3["catch"](0);
          console.error('Error adding product:', _context3.t0);
          throw _context3.t0;

        case 11:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function updateProduct(id, productData) {
  var response;
  return regeneratorRuntime.async(function updateProduct$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(_axios["default"].put(API_URL + "/product/".concat(id), productData));

        case 3:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 7:
          _context4.prev = 7;
          _context4.t0 = _context4["catch"](0);
          console.error("Error updating product with id ".concat(id, ":"), _context4.t0);
          throw _context4.t0;

        case 11:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 7]]);
}

function deleteProduct(id) {
  var response;
  return regeneratorRuntime.async(function deleteProduct$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return regeneratorRuntime.awrap(_axios["default"]["delete"](API_URL + "/product/".concat(id)));

        case 3:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](0);
          console.error("Error deleting product with id ".concat(id, ":"), _context5.t0);
          throw _context5.t0;

        case 11:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 7]]);
}
//# sourceMappingURL=productService.dev.js.map
