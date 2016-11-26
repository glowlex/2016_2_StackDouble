(function () {
  'use strict';
  const PlayerModel =	window.PlayerModel;
  class Player extends PlayerModel{
    /**
    * Создаёт нового игрока
    * @param {Card[]} hand - колода игрока
    * @param {string} action - действие игрока
    * @param {boolean} has_new_action - наличие нового действия
    * @param {object} action
    * @param {boolean} action.action
    * @param {Card[]} action.cards
    */
    constructor(data) {
      super(data);
      this.hand = [];
      this.has_new_action = false;
      this.action = {action:false, cards:[]};
    }

    //TODO: выбрать реализацию в зависимости от инфы от сервера
    /**
    * апдейт колоды игрока
    * @param {Card[]} hand - колода игрока
    */
    update(hand){
      this.hand = hand;
    }

    /**
    * апдейт колоды игрока
    * @returns {object} action - колода игрока
    */
    get_action(){
      if(this.action.action !== true){
        this.has_new_action = false;
        return this.action;
      } else {
        return {action:false};
      }
    }

    /**
    * возвращает колличество карт у игрока
    * @return {number} total - колода игрока
    */
    get total_cards(){
      var total =0;
      this.hand.forEach((item, i, hand) => {
        total+=item.total_cards;
      }, total);
      return total;
    }

    /**
    * фиксирует действие для отправки на сервер
    * @returns {statusText}
    */
    do_action(action, cards){
      var backup  = JSON.parse(JSON.stringify(this.hand));
      cards.forEach((item, i, cards) => {
        for(j=0; j<this.hand.length; j++){
          if(item.value === this.hand[j].value) {
            this.hand[j].total_cards--;
            if(this.hand[j].total_cards<0){
              this.hand=backup;
              return "error";
            }
            break;
          }
        }
      });
      if(cards.length !==0 ){
        this.action.cards = cards;
        this.action.action = action;
        this.has_new_action = true;
      }
      return "ok";
    }

  }


  class Card{
    /**
    * Создаёт карту представляющую собой набор карт такого же номинала
    * @param {string} type - номинал карты
    * @param {number} total_cards - всего катр такого номинала
    * @param {number} new_cards - новых с последней раздачи
    */
    constructor(type, total_cards, new_cards) {
      this.type = type;
      this.total_cards = total_cards || 0;
      this.new_cards = new_cards || 0;
    }
  }


//export
window.GamePlayer = Player;
})();
