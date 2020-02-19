import React from "react";
import assert from "assert";
import ReactDomServer from "react-dom/server";
import latex from "./../src/latex";
import bracketString from "./strings/bracketString";

class Test extends React.Component {
    render() {
        return (
            React.createElement(latex, null,
               "What is $\\sqrt{8}$?"
            )
        );
    }
}

class TestBrackets extends React.Component {
    render() {
        return (
            React.createElement(latex, null,
               "What is $\\sqrt{8}$?"
            )
        );
    }
}


describe("react-latex", () => {
    it("Should have katex class", () => {
        const testString = ReactDomServer.renderToStaticMarkup(<Test />);
        assert.notEqual(-1, testString.indexOf("<span class=\"katex-mathml\">"));
    });

    // it("Should render string with brackets properly", () => {
    //     const testStringWithBrackets = ReactDomServer.renderToStaticMarkup(<TestBrackets />).trim();
    //     assert.equal(bracketString, testStringWithBrackets);
    // });

    it("It should not strip gt and lt", () => {        
        class TestLtGt extends React.Component {
            render () {
                return React.createElement(latex, null,  "compact size (< 20'), spectral types >M4");
            }
        }
        const testString = ReactDomServer.renderToStaticMarkup(<TestLtGt />);
        assert.equal( testString, "<span>compact size (&lt; 20&#x27;), spectral types &gt;M4</span>");
    });

    it("It should escape HTML tags outside of math", () => {        
        class TestLtGt extends React.Component {
            render () {
                return React.createElement(latex, null,
                    "compact size (<script>window.bad();</script> 20'), spectral $\\sqrt{8}$ types >M4");
            }
        }
        const testString = ReactDomServer.renderToStaticMarkup(<TestLtGt />);
        assert.equal(-1,  testString.indexOf("<script>window.bad();</script>"));
    });
    
    it("It should escape HTML tags inside of math", () => {        
        class TestLtGt extends React.Component {
            render () {
                return React.createElement(latex, null,  "compact size $<script>window.dobadstuff()</script>$");
            }
        }
        const testString = ReactDomServer.renderToStaticMarkup(<TestLtGt />);
        assert.equal(-1,  testString.indexOf("<script>window.dobadstuff()</script>"));
    });

    
});

