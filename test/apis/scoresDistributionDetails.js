var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../bin/www'),
  expect = chai.expect,
  should = chai.should(),
  assert = chai.assert,
  moment = require('moment'),
  quiz = 'quiz',
  assignment = 'assignment',
  test = 'test';

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiHttp);

describe('Scores Distribution Details API', function () {
  describe('/api/v1/lnd/scores-distribution-details', function () {

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .post('/api/v1/lnd/scores-distribution-details')
    //     .end(function (err, res) {
    //       res.should.have.status(400);
    //       res.body.should.have.property('statusCode');
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.a('object');
    //       res.body.status.should.have.property('type').eql('error');
    //       res.body.status.should.have.property('message').eql('Invalid or missing LnDUserId');
    //       done();
    //     })
    // });

    it('should give the default response if invalid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/scores-distribution-details')
        .set({
          'LnDUserId': 123
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.should.have.property('data');
          expect(res.body.data).to.be.an('array').that.is.empty;
          done();
        })
    });

    it('should give the default response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/scores-distribution-details')
        .set({
          'LnDUserId': 1
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.should.have.property('data');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('learnerId', 'learnerName', 'serialNumber', 'team','courseId', 
                                                      'batchId', 'scoreAvg', 'batchName', 'noOfAttempts', 'Progress');
            expect(res.body.data[0].learnerId).to.be.a('number');
            expect(res.body.data[0].learnerName).to.be.a('string');
            expect(res.body.data[0].serialNumber).to.be.a('string');
            expect(res.body.data[0].team).to.be.a('string');
            expect(res.body.data[0].courseId).to.be.a('number');
            expect(res.body.data[0].batchId).to.be.a('number');
            expect(res.body.data[0].scoreAvg).to.be.a('number');
            expect(res.body.data[0].batchName).to.be.a('string');
            expect(res.body.data[0].noOfAttempts).to.be.a('number');
            expect(res.body.data[0].Progress).to.be.a('number');
          }
          done();
        })
    });

    // it('should give the success response for Learner-Pace if valid LnDUserId and diplayFor is passed as quiz', function (done) {
    //   // this.timeout(5000);
    //   chai.request(server)
    //     .post('/api/v1/lnd/scores-distribution-details')
    //     .set({
    //       'LnDUserId': 1
    //     })
    //     .send({
    //       'displayFor': 'quiz'
    //     })
    //     .end(function (err, res) {
    //       should.equal(err, null);
    //       res.should.have.status(200);
    //       res.body.should.have.property('status');
    //       res.body.status.should.be.a('object');
    //       res.body.status.should.have.property('type').eql('success');
    //       expect(res.body.data).to.be.an('array');
    //       if (res.body.data.length > 0) {
    //         expect(res.body.data[0]).to.have.all.keys('learnerId', 'learnerName', 'serialNumber', 'team','courseId', 
    //                                                   'batchId', 'scoreAvg', 'batchName', 'noOfAttempts', 'Progress');
    //         expect(res.body.data[0].learnerId).to.be.a('number');
    //         expect(res.body.data[0].learnerName).to.be.a('string');
    //         expect(res.body.data[0].serialNumber).to.be.a('string');
    //         expect(res.body.data[0].team).to.be.a('string');
    //         expect(res.body.data[0].courseId).to.be.a('number');
    //         expect(res.body.data[0].batchId).to.be.a('number');
    //         expect(res.body.data[0].scoreAvg).to.be.a('number');
    //         expect(res.body.data[0].batchName).to.be.a('string');
    //         expect(res.body.data[0].noOfAttempts).to.be.a('number');
    //         expect(res.body.data[0].Progress).to.be.a('number');
    //       }
    //       done();
    //     })
    // });

  })
}); 
