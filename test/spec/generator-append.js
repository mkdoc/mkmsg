var expect = require('chai').expect
  , fs = require('fs')
  , mkast = require('mkast')
  , Node = mkast.Node
  , parser = new mkast.Parser()
  , mkgen = require('../../index')
  , utils = require('../util');

describe('mkgen:', function() {

  it('should append to stream', function(done) {
    var source = 'test/fixtures/paragraph.md'
      , target = 'target/append.json.log'
      , data = parser.parse('' + fs.readFileSync(source))

    // mock file for correct relative path
    // mkcat normally injects this info
    data._file = source;

    var input = mkast.serialize(data)
      , output = fs.createWriteStream(target)
      , opts = {input: input, output: output};
    
    mkgen(opts);

    output.once('finish', function() {
      var result = utils.result(target);

      console.dir(result);

      // open document
      expect(result[0]._type).to.eql(Node.DOCUMENT);

      // mock document paragraph
      expect(result[1]._type).to.eql(Node.PARAGRAPH);

      // appended document (message)
      expect(result[2]._type).to.eql(Node.DOCUMENT);
      expect(result[2]._firstChild._type).to.eql(Node.PARAGRAPH);

      // EOF for both documents
      expect(result[3]._type).to.eql(Node.EOF);
      expect(result[4]._type).to.eql(Node.EOF);

      done();
    })
  });

});
