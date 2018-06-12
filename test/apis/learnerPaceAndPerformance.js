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

describe('Learner Pace-Performance API', function () {
  describe('/api/v1/lnd/learner-pace-performance', function () {

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .post('/api/v1/lnd/learner-pace-performance')
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
        .post('/api/v1/lnd/learner-pace-performance')
        .set({
          'LnDUserId':  123
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.should.have.property('data');
          res.body.data.should.be.a('object');
          expect(res.body.data).to.have.all.keys('paceData', 'performanceData');
          expect(res.body.data.paceData).to.have.all.keys('aheadOfSchedule', 'behindSchedule', 'onTrack', 'haveNotStarted');
          expect(res.body.data.performanceData).to.have.all.keys('excelling', 'passing', 'struggling');

          expect(res.body.data.paceData.aheadOfSchedule).to.be.a('number');
          expect(res.body.data.paceData.behindSchedule).to.be.a('number');
          expect(res.body.data.paceData.onTrack).to.be.a('number');
          expect(res.body.data.paceData.haveNotStarted).to.be.a('number');

          expect(res.body.data.performanceData.excelling).to.be.a('number');
          expect(res.body.data.performanceData.passing).to.be.a('number');
          expect(res.body.data.performanceData.struggling).to.be.a('number');

          done();
        })
    });

    it('should give the success response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance')
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
          expect(res.body.data).to.have.all.keys('paceData', 'performanceData');
          expect(res.body.data.paceData).to.have.all.keys('aheadOfSchedule', 'behindSchedule', 'onTrack', 'haveNotStarted');
          expect(res.body.data.performanceData).to.have.all.keys('excelling', 'passing', 'struggling');

          expect(res.body.data.paceData.aheadOfSchedule).to.be.a('number');
          expect(res.body.data.paceData.behindSchedule).to.be.a('number');
          expect(res.body.data.paceData.onTrack).to.be.a('number');
          expect(res.body.data.paceData.haveNotStarted).to.be.a('number');

          expect(res.body.data.performanceData.excelling).to.be.a('number');
          expect(res.body.data.performanceData.passing).to.be.a('number');
          expect(res.body.data.performanceData.struggling).to.be.a('number');
          
          done();
        })
    });
  })
});