"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//const API_URL = 'http://backend-e-commerce-9fdb.onrender.com'
var API_URL = 'http://localhost:4000'; // Register user

var register = function register(userData) {
  var response;
  return regeneratorRuntime.async(function register$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/signup', userData));

        case 2:
          response = _context.sent;

          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data.token));
          }

          return _context.abrupt("return", response.data);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}; // Login user


var login = function login(userData) {
  var response;
  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].post(API_URL + '/login', userData));

        case 2:
          response = _context2.sent;

          if (response.data) {
            localStorage.setItem('user', JSON.stringify({
              token: response.data.token,
              id: response.data._id,
              user: response.data.user
            }));
          }

          return _context2.abrupt("return", response.data);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // Get current user 


var getCurrentUser = function getCurrentUser(userID) {
  var response;
  return regeneratorRuntime.async(function getCurrentUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + userID));

        case 2:
          response = _context3.sent;
          return _context3.abrupt("return", response.data);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // Get All users


var getAllUsers = function getAllUsers() {
  var response;
  return regeneratorRuntime.async(function getAllUsers$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(_axios["default"].get(API_URL + "/users"));

        case 2:
          response = _context4.sent;
          return _context4.abrupt("return", response.data);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Delete user


var deleteUser = function deleteUser(userId) {
  var response;
  return regeneratorRuntime.async(function deleteUser$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(_axios["default"]["delete"]("".concat(API_URL, "/users/").concat(userId)));

        case 2:
          response = _context5.sent;
          return _context5.abrupt("return", response.data);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Logout user


var logout = function logout() {
  localStorage.removeItem('user');
};

var authService = {
  register: register,
  logout: logout,
  login: login,
  getCurrentUser: getCurrentUser,
  getAllUsers: getAllUsers,
  deleteUser: deleteUser
};
var _default = authService;
exports["default"] = _default;
//# sourceMappingURL=authService.dev.js.map
