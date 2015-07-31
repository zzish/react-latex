'use strict';
var detectLatex = function(string, regularExpression = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g){

    var stripDollars = function(stringToStrip){

        if (stringToStrip[1] === '$'){
            stringToStrip = stringToStrip.slice(2, -2);
        } else {
            stringToStrip = stringToStrip.slice(1, -1);
        }
        return stringToStrip;

    };
    var result = [];


    var latexMatch = string.match(regularExpression);
    var stringWithoutLatex = string.split(regularExpression);

    if (latexMatch){

        stringWithoutLatex.forEach(function(s, index) {
            result.push({
                string: s,
                type: 'text'
            });
            if(latexMatch[index]) {
                result.push({
                    string: stripDollars(latexMatch[index]),
                    type: 'latex'
                });
            }
        });


    } else {
        result.push({
            string: string,
            type: 'string'
        });
    }
    return result;
};



var Latex = React.createClass({

    propTypes: {
        className: React.PropTypes.string,
        children: React.PropTypes.string.isRequired
    },

    getInitialState: function() {
        var patternToDected = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g;
        var content = detectLatex(this.props.children, patternToDected);
        return {
            content
        };
    },

    render: function() {

        var content = this.state.content.map(c => {
            if (c.type === 'latex') {
                return (<TeX>{c.string}</TeX>);
            } else {
                return (<span>{c.string}</span>);
            }
        });

        return (
            <string className={className}>
                {content}
            </string>
        );
    }

});

module.exports = Latex;
