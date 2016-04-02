# Message

[![Build Status](https://travis-ci.org/mkdoc/mkmsg.svg?v=3)](https://travis-ci.org/mkdoc/mkmsg)
[![npm version](http://img.shields.io/npm/v/mkmsg.svg?v=3)](https://npmjs.org/package/mkmsg)
[![Coverage Status](https://coveralls.io/repos/mkdoc/mkmsg/badge.svg?branch=master&service=github&v=3)](https://coveralls.io/github/mkdoc/mkmsg?branch=master)

> Append or prepend a message

By default appends a message to a stream, use the `message` option to change the message; to prepend set the `prepend` option.

When no message is given the default generator message is used.

## Install

```
npm i mkmsg --save
```

For the command line interface install [mkdoc][] globally (`npm i -g mkdoc`).

---

- [Install](#install)
- [Usage](#usage)
- [Help](#help)
- [API](#api)
  - [msg](#msg)
    - [Options](#options)
- [License](#license)

---

## Usage

Create the stream and write a [commonmark][] document:

```javascript
var msg = require('mkmsg')
  , ast = require('mkast');
ast.src('This is a markdown paragraph.')
  .pipe(msg())
  .pipe(ast.stringify({indent: 2}))
  .pipe(process.stdout);
```

## Help

```
mkmsg [options]

Message injection.

  -m, --message=[MSG]     Custom message, parsed as markdown
  -p, --prepend           Prepend message to the stream
  -h, --help              Display help and exit
  --version               Print the version and exit

Report bugs to https://github.com/mkdoc/mkmsg/issues
```

## API

### msg

```javascript
msg([opts][, cb])
```

Append or prepend a message string.

The message string is parsed as markdown and written to the end of the
document unless `prepend` is given.

The document node itself is omitted; it's content nodes are written to
the stream.

Returns an output stream.

* `opts` Object processing options.
* `cb` Function callback function.

#### Options

* `input` Readable input stream.
* `output` Writable output stream.
* `message` String markdown message.
* `prepend` Boolean prepend message to the stream.

## License

MIT

---

Created by [mkdoc](https://github.com/mkdoc/mkdoc) on April 2, 2016

[mkdoc]: https://github.com/mkdoc/mkdoc
[mkparse]: https://github.com/mkdoc/mkparse
[commonmark]: http://commonmark.org
[jshint]: http://jshint.com
[jscs]: http://jscs.info

