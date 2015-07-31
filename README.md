# react-latex [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> React component to render latex strings


## Install

```sh
$ npm install --save react-latex
```


## Usage

```js
var reactLatex = require('react-latex');

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

## License

MIT © [Zzish](http://www.zzish.com)


[npm-image]: https://badge.fury.io/js/react-latex.svg
[npm-url]: https://npmjs.org/package/react-latex
[travis-image]: https://travis-ci.org/zzish/react-latex.svg?branch=master
[travis-url]: https://travis-ci.org/zzish/react-latex
[daviddm-image]: https://david-dm.org/zzish/react-latex.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/zzish/react-latex
