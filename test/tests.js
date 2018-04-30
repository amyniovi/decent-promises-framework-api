//mocha with chai

const chai = require('chai');
const assert = require('assert');
const should = chai.should();

it('should complete this test', function (done) {
  return new Promise(function (resolve) {
    assert.ok(true);
    resolve();
  })
    .then(done);
}); 
var  error = new  Error('oops');
it('passing dummy',()=>
{
 should.throw(()=>{throw error;},error);
} 
  
);
