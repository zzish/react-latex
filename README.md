# react-latex [![NPM version][npm-image]][npm-url]

> React component to render latex strings, based on [Katex](https://github.com/Khan/KaTeX)

## Install

```sh
$ npm install --save react-latex
```

## Usage

In javascript

### Before using Latex

Include in your html Katex CSS

```html
<html>
    <head>
        <link
            href="//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css"
            rel="stylesheet"
        />
    </head>
</html>
```

### Inline Latex

```js
var Latex = require('react-latex');

...
    render(){
        return (
            <h3>
                <Latex>What is $(3\times 4) \div (5-3)$</Latex>
            </h3>
        );
    }
...
```

### Block Latex

```js
var Latex = require('react-latex');

...
    render(){
        return (
            <h3>
                <Latex displayMode={true}>$$(3\times 4) \div (5-3)$$</Latex>
            </h3>
        );
    }
...
```

### Options for Katex

A number of options are now supported. For a comprehensive list please visit: [here](https://katex.org/docs/options.html)

## License

MIT © [Zzish](http://www.zzish.com)

[npm-image]: https://badge.fury.io/js/react-latex.svg
[npm-url]: https://npmjs.org/package/react-latex
[travis-image]: https://travis-ci.org/zzish/react-latex.svg?branch=master
[travis-url]: https://travis-ci.org/zzish/react-latex
[daviddm-image]: https://david-dm.org/zzish/react-latex.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zzish/react-latex
