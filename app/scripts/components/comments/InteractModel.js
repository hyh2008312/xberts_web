angular.module('xbertsApp')
  .factory('Interact', InteractModel);

function InteractModel() {
  function Interact(data) {
    angular.extend(this, data);
  }
  Interact.prototype ={
    getVoteAmount: function(){
      return this.vote_amount || this.voteAmount
    },
    increaseVote:function(){
      if(this.vote_amount != undefined) this.vote_amount += 1;
      if(this.voteAmount != undefined) this.voteAmount += 1;
    },
    reduceVote:function(){
      if(this.vote_amount != undefined) this.vote_amount -= 1;
      if(this.voteAmount != undefined) this.voteAmount -= 1;
    }
  };

  Interact.build = function (data) {
    var interact = new Interact(data);
    return interact;
  };

  return Interact;
}
