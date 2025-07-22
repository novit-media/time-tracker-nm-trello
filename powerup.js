/* global TrelloPowerUp */
var ICON='https://novit-media.github.io/time-tracker-nm-trello/icon.png';
function makeAsciiBar(p){var b=Math.round(p/10);return'█'.repeat(b)+'░'.repeat(10-b)+' '+Math.round(p)+'%';}
function formatHMS(s){var h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sc=s%60;return[h,m,sc].map(n=>n.toString().padStart(2,'0')).join(':');}
TrelloPowerUp.initialize({
 'board-buttons':function(t){return[{text:'⏱️ Time Tracker NM',icon:ICON,callback:function(t){return t.modal({title:'Time Tracker NM',url:'popup.html',accentColor:'#667eea',fullscreen:true});}}];},
 'card-buttons':function(t,opts){return[{text:'⏱️ Time Tracker NM',icon:ICON,callback:function(t){return t.modal({title:'Time Tracker NM',url:'popup.html',accentColor:'#667eea',fullscreen:true,args:{cardId:opts.context.card}});}}];},
 'card-detail-badges':function(t,opts){
   return t.get('card','shared','timeData',{plannedMinutes:0,spentMinutes:0,timerRunning:false,timerStart:0,history:[]})
   .then(function(d){
     var running=d.timerRunning||false;
     return [{
       text:'Time Tracker NM',
       icon:ICON,
       callback:function(t){
         return t.popup({title:'Time Tracker NM',url:'popup-menu.html',height:180,args:{cardId:opts.context.card,running:running}});
       }
     }];
   });
 },
 'card-badges':function(t){
   return t.get('card','shared','timeData',{plannedMinutes:0,spentMinutes:0}).then(function(d){
     var badges=[],planned=d.plannedMinutes||0,spent=d.spentMinutes||0;
     if(planned){var ph=Math.floor(planned/60),pm=planned%60;badges.push({text:'Plan: '+(ph?(ph+':'+pm.toString().padStart(2,'0')+'h'):pm+'m'),color:'blue'});}
     if(spent){var sh=Math.floor(spent/60),sm=spent%60;badges.push({text:'Spent: '+(sh?(sh+':'+sm.toString().padStart(2,'0')+'h'):sm+'m'),color:'green'});}
     if(planned>0){var percent=Math.min(100,(spent/planned)*100);badges.push({text:makeAsciiBar(percent)});}
     return badges;
   });
 },
 'card-back-section':function(t,opts){
   return{title:'⏱️ Time Tracker NM',icon:ICON,content:{type:'iframe',url:t.signUrl('popup.html?mode=mini'),height:260}};
 },
 'show-settings':function(t){
   return t.popup({title:'Time Tracker NM - Ustawienia',url:'settings.html',height:420});
 }
});
