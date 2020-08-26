"use strict";

var _LoanService = _interopRequireDefault(require("./LoanService"));

var _LoremIpsum = require("./LoremIpsum");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('should not approve the loan', function _callee() {
  var res;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_LoanService["default"].process({
            purchasePrice: '',
            yearlyIncome: '',
            creditScore: ''
          }));

        case 2:
          res = _context.sent;
          expect(res.isQualified).toEqual(false);
          expect(res.reason).toEqual(_LoremIpsum.LoremIpsumMsg);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
test('should approve the loan', function _callee2() {
  var res;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(_LoanService["default"].process({
            purchasePrice: '10000',
            yearlyIncome: '100000',
            creditScore: '800'
          }));

        case 2:
          res = _context2.sent;
          expect(res.isQualified).toEqual(true);
          expect(res.reason).toEqual('');

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
test('should return bad request', function _callee3() {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_LoanService["default"].process({
            purchasePrice: '100000000',
            yearlyIncome: '100000',
            creditScore: '800'
          }));

        case 3:
          _context3.next = 8;
          break;

        case 5:
          _context3.prev = 5;
          _context3.t0 = _context3["catch"](0);
          expect(_context3.t0).toEqual(_LoremIpsum.LoremIpsumMsg);

        case 8:
          ;

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 5]]);
});