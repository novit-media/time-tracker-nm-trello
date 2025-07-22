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
          height: 700
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
          height: 700,
          args: { cardId: opts.context.card }
        });
      }
    }];
  },
  'card-detail-badges': function(t, opts){
    return [{
      text: '⏱️ Time Tracker',
      icon: ICON,
      callback: function(t){
        return t.popup({
          title: 'Time Tracker NM',
          url: 'popup.html',
          height: 700,
          args: { cardId: opts.context.card }
        });
      }
    }];
  },
  'card-back-section': function(t, opts){
    return {
      title: '⏱️ Time Tracker NM',
      icon: ICON,
      content: {
        type: 'iframe',
        url: t.signUrl('popup.html'),
        height: 800
      }
    };
  },
  'card-badges': function(t){
    return t.get('card','shared','timeData',{plannedMinutes:0, spentMinutes:0})
      .then(function(d){
        var badges = [];
        if (d.plannedMinutes){
          var ph = Math.floor(d.plannedMinutes/60);
          var pm = d.plannedMinutes % 60;
          badges.push({ text: '⏱️ ' + (ph? (ph+':'+pm.toString().padStart(2,'0')+'h') : pm+'m'), color: 'blue' });
        }
        if (d.spentMinutes){
          var sh = Math.floor(d.spentMinutes/60);
          var sm = d.spentMinutes % 60;
          badges.push({ text: '✅ ' + (sh? (sh+':'+sm.toString().padStart(2,'0')+'h') : sm+'m'), color: 'green' });
        }
        return badges;
      });
  },
  'show-settings': function(t){
    return t.popup({
      title: 'Time Tracker NM - Ustawienia',
      url: 'settings.html',
      height: 420
    });
  }
});
