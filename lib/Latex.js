var katex = require('katex');
var React = require('react');

var latexString = function(string){

    string = string.replace(/(<([^>]+)>)/ig, '');
    var regularExpression = /\$\$[\s\S]+?\$\$|\$[\s\S]+?\$/g;

    var stripDollars = function(stringToStrip){

        if (stringToStrip[1] === '$'){
            stringToStrip = stringToStrip.slice(2, -2);
        } else {
            stringToStrip = stringToStrip.slice(1, -1);
        }

        return stringToStrip;

    };

    var renderLatexString = function(s){
        try {
            var renderedString = katex.renderToString(s);

        } catch (err){
            console.log('couldn`t convert string', s);
            return s;
        }
        return renderedString;
    }

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
            type: 'text'
        });
    }



    var processResult = function(resultToProcess) {

        var newResult = resultToProcess.map(function(r) {
            if (r.type === 'text') { return r.string; }
            if (r.type === 'latex') { return renderLatexString(r.string); }
        });

        return newResult.join(' ');
    };

    return processResult(result);

};






var Latex = React.createClass({

    propTypes: {
        children: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            children: ''
        };
    },
    render: function() {
        return (
            <span dangerouslySetInnerHTML={{__html: latexString(this.props.children)}}/>
        );
    }

});

module.exports = Latex;
