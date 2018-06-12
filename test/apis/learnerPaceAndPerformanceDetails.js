var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../bin/www'),
  expect = chai.expect,
  should = chai.should(),
  assert = chai.assert,
  moment = require('moment'),
  pace = 'pace',
  performance = 'performance',
  paceDisplay = 'AheadOfSchedule',
  performanceDisplay = 'Excelling';

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiHttp);

describe('Learner Pace-Performance Details API', function () {
  describe('/api/v1/lnd/learner-pace-performance-details', function () {

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .post('/api/v1/learner-pace-performance-details')
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
        .post('/api/v1/lnd/learner-pace-performance-details')
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

    it('should give the default response if valid LnDUserId is passed but type is not passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details')
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
          expect(res.body.data).to.be.an('array').that.is.empty;
          done();
        })
    });

    it('should give the success response for Learner-Pace if valid LnDUserId and type is passed as pace', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+pace)
        .set({
          'LnDUserId': 1
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('learnerPaceType', 'learnerPerformanceType', 'LnDUserId', 'courseId',
                                                      'batchId', 'teamId', 'teamLeaderId', 'learnerId', 'learnerName',
                                                      'serialNumber', 'courseName', 'teamName', 'batchName', 'teamLeaderName',
                                                      'scoreInCourse', 'scoreAvg', 'highestScore', 'actionMessage');

            expect(res.body.data[0].learnerPaceType).to.be.a('string');
            expect(res.body.data[0].learnerPerformanceType).to.be.a('string');
            expect(res.body.data[0].LnDUserId).to.be.a('number');
            expect(res.body.data[0].batchId).to.be.a('number');
            expect(res.body.data[0].teamId).to.be.a('number');
            expect(res.body.data[0].teamLeaderId).to.be.a('number');
            expect(res.body.data[0].learnerId).to.be.a('number');
            expect(res.body.data[0].learnerName).to.be.a('string');
            expect(res.body.data[0].serialNumber).to.be.a('string');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].teamName).to.be.a('string');
            expect(res.body.data[0].batchName).to.be.a('string');
            expect(res.body.data[0].teamLeaderName).to.be.a('string');
            expect(res.body.data[0].scoreInCourse).to.be.a('number');
            expect(res.body.data[0].scoreAvg).to.be.a('number');
            expect(res.body.data[0].highestScore).to.be.a('number');
            expect(res.body.data[0].actionMessage).to.be.a('string');
          }
          done();
        })


    });

    it('should give the success response for particular Learner-Pace if valid LnDUserId and type is passed as pace and displayFor as learnerPaceType', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+pace)
        .set({
          'LnDUserId': 1
        })
        .send({
          'displayFor': paceDisplay
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('learnerPaceType', 'learnerPerformanceType', 'LnDUserId', 'courseId',
                                                      'batchId', 'teamId', 'teamLeaderId', 'learnerId', 'learnerName',
                                                      'serialNumber', 'courseName', 'teamName', 'batchName', 'teamLeaderName',
                                                      'scoreInCourse', 'scoreAvg', 'highestScore', 'actionMessage');

            expect(res.body.data[0].learnerPaceType).to.be.a('string');
            expect(res.body.data[0].learnerPerformanceType).to.be.a('string');
            expect(res.body.data[0].LnDUserId).to.be.a('number');
            expect(res.body.data[0].batchId).to.be.a('number');
            expect(res.body.data[0].teamId).to.be.a('number');
            expect(res.body.data[0].teamLeaderId).to.be.a('number');
            expect(res.body.data[0].learnerId).to.be.a('number');
            expect(res.body.data[0].learnerName).to.be.a('string');
            expect(res.body.data[0].serialNumber).to.be.a('string');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].teamName).to.be.a('string');
            expect(res.body.data[0].batchName).to.be.a('string');
            expect(res.body.data[0].teamLeaderName).to.be.a('string');
            expect(res.body.data[0].scoreInCourse).to.be.a('number');
            expect(res.body.data[0].scoreAvg).to.be.a('number');
            expect(res.body.data[0].highestScore).to.be.a('number');
            expect(res.body.data[0].actionMessage).to.be.a('string');
          }
          done();
        })
    });

    it('should give the success response for Learner-Performance if valid LnDUserId and type is passed as performance', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+performance)
        .set({
          'LnDUserId': 1
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('learnerPaceType', 'learnerPerformanceType', 'LnDUserId', 'courseId',
                                                      'batchId', 'teamId', 'teamLeaderId', 'learnerId', 'learnerName',
                                                      'serialNumber', 'courseName', 'teamName', 'batchName', 'teamLeaderName',
                                                      'scoreInCourse', 'scoreAvg', 'highestScore', 'actionMessage');

            expect(res.body.data[0].learnerPaceType).to.be.a('string');
            expect(res.body.data[0].learnerPerformanceType).to.be.a('string');
            expect(res.body.data[0].LnDUserId).to.be.a('number');
            expect(res.body.data[0].batchId).to.be.a('number');
            expect(res.body.data[0].teamId).to.be.a('number');
            expect(res.body.data[0].teamLeaderId).to.be.a('number');
            expect(res.body.data[0].learnerId).to.be.a('number');
            expect(res.body.data[0].learnerName).to.be.a('string');
            expect(res.body.data[0].serialNumber).to.be.a('string');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].teamName).to.be.a('string');
            expect(res.body.data[0].batchName).to.be.a('string');
            expect(res.body.data[0].teamLeaderName).to.be.a('string');
            expect(res.body.data[0].scoreInCourse).to.be.a('number');
            expect(res.body.data[0].scoreAvg).to.be.a('number');
            expect(res.body.data[0].highestScore).to.be.a('number');
            expect(res.body.data[0].actionMessage).to.be.a('string');
          }
          done();
        })


    });

    it('should give the success response for particular Learner-Performance if valid LnDUserId and type is passed as performance and displayFor as learnerPerformanceType', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+performance)
        .set({
          'LnDUserId': 1
        })
        .send({
          'displayFor': performanceDisplay
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('learnerPaceType', 'learnerPerformanceType', 'LnDUserId', 'courseId',
                                                      'batchId', 'teamId', 'teamLeaderId', 'learnerId', 'learnerName',
                                                      'serialNumber', 'courseName', 'teamName', 'batchName', 'teamLeaderName',
                                                      'scoreInCourse', 'scoreAvg', 'highestScore', 'actionMessage');

            expect(res.body.data[0].learnerPaceType).to.be.a('string');
            expect(res.body.data[0].learnerPerformanceType).to.be.a('string');
            expect(res.body.data[0].LnDUserId).to.be.a('number');
            expect(res.body.data[0].batchId).to.be.a('number');
            expect(res.body.data[0].teamId).to.be.a('number');
            expect(res.body.data[0].teamLeaderId).to.be.a('number');
            expect(res.body.data[0].learnerId).to.be.a('number');
            expect(res.body.data[0].learnerName).to.be.a('string');
            expect(res.body.data[0].serialNumber).to.be.a('string');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].teamName).to.be.a('string');
            expect(res.body.data[0].batchName).to.be.a('string');
            expect(res.body.data[0].teamLeaderName).to.be.a('string');
            expect(res.body.data[0].scoreInCourse).to.be.a('number');
            expect(res.body.data[0].scoreAvg).to.be.a('number');
            expect(res.body.data[0].highestScore).to.be.a('number');
            expect(res.body.data[0].actionMessage).to.be.a('string');
          }
          done();
        })
    });

  })
}); 