var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkgen = require('../../index')
  , utils = require('../util');

describe('mkgen:', function() {

  it('should prepend to stream', function(done) {
    var source = 'test/fixtures/paragraph.md'
      , target = 'target/prepend.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data._file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output, prepend: true};
    
    mkgen(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      // open document
      expect(result[0]._type).to.eql(Node.DOCUMENT);

      // appended document (message)
      expect(result[1]._type).to.eql(Node.DOCUMENT);
      expect(result[1]._firstChild._type).to.eql(Node.PARAGRAPH);

      // EOF for injected document
      expect(result[2]._type).to.eql(Node.EOF);

      // mock document paragraph
      expect(result[3]._type).to.eql(Node.PARAGRAPH);

      // final EOF
      expect(result[4]._type).to.eql(Node.EOF);
      done();
    })
  });

});
