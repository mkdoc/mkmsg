var ast = require('mkast')
  , MSG = '---\nCreated by [mkdoc](https://github.com/mkdoc/mkdoc)'
  , Message = require('./message');

/**
 *  Append or prepend a message string.
 *
 *  The message string is parsed as markdown and written to the end of the 
 *  document unless `prepend` is given.
 *
 *  The document node itself is omitted; it's content nodes are written to 
 *  the stream.
 *
 *  @function msg
 *  @param {Object} [opts] processing options.
 *  @param {Function} [cb] callback function.
 *
 *  @option {Readable} [input] input stream.
 *  @option {Writable} [output] output stream.
 *  @option {String} [message] markdown message.
 *  @option {Boolean} [prepend] prepend message to the stream.
 *
 *  @returns an output stream.
 */
function msg(opts, cb) {

  opts = opts || {};
  opts.input = opts.input;
  opts.output = opts.output;

  var message = opts.message || MSG
    , d = new Date()
    , locale = opts.locale || 'en-gb';

  if(!opts.message) {
    //objDate.toLocaleString(locale, { month: "long" });
    message += ' on '
      + d.toLocaleString(locale, {month: 'long'})
      + ' '
      + d.toLocaleString(locale, {day: 'numeric'})
      + ', '
      + d.toLocaleString(locale, {year: 'numeric'});
  }

  var node = ast.parse(message)
    , stream = new Message({node: node, prepend: opts.prepend});

  if(!opts.input || !opts.output) {
    return stream; 
  }

  // pass through stream, we append or prepend
  ast.parser(opts.input)
    .pipe(stream)
    .pipe(ast.stringify())
    .pipe(opts.output);

  if(cb) {
    opts.output
      .once('error', cb)
      .once('finish', cb);
  }

  return opts.output;
}

module.exports = msg;
