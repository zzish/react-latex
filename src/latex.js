/* @flow */
/* eslint-disable eslint-plugin-import */

import katex from "katex";
// Eslint doesn't like react being in peerDependencies
import React from "react"; //eslint-disable-line
import PropTypes from "prop-types";

const latexString = (string, options) => {
    // Remove potential HTML
    string = string.replace(/(<([^>]+)>)/gi, "");
    const regularExpression = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g;

    const stripDollars = (stringToStrip) => {
        if (stringToStrip[1] === "$") {
            stringToStrip = stringToStrip.slice(2, -2);
        } else {
            stringToStrip = stringToStrip.slice(1, -1);
        }

        return stringToStrip;
    };

    const renderLatexString = (s) => {
        let renderedString;
        try {
            renderedString = katex.renderToString(s, options);
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
                    type: "latex",
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
            return renderLatexString(r.string);
        });

        return newResult.join(" ");
    };

    return processResult(result);
};

class Latex extends React.Component {
    static propTypes = {
        children: PropTypes.string,
        displayMode: PropTypes.bool,
    };

    static defaultProps = {
        children: "",
        displayMode: false,
    };

    render() {
        const { children, displayMode } = this.props;
        return (
            <span
                dangerouslySetInnerHTML={{
                    __html: latexString(children, { displayMode }),
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
