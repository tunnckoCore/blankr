var jed = require('./index');

describe('j140', function () {
  it('should support locals (sync)', function (done) {
    var res = jed("Test #{this.state || 'pass'}", {state: 'sync'});
    res.should.equal('Test sync');
    done()
  });
  it('should support locals (async)', function (done) {
    jed("Test #{this.state || 'pass'}", {state: 'async'}, function (err, res) {
      if (err) return done(err);
      res.should.equal('Test async');
      done()
    });
  });
  it('should be default value if not locals defined', function (done) {
    var res = jed("Test #{this.state || 'pass'}");
    res.should.equal('Test pass');
    done()
  });
  it('should return function if 3rd argument is "true"', function (done) {
    var res = jed("Test #{this.state || 'fn'}", null, true);
    res.should.be.type('function');
    done()
  });
  it('should returned function get locals and return template', function (done) {
    var fn = jed("Test #{this.state || 'fn'}", null, true);
    var res = fn({state: 'locals, pass'});
    res.should.equal('Test locals, pass');
    done()
  });
});
