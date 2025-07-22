/* global TrelloPowerUp */
var ICON = 'https://novit-media.github.io/time-tracker-nm-trello/icon.png';

TrelloPowerUp.initialize({
  'board-buttons': function(t){
    return [{
      text: '⏱️ Time Tracker NM',
      icon: ICON,
      callback: function(t){
        return t.popup({
          title: 'Time Tracker NM',
          url: 'popup.html',
          height: 650
        });
      }
    }];
  },
  'card-buttons': function(t, opts){
    return [{
      text: '⏱️ Time Tracker NM',
      icon: ICON,
      callback: function(t){
        return t.popup({
          title: 'Time Tracker NM',
          url: 'popup.html',
          height: 650,
          args: { cardId: opts.context.card }
        });
      }
    }];
  },
  'card-badges': function(t){
    return t.get('card', 'shared', 'timeData', {plannedMinutes:0, spentMinutes:0})
      .then(function(d){
        var badges = [];
        if (d.plannedMinutes && d.plannedMinutes > 0){
          var ph = Math.floor(d.plannedMinutes/60);
          var pm = d.plannedMinutes % 60;
          var ptxt = ph > 0 ? ph + ':' + pm.toString().padStart(2,'0') + 'h' : pm + 'm';
          badges.push({ text: '⏱️ ' + ptxt, color: 'blue' });
        }
        if (d.spentMinutes && d.spentMinutes > 0){
          var sh = Math.floor(d.spentMinutes/60);
          var sm = d.spentMinutes % 60;
          var stxt = sh > 0 ? sh + ':' + sm.toString().padStart(2,'0') + 'h' : sm + 'm';
          badges.push({ text: '✅ ' + stxt, color: 'green' });
        }
        return badges;
      });
  },
  'show-settings': function(t){
    return t.popup({
      title: 'Time Tracker NM - Ustawienia',
      url: 'settings.html',
      height: 400
    });
  }
});
