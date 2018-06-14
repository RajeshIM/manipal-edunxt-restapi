var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../bin/www'),
  expect = chai.expect,
  should = chai.should(),
  assert = chai.assert,
  moment = require('moment'),
  courseId = 0,
  quiz = 'quiz',
  assignment = 'assignment',
  test = 'test';

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiHttp);

describe('Scores Distribution API', function () {
  describe('/api/v1/lnd/scores-distribution', function () {

    before('all courses', function(done) {
      chai.request(server)
        .get('/api/v1/lnd/courses-dropdown')
        .end(function (err, res) {
          var data = res.body.data;
          if (data.length > 0) courseId = data[0].courseId;
          done();
        })
    })

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .post('/api/v1/lnd/scores-distribution')
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
        .post('/api/v1/lnd/scores-distribution')
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
        .post('/api/v1/lnd/scores-distribution')
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give the default response if valid LnDUserId and courseId is passed but type is not passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/scores-distribution')
        .set({
          'LnDUserId': 1,
          'courseId': courseId
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give the success response for Learner-Pace if valid LnDUserId and type is passed as quiz', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+quiz)
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give the success response for Learner-Pace if valid LnDUserId and courseId and type is passed as quiz', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+quiz)
        .set({
          'LnDUserId': 1,
          'courseId': courseId
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give the success response for Learner-Performance if valid LnDUserId and type is passed as assignment', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+assignment)
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give the success response for Learner-Performance if valid LnDUserId and courseId and type is passed as assignment', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+assignment)
        .set({
          'LnDUserId': 1,
          'courseId': courseId
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

     it('should give the success response for Learner-Performance if valid LnDUserId and type is passed as test', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+test)
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

     it('should give the success response for Learner-Performance if valid LnDUserId and courseId and type is passed as test', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/learner-pace-performance-details?type='+test)
        .set({
          'LnDUserId': 1,
          'courseId': courseId
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          expect(res.body.data).to.be.an('array');
          if (res.body.data.length > 0) {
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });

    it('should give in between days data in response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
       var endDate = moment().format(__('YMD')),
        startDate = moment(endDate, __('YMD')).subtract(30, 'days').format(__('YMD'));
      chai.request(server)
        .post('/api/v1/lnd/scores-distribution?start_date=' + startDate + '&end_date=' + endDate)
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
            expect(res.body.data[0]).to.have.all.keys('scoreRanges', 'numberOfUsers');
            expect(res.body.data[0].scoreRanges).to.be.a('string');
            expect(res.body.data[0].numberOfUsers).to.be.a('number');
          }
          done();
        })
    });
  })
}); 