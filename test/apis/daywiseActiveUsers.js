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

describe('Daywise Active Users API', function () {
  describe('/api/v1/lnd/active-users-graph', function () {

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
    //     .post('/api/v1/lnd/active-users-graph')
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
        .post('/api/v1/lnd/active-users-graph')
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
          res.body.data.should.be.a('object');
          expect(res.body.data).to.have.all.keys('totalUsers', 'currentActivity', 'graphData');
          expect(res.body.data.graphData).to.be.an('array').that.is.empty;
          done();
        })
    });

    it('should give the success response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/active-users-graph')
        .set({
          'LnDUserId': 1
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.data.should.be.a('object');

          expect(res.body.data).to.have.all.keys('totalUsers', 'currentActivity', 'graphData');
          expect(res.body.data.graphData).to.be.an('array');
          if (res.body.data.graphData.length > 0) {
            expect(res.body.data.graphData[0]).to.have.all.keys('LnDUserId', 'date', 'activeLearners', 'activeFacultiesAndAdmins',
                                                      'onlineDelivery', 'offlineDelivery');
            expect(res.body.data.graphData[0].LnDUserId).to.be.a('number');
            expect(res.body.data.graphData[0].date).to.be.a('string');
            expect(res.body.data.graphData[0].activeLearners).to.be.a('string');
            expect(res.body.data.graphData[0].activeFacultiesAndAdmins).to.be.a('string');
            expect(res.body.data.graphData[0].onlineDelivery).to.be.a('string');
            expect(res.body.data.graphData[0].offlineDelivery).to.be.a('string');
          }
          
          done();
        })
    });

    it('should give the success response if valid LnDUserId and courseId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .post('/api/v1/lnd/active-users-graph')
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
          res.body.data.should.be.a('object');

          expect(res.body.data).to.have.all.keys('totalUsers', 'currentActivity', 'graphData');
          expect(res.body.data.graphData).to.be.an('array');
          if (res.body.data.graphData.length > 0) {
            expect(res.body.data.graphData[0]).to.have.all.keys('LnDUserId', 'date', 'activeLearners', 'activeFacultiesAndAdmins',
                                                      'onlineDelivery', 'offlineDelivery');
            expect(res.body.data.graphData[0].LnDUserId).to.be.a('number');
            expect(res.body.data.graphData[0].date).to.be.a('string');
            expect(res.body.data.graphData[0].activeLearners).to.be.a('string');
            expect(res.body.data.graphData[0].activeFacultiesAndAdmins).to.be.a('string');
            expect(res.body.data.graphData[0].onlineDelivery).to.be.a('string');
            expect(res.body.data.graphData[0].offlineDelivery).to.be.a('string');
          }
          
          done();
        })
    });

    it('should give in between days data in response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
       var endDate = moment().format(__('YMD')),
        startDate = moment(endDate, __('YMD')).subtract(30, 'days').format(__('YMD'));
      chai.request(server)
        .post('/api/v1/lnd/active-users-graph?start_date=' + startDate + '&end_date=' + endDate)
        .set({
          'LnDUserId': 1
        })
        .end(function (err, res) {
          should.equal(err, null);
          res.should.have.status(200);
          res.body.should.have.property('status');
          res.body.status.should.be.a('object');
          res.body.status.should.have.property('type').eql('success');
          res.body.data.should.be.a('object');

          expect(res.body.data).to.have.all.keys('totalUsers', 'currentActivity', 'graphData');
          expect(res.body.data.graphData).to.be.an('array');
          if (res.body.data.graphData.length > 0) {
            expect(res.body.data.graphData[0]).to.have.all.keys('LnDUserId', 'date', 'activeLearners', 'activeFacultiesAndAdmins',
                                                      'onlineDelivery', 'offlineDelivery');
            expect(res.body.data.graphData[0].LnDUserId).to.be.a('number');
            expect(res.body.data.graphData[0].date).to.be.a('string');
            expect(res.body.data.graphData[0].activeLearners).to.be.a('string');
            expect(res.body.data.graphData[0].activeFacultiesAndAdmins).to.be.a('string');
            expect(res.body.data.graphData[0].onlineDelivery).to.be.a('string');
            expect(res.body.data.graphData[0].offlineDelivery).to.be.a('string');
          }
          done();
        })
    });
    
  })
});