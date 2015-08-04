'use strict';
import assert from 'assert';
import latex from '../lib/latex';
import React from 'react';

var Test = React.createClass({
    render: function() {
        return (
            React.createElement(latex, null,
               "What is $\\sqrt{8}$?"
            )
        );
    }

});


describe('react-latex', function () {
    it('Should have katex class', function () {
        var testString = React.renderToStaticMarkup(<Test/>);

        assert.notEqual(-1, testString.indexOf('<span class="katex-mathml">'));

    });
});
