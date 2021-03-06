angular.module('xbertsApp')
  .factory('AskModel',['$state','urlParser','$sce',AskModel]);
function AskModel($state,urlParser,$sce) {

  function AskModel(data) {
    angular.extend(this, data);
  }

  AskModel.prototype = {
    getLatestUserId: function() {
      return this.latestAnswer.owner.id;
    },
    getLatestUserAvatar: function () {
      return this.latestAnswer.owner.avatar || false;
    },
    getLatestUserName: function () {
      return this.latestAnswer.owner.firstName;
    },
    getLatestUserPosition: function () {
      if(this.latestAnswer.owner.position && this.latestAnswer.owner.company) {
        return this.latestAnswer.owner.position +" @ "+ this.latestAnswer.owner.company;
      } else if(this.latestAnswer.owner.position && !this.latestAnswer.owner.company) {
        return this.latestAnswer.owner.position;
      } else if(!this.latestAnswer.owner.position && this.latestAnswer.owner.company){
        return this.latestAnswer.owner.company;
      } else {
        return "";
      }
    },
    getLatestBadgePoint: function() {
      return this.latestAnswer.owner.badgePoint;
    },
    getAnswerUserId: function() {
      return this.owner.id;
    },
    getAnswerUserAvatar: function () {
      return this.owner.avatar || false;
    },
    getAnswerUserName: function () {
      return this.owner.firstName;
    },
    getAnswerUserPosition: function () {
      if(this.owner.position && this.owner.company) {
        return this.owner.position +" @ "+ this.owner.company;
      } else if(this.owner.position && !this.owner.company) {
        return this.owner.position;
      } else if(!this.owner.position && this.owner.company){
        return this.owner.company;
      } else {
        return "";
      }
    },
    getOwnerBadgePoint: function() {
      return this.owner.badgePoint;
    },
    getShareUrl: function(id) {
      return $state.href("application.askQuestionMain.answerQuestionDetail", {questionId:id},{absolute:true});
    },
    getVideo: function() {
      var baseUrl = null, baseKey = null;
      switch(urlParser.parse(this.videoUrl).hostname){
        case 'www.youtube.com':
          baseUrl = '//www.youtube.com/embed/';
          baseKey = urlParser.parse(this.videoUrl).searchObject.v;
          baseUrl = !baseKey?null:$sce.trustAsResourceUrl(baseUrl + baseKey);
          break;
        case 'youtu.be':
          baseUrl = '//www.youtube.com/embed/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        case 'vimeo.com':
          baseUrl = '//player.vimeo.com/video/';
          baseUrl = $sce.trustAsResourceUrl(baseUrl +urlParser.parse(this.videoUrl).pathname.split('/')[1]);
          break;
        default:
          break;
      }
      return baseUrl;
    }
  };

  AskModel.build = function (data) {
    return new AskModel(data)
  };

  AskModel.buildPageList = function (data) {
    data.results = data.results.map(function (item) {
      return AskModel.build(item);
    });

    return data;
  };

  AskModel.buildList = function (data) {
    return data.map(function (item) {
      return AskModel.build(item);
    })
  };

  return AskModel;
}
