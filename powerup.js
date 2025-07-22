/* global TrelloPowerUp */
var ICON = 'https://novit-media.github.io/time-tracker-nm-trello/icon.png';

function makeAsciiBar(percent){
  var blocks = Math.round(percent/10);
  var bar = '█'.repeat(blocks) + '░'.repeat(10-blocks);
  return bar + ' ' + Math.round(percent) + '%';
}

TrelloPowerUp.initialize({
  'board-buttons': function(t){
    return [{
      text: '⏱️ Time Tracker NM',
      icon: ICON,
      callback: function(t){
        return t.modal({
          title: 'Time Tracker NM',
          url: 'popup.html',
          accentColor: '#667eea',
          fullscreen: true
        });
      }
    }];
  },
  'card-buttons': function(t, opts){
    return [{
      text: '⏱️ Time Tracker NM',
      icon: ICON,
      callback: function(t){
        return t.modal({
          title: 'Time Tracker NM',
          url: 'popup.html',
          accentColor: '#667eea',
          fullscreen: true,
          args: { cardId: opts.context.card }
        });
      }
    }];
  },
  'card-detail-badges': function(t, opts){
    return t.get('card','shared','timeData',{ plannedMinutes:0, spentMinutes:0, timerRunning:false, timerStart:0 })
      .then(function(d){
        var planned = d.plannedMinutes || 0;
        var spent = d.spentMinutes || 0;
        var running = d.timerRunning || false;
        var badges = [];
        badges.push({
          text: '⏱ ' + (Math.floor(spent/60)+'h '+(spent%60)+'m') + ' / ' + (Math.floor(planned/60)+'h '+(planned%60)+'m'),
          icon: ICON
        });
        if(planned>0){
          var percent = Math.min(100,(spent/planned)*100);
          badges.push({ text: makeAsciiBar(percent), icon: ICON });
        }
        if(!running){
          badges.push({
            text: 'Start',
            icon: ICON,
            callback: function(t){
              return t.get('card','shared','timeData',{ plannedMinutes:0, spentMinutes:0 })
              .then(function(data){
                data.timerRunning = true;
                data.timerStart = Date.now();
                return t.set('card','shared','timeData', data);
              }).then(function(){ t.closePopup(); });
            }
          });
        }else{
          badges.push({
            text: 'Stop',
            icon: ICON,
            callback: function(t){
              return t.get('card','shared','timeData',{ plannedMinutes:0, spentMinutes:0, timerRunning:false, timerStart:0 })
              .then(function(data){
                var now = Date.now();
                var diffMin = Math.ceil((now - (data.timerStart||now))/60000);
                data.spentMinutes = (data.spentMinutes||0) + diffMin;
                data.timerRunning = false;
                data.timerStart = 0;
                return t.set('card','shared','timeData', data).then(function(){
                  if(typeof t.comment === 'function'){
                    return t.comment('Automatycznie dodano '+diffMin+' minut po zatrzymaniu timera.').catch(function(){});
                  }
                });
              }).then(function(){ t.closePopup(); });
            }
          });
        }
        return badges;
      });
  },
  'card-badges': function(t){
    return t.get('card','shared','timeData',{plannedMinutes:0, spentMinutes:0})
      .then(function(d){
        var badges = [];
        var planned = d.plannedMinutes || 0;
        var spent = d.spentMinutes || 0;

        if(planned){
          var ph = Math.floor(planned/60), pm = planned % 60;
          badges.push({ text: 'Plan: ' + (ph? (ph+':'+pm.toString().padStart(2,'0')+'h') : pm+'m'), color: 'blue' });
        }
        if(spent){
          var sh = Math.floor(spent/60), sm = spent % 60;
          badges.push({ text: 'Spent: ' + (sh? (sh+':'+sm.toString().padStart(2,'0')+'h') : sm+'m'), color: 'green' });
        }
        if(planned>0){
          var percent = Math.min(100, (spent/planned)*100);
          badges.push({ text: makeAsciiBar(percent) });
        }
        return badges;
      });
  },
  'card-back-section': function(t, opts){
    return {
      title: '⏱️ Time Tracker NM',
      icon: ICON,
      content: { type: 'iframe', url: t.signUrl('popup.html?mode=mini'), height: 180 }
    };
  },
  'show-settings': function(t){
    return t.popup({
      title: 'Time Tracker NM - Ustawienia',
      url: 'settings.html',
      height: 420
    });
  }
});
