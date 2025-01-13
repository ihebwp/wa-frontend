"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var useWindowScrollToTop = function useWindowScrollToTop() {
  (0, _react.useEffect)(function () {
    window.scrollTo(0, 0);
  }, []);
};

var _default = useWindowScrollToTop;
exports["default"] = _default;
//# sourceMappingURL=useWindowScrollToTop.dev.js.map
