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

describe('Learning Activities API', function () {
  describe('/api/v1/lnd/learning-activities', function () {

    // it('should give error if LnDUserId is not passed', function (done) {
    //   chai.request(server)
    //     .get('/api/v1/lnd/learning-activities')
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
        .get('/api/v1/lnd/learning-activities')
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
          expect(res.body.data).to.have.all.keys('activeUsers', 'learnerEngagement', 'learnerPace', 'feedback');
          expect(res.body.data.activeUsers).to.have.all.keys('activeUsers', 'changeInUsers', 'peopleCurrentlyEnrolled', 'usersSinceLastMonth');
          expect(res.body.data.learnerEngagement).to.have.all.keys('peopleCompletedTraining', 'peopleChange');
          expect(res.body.data.learnerPace).to.have.all.keys('behindSchedule', 'haventStarted', 'onTrack', 'aheadOfSchedule');
          expect(res.body.data.feedback).to.have.all.keys('learnerSatisfaction', 'learnerSatisfactionChange', 'trainerRating', 'trainerRatingChange',
                                                          'contentRating', 'contentRatingChange');

          expect(res.body.data.activeUsers.activeUsers).to.be.a('number');
          expect(res.body.data.activeUsers.changeInUsers).to.be.a('number');
          expect(res.body.data.activeUsers.peopleCurrentlyEnrolled).to.be.a('number');
          expect(res.body.data.activeUsers.usersSinceLastMonth).to.be.a('number');

          expect(res.body.data.learnerEngagement.peopleCompletedTraining).to.be.a('number');
          expect(res.body.data.learnerEngagement.peopleChange).to.be.a('number');

          expect(res.body.data.learnerPace.behindSchedule).to.be.a('number');
          expect(res.body.data.learnerPace.haventStarted).to.be.a('number');
          expect(res.body.data.learnerPace.onTrack).to.be.a('number');
          expect(res.body.data.learnerPace.aheadOfSchedule).to.be.a('number');

          expect(res.body.data.feedback.learnerSatisfaction).to.be.a('number');
          expect(res.body.data.feedback.learnerSatisfactionChange).to.be.a('number');
          expect(res.body.data.feedback.trainerRating).to.be.a('number');
          expect(res.body.data.feedback.trainerRatingChange).to.be.a('number');
          expect(res.body.data.feedback.contentRating).to.be.a('number');
          expect(res.body.data.feedback.contentRatingChange).to.be.a('number');
          done();
        })
    });

    it('should give the success response if valid LnDUserId is passed', function (done) {
      // this.timeout(5000);
      chai.request(server)
        .get('/api/v1/lnd/learning-activities')
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
          expect(res.body.data).to.have.all.keys('activeUsers', 'learnerEngagement', 'learnerPace', 'feedback');
          expect(res.body.data.activeUsers).to.have.all.keys('activeUsers', 'changeInUsers', 'peopleCurrentlyEnrolled', 'usersSinceLastMonth');
          expect(res.body.data.learnerEngagement).to.have.all.keys('peopleCompletedTraining', 'peopleChange');
          expect(res.body.data.learnerPace).to.have.all.keys('behindSchedule', 'haventStarted', 'onTrack', 'aheadOfSchedule');
          expect(res.body.data.feedback).to.have.all.keys('learnerSatisfaction', 'learnerSatisfactionChange', 'trainerRating', 'trainerRatingChange',
                                                          'contentRating', 'contentRatingChange');
          expect(res.body.data.activeUsers.activeUsers).to.be.a('number');
          expect(res.body.data.activeUsers.changeInUsers).to.be.a('number');
          expect(res.body.data.activeUsers.peopleCurrentlyEnrolled).to.be.a('number');
          expect(res.body.data.activeUsers.usersSinceLastMonth).to.be.a('number');

          expect(res.body.data.learnerEngagement.peopleCompletedTraining).to.be.a('number');
          expect(res.body.data.learnerEngagement.peopleChange).to.be.a('number');

          expect(res.body.data.learnerPace.behindSchedule).to.be.a('number');
          expect(res.body.data.learnerPace.haventStarted).to.be.a('number');
          expect(res.body.data.learnerPace.onTrack).to.be.a('number');
          expect(res.body.data.learnerPace.aheadOfSchedule).to.be.a('number');

          expect(res.body.data.feedback.learnerSatisfaction).to.be.a('number');
          expect(res.body.data.feedback.learnerSatisfactionChange).to.be.a('number');
          expect(res.body.data.feedback.trainerRating).to.be.a('number');
          expect(res.body.data.feedback.trainerRatingChange).to.be.a('number');
          expect(res.body.data.feedback.contentRating).to.be.a('number');
          expect(res.body.data.feedback.contentRatingChange).to.be.a('number');
          
          done();
        })
    });
  })
});