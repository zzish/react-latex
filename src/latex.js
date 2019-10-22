/* @flow */
/* eslint-disable eslint-plugin-import */

import katex from "katex";
// Eslint doesn't like react being in peerDependencies
import React from "react"; //eslint-disable-line
import PropTypes from "prop-types";

const latexString = (string, options) => {
    // Remove potential HTML
    string = string.replace(/(<([^>]+)>)/gi, "");
    const regularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)|\$[\s\S]+?\$/g;
    const blockRegularExpression = /\$\$[\s\S]+?\$\$|\\\[[\s\S]+?\\\]/g;

    const stripDollars = (stringToStrip) =>
        (stringToStrip[0] === "$" && stringToStrip[1] !== "$"
            ? stringToStrip.slice(1, -1)
            : stringToStrip.slice(2, -2));

    const getDisplay = (stringToDisplay) =>
        (stringToDisplay.match(blockRegularExpression) ? "block" : "inline");

    const renderLatexString = (s, t) => {
        let renderedString;
        try {
            renderedString = katex.renderToString(
                s,
                t === "block" ? Object.assign(options, { displayMode: true }) : options
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
            return renderLatexString(r.string, r.type);
        });

        return newResult.join(" ");
    };

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
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: latexString(children, {
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
                    }),
                }}
            />
        );
    }
}

if (module && module.exports) {
    module.exports = Latex;
} else {
    window.Latex = Latex;
}
