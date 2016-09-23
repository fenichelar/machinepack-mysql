var assert = require('assert');
var Pack = require('../../');

describe('Connectable ::', function() {
  describe('Create Manager', function() {
    it('should validate the connection string has a protocol', function(done) {
      Pack.createManager({
        connectionString: 'localhost:5432/mppg'
      })
      .exec(function(err) {
        assert(err);
        assert.equal(err.exit, 'malformed');

        return done();
      });
    });

    it('should successfully return a Pool', function(done) {
      Pack.createManager({
        connectionString: 'mysql://mp:mp@localhost:5432/mppg'
      })
      .exec(function(err, report) {
        if (err) {
          return done(err);
        }

        // Assert that the manager has a pool object
        assert(report.manager.pool);

        // Assert that the manager has a getConnection function
        assert(report.manager.pool.getConnection);

        return done();
      });
    });
  });
});