if (Meteor.isClient) {

  surveys = new Mongo.Collection('surveys');


  //Routes
  Router.route('/', function () {
    this.render('survey');
  });
  Router.route('/surveyResults', function () {
    this.render('surveyResults');
  });



  Template.survey.events({
    'click button': function () {
      Router.go('/surveyResults')
    },
    'submit form': function(event){
      event.preventDefault()

      console.log(event.target.title.value)

      var newSurvey = {title: event.target.title.value}
      surveys.insert(newSurvey)

      console.log(surveys.find().fetch())
    }
  });


  Template.surveyResults.helpers({
    surveys : function(){
      var surveyResults = surveys.find().fetch()
      return surveyResults
    }

  });

  Template.surveyResults.events({
    'click button': function () {
      Router.go('/')
    },
  });
}



if (Meteor.isServer) {
  surveys = new Mongo.Collection('surveys');
}
