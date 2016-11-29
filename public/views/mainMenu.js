(function () {
  'use strict';

  const View = window.View;
  const TopMenu = window.TopMenu;
  const request = window.request;
  const MainMenu = window.MainMenu;

  class MainMenuView extends View {
    constructor(options = {}) {
      super(options);
      this._el = document.querySelector('#js-topmenu');
      this.hide();

      //test
      if (localStorage.getItem('UserProfile')) {
            window.UserProfile= JSON.parse(localStorage.getItem('UserProfile'));
      }


      this.topmenu = new TopMenu({
        data: window.UserProfile
      });
      this._el.appendChild(this.topmenu._el);

      this._el = document.querySelector('#js-mainmenu');
      this.hide();
      this.mainmenu = new MainMenu({
        data:{
          buttons: [
            {
              tabindex: '1',
              id: "btn_start",
              text: "Играть!"
            },
            {
              tabindex: '2',
              id: "btn_totorial",
              text: "Туториал"
            },
            {
              tabindex: '3',
              id: "btn_top_list",
              text: "Рейтинг"
            },
            {
              tabindex: '4',
              id: "btn_exit",
              text: "Выйти"
            },
          ],
        }
      });
      this._el.appendChild(this.mainmenu._el);
    }

    render(options = {}) {

    }

    init(options = {}) {
      this.setAttrs(options.attrs);

      console.log("init topmenu");
      this.topmenu._el.querySelector('#top_btn_exit').addEventListener('click', (event)=> {
        event.preventDefault();
        this._el = document.querySelector('#js-topmenu');
        this.hide();
        //TODO: доделать выход
        localStorage.removeItem('UserProfile');
        //TODO: пересоздавать вью или как тест пусть будет
        this.router.go('/');
      });

      console.log("init mainmenu");
      this.mainmenu._el.querySelector('#btn_exit').addEventListener('click', (event)=> {
        event.preventDefault();
        this._el = document.querySelector('#js-topmenu');
        this.hide();
        //TODO: доделать выход
        localStorage.removeItem('UserProfile');
        //TODO: пересоздавать вью или как тест пусть будет
        this.router.go('/');
      });

      this.mainmenu._el.querySelector('#btn_top_list').addEventListener('click', (event)=> {
        event.preventDefault();
        console.log("go to top list");
        this.router.go('/toplist');
      });

      this.mainmenu._el.querySelector('#btn_start').addEventListener('click', (event)=> {
        event.preventDefault();
        this.mainmenu._el.querySelector('.waiting-sign').hidden = false;

        window.gamesession = new GameWorker(JSON.parse(localStorage.getItem('UserProfile')));
        window.gamesession.onstatuschange = function(){
          if(window.gamesession.status === 3){
          console.log("go to game");
          this.router.go('/game');
        }
      }.bind(this);
      window.gamesession.start();
      });

    }

    pause(options = {}) {
      this._el = document.querySelector('#js-mainmenu');
      this.hide();
    }


    resume(options = {}) {
      if (!options.username && !options.email) {
        //		return this.router.go('/');
      }
//test

if (!localStorage.getItem('UserProfile')) {
  		return this.router.go('/');
}



      // TODO: дописать реализацию

      this._el = document.querySelector('#js-topmenu');
      //this._el.appendChild(this.topmenu._el);
      this.show();
      this._el = document.querySelector('#js-mainmenu');
      this.show();
    }
  }
  // export
  window.MainMenuView = MainMenuView;

})();
