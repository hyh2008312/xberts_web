angular.module('xbertsApp')
  .directive('commentItem', function () {
    return {
      restrict: 'E',
      require: ['^^interact', '^^feedbackItem'],
      scope: {
        comment: '='
      },
      templateUrl: 'scripts/components/comments/commentItem.html',
      link: function (scope, element, attrs, ctrls) {

        var interactCtrl = ctrls[0];
        var feedbackItemCtrl = ctrls[1];
        scope.replyToggle = false;

        scope.replyClick = function () {
          scope.replyToggle = !scope.replyToggle;
        };

        scope.leaveComment = function (commentForm) {
          if (commentForm.$valid) {
            var comment = {
              details: scope.newComment.details,
              post_to: scope.comment.post
            };
            feedbackItemCtrl.leaveComment(comment).then(function() {
              scope.replyToggle = false;
            });
          }
        };

        scope.newComment = {};
      }
    }
  });
