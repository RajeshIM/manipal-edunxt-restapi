var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../bin/www'),
  expect = chai.expect,
  should = chai.should(),
  assert = chai.assert,
  moment = require('moment');

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiHttp);

describe('Goals API', function () {
  describe('/api/v1/lnd/goals', function () {

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .get('/api/v1/lnd/goals')
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
        .get('/api/v1/lnd/goals')
        .set({
          'LnDUserId':  0
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          expect(res.body.data).to.have.all.keys('timeSpent', 'usersTrained');
          expect(res.body.data.timeSpent).to.have.all.keys('timeSpent', 'totalTime', 'timeSpentPercentage', 'expectedTimeSpentPercentage');
          expect(res.body.data.usersTrained).to.have.all.keys('usersTrained', 'usersCompletedTraining', 'usersCompletedTrainingPercentage',
                                                              'usersCompletedTrainingExpectedPercentage');

          expect(res.body.data.timeSpent.timeSpent).to.be.a('number');
          expect(res.body.data.timeSpent.totalTime).to.be.a('number');
          expect(res.body.data.timeSpent.timeSpentPercentage).to.be.a('number');
          expect(res.body.data.timeSpent.expectedTimeSpentPercentage).to.be.a('number');

          expect(res.body.data.usersTrained.usersTrained).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTraining).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTrainingPercentage).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTrainingExpectedPercentage).to.be.a('number');

          done();
        })
    });

    it('should give the success response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .get('/api/v1/lnd/goals')
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
          res.body.data.should.be.a('object');
          expect(res.body.data).to.have.all.keys('timeSpent', 'usersTrained');
          expect(res.body.data.timeSpent).to.have.all.keys('timeSpent', 'totalTime', 'timeSpentPercentage', 'expectedTimeSpentPercentage');
          expect(res.body.data.usersTrained).to.have.all.keys('usersTrained', 'usersCompletedTraining', 'usersCompletedTrainingPercentage',
                                                              'usersCompletedTrainingExpectedPercentage');

          expect(res.body.data.timeSpent.timeSpent).to.be.a('number');
          expect(res.body.data.timeSpent.totalTime).to.be.a('number');
          expect(res.body.data.timeSpent.timeSpentPercentage).to.be.a('number');
          expect(res.body.data.timeSpent.expectedTimeSpentPercentage).to.be.a('number');

          expect(res.body.data.usersTrained.usersTrained).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTraining).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTrainingPercentage).to.be.a('number');
          expect(res.body.data.usersTrained.usersCompletedTrainingExpectedPercentage).to.be.a('number');
          
          done();
        })
    });
  })
});