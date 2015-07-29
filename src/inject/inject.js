chrome.extension.sendMessage({}, function (response) {
  var readyStateCheckInterval = setInterval(function () {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);
    } else {
      return;
    }

    // ----------------------------------------------------------
    // This part of the script triggers when page is done loading
    console.log("==========> Hello. This message was sent from scripts/inject.js");
    // ----------------------------------------------------------

    $.fn.scramble = function () {
      var length = this.length;
      if (length > 0) {
        var randomIndex;
        var tmp;
        while (--length) {
          randomIndex = Math.floor(Math.random() * (length + 1));
          this.eq(randomIndex).insertBefore(this[length]);

        }
      }
      return this;
    };

    var rollTheDice = function(event) {
      event.preventDefault();
      console.log("error: success!!");
      var stories = $('.backlog .story');

      $('<audio autoplay="true" src="http://mikekenyon.ca/thing_noise.mp3"></audio>').prependTo($('body'));

      for (var i = 0; i < 50; ++i) {
        setTimeout(stories.scramble.bind(stories), i * 100);
      }
    };

    var insertDiceButton = function() {
      console.log('=============> insertDiceButton()');

      var diceButtonHtml =
        '<li class="item dice_roller" title="I’m feeling lucky">' +
        '  <label for="sidebar_panel_project_history_1166228" class="project_history" id="sidebar_panel_label_project_history_1166228_">' +
        '    <span class="panel_name">Auto Prioritizer</span>' +
        '  </label>' +
        '</li>';

      $('.item.dice_roller').remove();
      $(diceButtonHtml).insertAfter($('.item.project_history'));
      $('body').on('click', '.item.dice_roller', rollTheDice);
    };

    insertDiceButton();

    setTimeout(function() { // wait for Tracker to start loading stories
      var checkLoadingInterval = setInterval(function() { // poll for Tracker to have finished loading stories
        if ($('h2:contains(loading project)').size() == 0) {
          clearInterval(checkLoadingInterval);

          setTimeout(function() { // wait for Tracker to have finished messing with the DOM after stories have been loaded
            insertDiceButton();
          }, 100);
        }
      }, 10);
    }, 100);
  }, 10);
});
