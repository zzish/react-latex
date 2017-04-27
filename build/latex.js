"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _katex = require("katex");

var _katex2 = _interopRequireDefault(_katex);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-danger: 0 */

// Eslint doesn't like react being in peerDependencies
//eslint-disable-line


var latexString = function latexString(string, options) {
    // Remove potential HTML
    string = string.replace(/(<([^>]+)>)/gi, "");
    var regularExpression = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g;

    var stripDollars = function stripDollars(stringToStrip) {
        if (stringToStrip[1] === "$") {
            stringToStrip = stringToStrip.slice(2, -2);
        } else {
            stringToStrip = stringToStrip.slice(1, -1);
        }

        return stringToStrip;
    };

    var renderLatexString = function renderLatexString(s) {
        var renderedString = void 0;
        try {
            renderedString = _katex2.default.renderToString(s, options);
        } catch (err) {
            console.error("couldn`t convert string", s);
            return s;
        }
        return renderedString;
    };

    var result = [];

    var latexMatch = string.match(regularExpression);
    var stringWithoutLatex = string.split(regularExpression);

    if (latexMatch) {
        stringWithoutLatex.forEach(function (s, index) {
            result.push({
                string: s,
                type: "text"
            });
            if (latexMatch[index]) {
                result.push({
                    string: stripDollars(latexMatch[index]),
                    type: "latex"
                });
            }
        });
    } else {
        result.push({
            string: string,
            type: "text"
        });
    }

    var processResult = function processResult(resultToProcess) {
        var newResult = resultToProcess.map(function (r) {
            if (r.type === "text") {
                return r.string;
            }
            return renderLatexString(r.string);
        });

        return newResult.join(" ");
    };

    return processResult(result);
};

var Latex = function (_React$Component) {
    _inherits(Latex, _React$Component);

    function Latex() {
        _classCallCheck(this, Latex);

        return _possibleConstructorReturn(this, (Latex.__proto__ || Object.getPrototypeOf(Latex)).apply(this, arguments));
    }

    _createClass(Latex, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                children = _props.children,
                displayMode = _props.displayMode;

            return _react2.default.createElement("span", {
                dangerouslySetInnerHTML: {
                    __html: latexString(children, { displayMode: displayMode })
                }
            });
        }
    }]);

    return Latex;
}(_react2.default.Component);

Latex.propTypes = {
    children: _propTypes2.default.string,
    displayMode: _propTypes2.default.bool
};
Latex.defaultProps = {
    children: "",
    displayMode: false
};


if (module && module.exports) {
    module.exports = Latex;
} else {
    window.Latex = Latex;
}
