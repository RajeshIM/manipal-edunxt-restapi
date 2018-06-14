var chai = require('chai'),
  chaiHttp = require('chai-http'),
  server = require('./../../bin/www'),
  expect = chai.expect,
  should = chai.should(),
  assert = chai.assert,
  moment = require('moment'),
  courseId = 0;

chai.config.includeStack = true;
chai.config.showDiff = true;
chai.use(chaiHttp);

describe('Organization Interests Details API', function () {
  describe('/api/v1/lnd/organization-interests-details', function () {

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
    //     .post('/api/v1/lnd/organization-interests-details')
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
        .post('/api/v1/lnd/organization-interests-details')
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

    it('should give the success response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/organization-interests-details')
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
            expect(res.body.data[0]).to.have.all.keys('courseId', 'courseName', 'hits', 'hitsSinceLastMonth', 
                                        'noOfFollowers','followersSinceLastMonth','videoTags','articalTags', 'avgRating');
            expect(res.body.data[0].courseId).to.be.a('number');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].hits).to.be.a('string');
            expect(res.body.data[0].hitsSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].noOfFollowers).to.be.a('string');
            expect(res.body.data[0].followersSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].videoTags).to.be.a('string');
            expect(res.body.data[0].articalTags).to.be.a('string');
            expect(res.body.data[0].avgRating).to.be.a('string');
          }
          done();
        })
    });

     it('should give the success response if valid LnDUserId and courseId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/organization-interests-details')
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
            expect(res.body.data[0]).to.have.all.keys('courseId', 'courseName', 'hits', 'hitsSinceLastMonth', 
                                        'noOfFollowers','followersSinceLastMonth','videoTags','articalTags', 'avgRating');
            expect(res.body.data[0].courseId).to.be.a('number');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].hits).to.be.a('string');
            expect(res.body.data[0].hitsSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].noOfFollowers).to.be.a('string');
            expect(res.body.data[0].followersSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].videoTags).to.be.a('string');
            expect(res.body.data[0].articalTags).to.be.a('string');
            expect(res.body.data[0].avgRating).to.be.a('string');
          }
          done();
        })
    });

    it('should give in between days data in response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
       var endDate = moment().format(__('YMD')),
        startDate = moment(endDate, __('YMD')).subtract(30, 'days').format(__('YMD'));
      chai.request(server)
        .post('/api/v1/lnd/organization-interests-details?start_date=' + startDate + '&end_date=' + endDate)
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
            expect(res.body.data[0]).to.have.all.keys('courseId', 'courseName', 'hits', 'hitsSinceLastMonth', 
                                        'noOfFollowers','followersSinceLastMonth','videoTags','articalTags', 'avgRating');
            expect(res.body.data[0].courseId).to.be.a('number');
            expect(res.body.data[0].courseName).to.be.a('string');
            expect(res.body.data[0].hits).to.be.a('string');
            expect(res.body.data[0].hitsSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].noOfFollowers).to.be.a('string');
            expect(res.body.data[0].followersSinceLastMonth).to.be.a('string');
            expect(res.body.data[0].videoTags).to.be.a('string');
            expect(res.body.data[0].articalTags).to.be.a('string');
            expect(res.body.data[0].avgRating).to.be.a('string');
          }
          done();
        })
    });
  })
}); 