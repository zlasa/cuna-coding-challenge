"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _LoremIpsum = require("./LoremIpsum");

var _ = _interopRequireWildcard(require("lodash"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var LoanService = {
  process: function process(loanForm) {
    var mockResponseObject = {
      isQualified: true,
      reason: ''
    };

    var purchasePrice = _.toNumber(loanForm.purchasePrice);

    var yearlyIncome = _.toNumber(loanForm.yearlyIncome);

    var creditScore = _.toNumber(loanForm.creditScore);

    if (purchasePrice > 1000000) {
      return Promise.reject(_LoremIpsum.LoremIpsumMsg);
    }

    if (purchasePrice > yearlyIncome / 5 || creditScore < 600) {
      mockResponseObject.isQualified = false;
      mockResponseObject.reason = _LoremIpsum.LoremIpsumMsg;
    }

    return Promise.resolve(mockResponseObject);
  }
};
var _default = LoanService;
exports["default"] = _default;