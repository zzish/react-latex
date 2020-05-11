/* @flow */
/* eslint-disable eslint-plugin-import */

import katex from "katex";
// Eslint doesn't like react being in peerDependencies
import React from "react"; //eslint-disable-line
import PropTypes from "prop-types";

const latexify = (string, options) => {
    const regularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[\s\S]+?\$/g;
    const blockRegularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g;

    const stripDollars = (stringToStrip) =>
        stringToStrip[0] === "$" && stringToStrip[1] !== "$"
            ? stringToStrip.slice(1, -1)
            : stringToStrip.slice(2, -2);

    const getDisplay = (stringToDisplay) =>
        stringToDisplay.match(blockRegularExpression) ? "block" : "inline";

    const renderLatexString = (s, t) => {
        let renderedString;
        try {
            // returns HTML markup
            renderedString = katex.renderToString(
                s,
                t === "block" ? Object.assign({ displayMode: true }, options) : options,
            );
        } catch (err) {
            console.error("couldn`t convert string", s);
            return s;
        }
        return renderedString;
    };

    const result = [];

    const latexMatch = string.match(regularExpression);
    const stringWithoutLatex = string.split(regularExpression);

    if (latexMatch) {
        stringWithoutLatex.forEach((s, index) => {
            result.push({
                string: s,
                type: "text",
            });
            if (latexMatch[index]) {
                result.push({
                    string: stripDollars(latexMatch[index]),
                    type: getDisplay(latexMatch[index]),
                });
            }
        });
    } else {
        result.push({
            string,
            type: "text",
        });
    }

    const processResult = (resultToProcess) => {
        const newResult = resultToProcess.map((r) => {
            if (r.type === "text") {
                return r.string;
            }
            return (
                <span dangerouslySetInnerHTML={{ __html: renderLatexString(r.string, r.type) }} />
            );
        });

        return newResult;
    };

    // Returns list of spans with latex and non-latex strings.
    return processResult(result);
};

class Latex extends React.Component {
    static propTypes = {
        children: PropTypes.string,
        displayMode: PropTypes.bool,
        leqno: PropTypes.bool,
        fleqn: PropTypes.bool,
        throwOnError: PropTypes.bool,
        errorColor: PropTypes.string,
        macros: PropTypes.object,
        minRuleThickness: PropTypes.number,
        colorIsTextColor: PropTypes.bool,
        maxSize: PropTypes.number,
        maxExpand: PropTypes.number,
        strict: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.func]),
        trust: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    };

    static defaultProps = {
        children: "",
        displayMode: false,
        output: "htmlAndMathml",
        leqno: false,
        fleqn: false,
        throwOnError: true,
        errorColor: "#cc0000",
        macros: {},
        minRuleThickness: 0,
        colorIsTextColor: false,
        strict: "warn",
        trust: false,
    };

    render() {
        const {
            children,
            displayMode,
            leqno,
            fleqn,
            throwOnError,
            errorColor,
            macros,
            minRuleThickness,
            colorIsTextColor,
            maxSize,
            maxExpand,
            strict,
            trust,
        } = this.props;

        const renderUs = latexify(children, {
            displayMode,
            leqno,
            fleqn,
            throwOnError,
            errorColor,
            macros,
            minRuleThickness,
            colorIsTextColor,
            maxSize,
            maxExpand,
            strict,
            trust,
        });
        renderUs.unshift(null);
        renderUs.unshift("span"); // put everything in a span
        // spread renderUs out to children args
        return React.createElement.apply(null, renderUs);
    }
}

if (module && module.exports) {
    module.exports = Latex;
} else {
    window.Latex = Latex;
}
