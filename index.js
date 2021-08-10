"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}var intervals=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],standardTuningNotes=[intervals[4],intervals[9],intervals[2],intervals[7],intervals[11],intervals[4]],scalesMap={},degreesMap={major:{id:"major",degrees:[2,2,1,2,2,2,1]},minor:{id:"minor",degrees:[2,1,2,2,1,2,2]}},selectedKey=intervals[0],selectedScaleDegrees=degreesMap.major,selectedScale=null,stringsArray=[];function buildScale(a){var b=[],c=intervals.indexOf(a),d=!0,e=!1,f=void 0;try{for(var g,h,j=selectedScaleDegrees.degrees[Symbol.iterator]();!(d=(g=j.next()).done);d=!0){if(h=g.value,!intervals[c+h]){var k=c===intervals.length-1&&2===h?1:0;c=k,b=[].concat(_toConsumableArray(b),[intervals[k]]);continue}b=[].concat(_toConsumableArray(b),[intervals[c+h]]),c+=h}}catch(a){e=!0,f=a}finally{try{d||null==j["return"]||j["return"]()}finally{if(e)throw f}}return b}function buildScalesMap(){var a=!0,b=!1,c=void 0;try{for(var d,e,f=intervals[Symbol.iterator]();!(a=(d=f.next()).done);a=!0)e=d.value,scalesMap=_objectSpread({},scalesMap,_defineProperty({},e,{id:e,notes:buildScale(e)}))}catch(a){b=!0,c=a}finally{try{a||null==f["return"]||f["return"]()}finally{if(b)throw c}}selectedScale=scalesMap[selectedKey]}buildScalesMap();function getNotesOfString(a){for(var b=[],c=11===intervals.indexOf(a)?0:intervals.indexOf(a)+1;11>=b.length;)intervals[c]||(c=0),b=[].concat(_toConsumableArray(b),[intervals[c]]),c++;return b}function buildFretboard(a){var b=a.portrait;stringsArray=[];var c=!0===b?[].concat(standardTuningNotes):[].concat(standardTuningNotes).reverse();document.getElementById("fretBoard").innerHTML="<div class=\"frets-edge\">".concat(buildFrets(),"</div> \n    ").concat(c.map(function(a,b){return"".concat(buildString(a)," ").concat(5>b?"<div class=\"frets\">".concat(buildFrets(b),"</div>"):"")}).join("")," \n    <div class=\"frets-edge\">").concat(buildFrets(),"</div>\n    </div>");var d=[],e=[1,7,6,5,4,3,2],f=1;stringsArray[0].map(function(a,b){var c=stringsArray[0].indexOf(selectedKey);return 0===b?(f=e[c],void(d=[f])):void(f=e[e.indexOf(f)-1],f===void 0&&(f=e[e.length-1]),d=[].concat(_toConsumableArray(d),[f]))});d.map(function(a,b){var c=_toConsumableArray(stringsArray);c.reverse().map(function(a){var c=a.slice(b,b+3);console.log(c,b)})})}var buildFrets=function(a){for(var b="",c=0;12>c;c++)b+="<div class=\"fret\">".concat(2===a&&(4===c||6===c||8===c)||11===c&&(0===a||4===a)?"<div class=\"fret-dot\"></div>":"","</div>");return b},buildString=function(a){var b=getNotesOfString(a);return stringsArray=[].concat(_toConsumableArray(stringsArray),[b.filter(function(a){return selectedScale.notes.includes(a)})]),"<div class=\"guitar-string\">".concat(b.map(function(a){return"<div class=\"note\">".concat(selectedScale.notes.includes(a)?"<div class=\"note-text-backdrop\"></div><span class=\"note-text\"><p>".concat(a,"</p></span>"):"","</div>")}).join(""),"</div>")};function buildKeySelector(){var a=[];for(var c in scalesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("keySelect");b.innerHTML=a.join(),b.value=selectedKey}function buildScaleSelector(){var a=[];for(var c in degreesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("scaleSelect");b.innerHTML=a.join(),b.value=selectedScaleDegrees.id}function reDrawApp(){return buildScalesMap(),buildKeySelector(),buildScaleSelector(),window.innerHeight>window.innerWidth?(document.getElementById("wrapper").className="app-wrapper portrait-mode",void buildFretboard({portrait:!0})):void(document.getElementById("wrapper").className="app-wrapper landscape-mode",buildFretboard({portrait:!1}))}window.addEventListener("resize",function(){reDrawApp()}),document.getElementById("keySelect").addEventListener("change",function(a){selectedKey=a.target.value,document.getElementById("keySelect").value=a.target.value,reDrawApp()}),document.getElementById("scaleSelect").addEventListener("change",function(a){selectedScaleDegrees=degreesMap[a.target.value],document.getElementById("scaleSelect").value=a.target.value,reDrawApp()}),reDrawApp(),document.getElementById("fullScreen").addEventListener("click",function(){screenfull.isEnabled&&screenfull.toggle()});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBdUQsT0FBdkQsQ0FBZ0UsVUFBSyxDQUM5RCxVQUFVLENBQUMsU0FEbUQsRUFJbkUsVUFBVSxDQUFDLE1BQVgsRUFDRCxDQUxELEMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBpbnRlcnZhbHMgPSBbXG4gICdDJyxcbiAgJ0MjJyxcbiAgJ0QnLFxuICAnRCMnLFxuICAnRScsXG4gICdGJyxcbiAgJ0YjJyxcbiAgJ0cnLFxuICAnRyMnLFxuICAnQScsXG4gICdBIycsXG4gICdCJ1xuXTtcblxuY29uc3Qgc3RhbmRhcmRUdW5pbmdOb3RlcyA9IFtcbiAgaW50ZXJ2YWxzWzRdLFxuICBpbnRlcnZhbHNbOV0sXG4gIGludGVydmFsc1syXSxcbiAgaW50ZXJ2YWxzWzddLFxuICBpbnRlcnZhbHNbMTFdLFxuICBpbnRlcnZhbHNbNF1cbl07XG5cbmxldCBzY2FsZXNNYXAgPSB7fTtcblxuY29uc3QgZGVncmVlc01hcCA9IHtcbiAgbWFqb3I6IHsgaWQ6ICdtYWpvcicsIGRlZ3JlZXM6IFsyLCAyLCAxLCAyLCAyLCAyLCAxXSB9LFxuICBtaW5vcjogeyBpZDogJ21pbm9yJywgZGVncmVlczogWzIsIDEsIDIsIDIsIDEsIDIsIDJdIH1cbn07XG5cbmxldCBzZWxlY3RlZEtleSA9IGludGVydmFsc1swXTtcbmxldCBzZWxlY3RlZFNjYWxlRGVncmVlcyA9IGRlZ3JlZXNNYXAubWFqb3I7XG5sZXQgc2VsZWN0ZWRTY2FsZSA9IG51bGw7XG5cbmxldCBzdHJpbmdzQXJyYXkgPSBbXTtcblxuZnVuY3Rpb24gYnVpbGRTY2FsZShyb290Tm90ZSkge1xuICBsZXQgc2NhbGUgPSBbXTtcblxuICBsZXQgaSA9IGludGVydmFscy5pbmRleE9mKHJvb3ROb3RlKTtcbiAgZm9yIChjb25zdCBkZWdyZWUgb2Ygc2VsZWN0ZWRTY2FsZURlZ3JlZXMuZGVncmVlcykge1xuICAgIGlmICghaW50ZXJ2YWxzW2kgKyBkZWdyZWVdKSB7XG4gICAgICBsZXQgc3RhcnRJbmRleCA9IGkgPT09IGludGVydmFscy5sZW5ndGggLSAxICYmIGRlZ3JlZSA9PT0gMiA/IDEgOiAwO1xuICAgICAgaSA9IHN0YXJ0SW5kZXg7XG4gICAgICBzY2FsZSA9IFsuLi5zY2FsZSwgaW50ZXJ2YWxzW3N0YXJ0SW5kZXhdXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHNjYWxlID0gWy4uLnNjYWxlLCBpbnRlcnZhbHNbaSArIGRlZ3JlZV1dO1xuXG4gICAgaSArPSBkZWdyZWU7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5mdW5jdGlvbiBidWlsZFNjYWxlc01hcCgpIHtcbiAgZm9yIChsZXQgaW50ZXJ2YWwgb2YgaW50ZXJ2YWxzKSB7XG4gICAgc2NhbGVzTWFwID0ge1xuICAgICAgLi4uc2NhbGVzTWFwLFxuICAgICAgW2ludGVydmFsXTogeyBpZDogaW50ZXJ2YWwsIG5vdGVzOiBidWlsZFNjYWxlKGludGVydmFsKSB9XG4gICAgfTtcbiAgfVxuICBzZWxlY3RlZFNjYWxlID0gc2NhbGVzTWFwW3NlbGVjdGVkS2V5XTtcbn1cblxuYnVpbGRTY2FsZXNNYXAoKTtcblxuZnVuY3Rpb24gZ2V0Tm90ZXNPZlN0cmluZyhzdGFydGluZ05vdGUpIHtcbiAgbGV0IG5vdGVzID0gW107XG4gIGxldCBpID1cbiAgICBpbnRlcnZhbHMuaW5kZXhPZihzdGFydGluZ05vdGUpID09PSAxMVxuICAgICAgPyAwXG4gICAgICA6IGludGVydmFscy5pbmRleE9mKHN0YXJ0aW5nTm90ZSkgKyAxO1xuXG4gIHdoaWxlIChub3Rlcy5sZW5ndGggPD0gMTEpIHtcbiAgICBpZiAoIWludGVydmFsc1tpXSkge1xuICAgICAgaSA9IDA7XG4gICAgfVxuICAgIG5vdGVzID0gWy4uLm5vdGVzLCBpbnRlcnZhbHNbaV1dO1xuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiBub3Rlcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdCB9KSB7XG4gIHN0cmluZ3NBcnJheSA9IFtdXG4gIGNvbnN0IHN0YXJ0aW5nTm90ZXMgPVxuICAgIHBvcnRyYWl0ID09PSB0cnVlXG4gICAgICA/IFsuLi5zdGFuZGFyZFR1bmluZ05vdGVzXVxuICAgICAgOiBbLi4uc3RhbmRhcmRUdW5pbmdOb3Rlc10ucmV2ZXJzZSgpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdmcmV0Qm9hcmQnXG4gICkuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJmcmV0cy1lZGdlXCI+JHtidWlsZEZyZXRzKCl9PC9kaXY+IFxuICAgICR7c3RhcnRpbmdOb3Rlc1xuICAgICAgLm1hcChcbiAgICAgICAgKHN0YXJ0aW5nTm90ZSwgc3RyaW5nTnVtYmVyKSA9PlxuICAgICAgICAgIGAke2J1aWxkU3RyaW5nKHN0YXJ0aW5nTm90ZSl9ICR7XG4gICAgICAgICAgICBzdHJpbmdOdW1iZXIgPCA1XG4gICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJmcmV0c1wiPiR7YnVpbGRGcmV0cyhzdHJpbmdOdW1iZXIpfTwvZGl2PmBcbiAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH1gXG4gICAgICApXG4gICAgICAuam9pbignJyl9IFxuICAgIDxkaXYgY2xhc3M9XCJmcmV0cy1lZGdlXCI+JHtidWlsZEZyZXRzKCl9PC9kaXY+XG4gICAgPC9kaXY+YDtcblxuICBsZXQgc2hhcGVzID0gW107XG4gIGNvbnN0IHNoYXBlTnVtYmVycyA9IFsxLCA3LCA2LCA1LCA0LCAzLCAyXTtcbiAgbGV0IGN1cnJlbnRTaGFwZSA9IDE7XG5cbiAgc3RyaW5nc0FycmF5WzBdLm1hcCgobm90ZSwgbm90ZUluZGV4KSA9PiB7XG4gICAgY29uc3Qgcm9vdE5vdGVJbmRleCA9IHN0cmluZ3NBcnJheVswXS5pbmRleE9mKHNlbGVjdGVkS2V5KTtcblxuICAgIGlmIChub3RlSW5kZXggPT09IDApIHtcbiAgICAgIGN1cnJlbnRTaGFwZSA9IHNoYXBlTnVtYmVyc1tyb290Tm90ZUluZGV4XTtcbiAgICAgIHNoYXBlcyA9IFtjdXJyZW50U2hhcGVdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRTaGFwZSA9IHNoYXBlTnVtYmVyc1tzaGFwZU51bWJlcnMuaW5kZXhPZihjdXJyZW50U2hhcGUpIC0gMV07XG5cbiAgICBpZiAoY3VycmVudFNoYXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnRTaGFwZSA9IHNoYXBlTnVtYmVyc1tzaGFwZU51bWJlcnMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgc2hhcGVzID0gWy4uLnNoYXBlcywgY3VycmVudFNoYXBlXTtcbiAgfSk7XG5cblxuICBsZXQgc2hhcGVOb3RlcyA9IFtdXG5cbiAgc2hhcGVzLm1hcCgoc2hhcGUsIHNoYXBlSW5kZXgpPT57XG4gICAgbGV0IHN0cmluZ3MgPSBbLi4uc3RyaW5nc0FycmF5XVxuICAgIHN0cmluZ3MucmV2ZXJzZSgpLm1hcCgoc3RyaW5nKT0+e1xuICAgICBjb25zdCBub3Rlc0FycmF5ID0gc3RyaW5nLnNsaWNlKHNoYXBlSW5kZXgsIHNoYXBlSW5kZXggKyAzKVxuICAgICBjb25zb2xlLmxvZyhub3Rlc0FycmF5LCBzaGFwZUluZGV4KVxuICAgICBcbiAgICB9KVxuICB9KVxufVxuXG5jb25zdCBidWlsZEZyZXRzID0gc3RyaW5nTnVtYmVyID0+IHtcbiAgbGV0IGZyZXRzID0gYGA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKykge1xuICAgIGZyZXRzICs9IGA8ZGl2IGNsYXNzPVwiZnJldFwiPiR7XG4gICAgICAoc3RyaW5nTnVtYmVyID09PSAyICYmIChpID09PSA0IHx8IGkgPT09IDYgfHwgaSA9PT0gOCkpIHx8XG4gICAgICAoaSA9PT0gMTEgJiYgKHN0cmluZ051bWJlciA9PT0gMCB8fCBzdHJpbmdOdW1iZXIgPT09IDQpKVxuICAgICAgICA/IGA8ZGl2IGNsYXNzPVwiZnJldC1kb3RcIj48L2Rpdj5gXG4gICAgICAgIDogJydcbiAgICB9PC9kaXY+YDtcbiAgfVxuICByZXR1cm4gZnJldHM7XG59O1xuXG5jb25zdCBidWlsZFN0cmluZyA9IHN0YXJ0aW5nTm90ZSA9PiB7XG4gIGNvbnN0IHN0cmluZ05vdGVzID0gZ2V0Tm90ZXNPZlN0cmluZyhzdGFydGluZ05vdGUpO1xuICBzdHJpbmdzQXJyYXkgPSBbXG4gICAgLi4uc3RyaW5nc0FycmF5LFxuICAgIHN0cmluZ05vdGVzLmZpbHRlcihub3RlID0+IHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZSkpXG4gIF07XG5cbiAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ3VpdGFyLXN0cmluZ1wiPiR7c3RyaW5nTm90ZXNcbiAgICAubWFwKFxuICAgICAgbm90ZSA9PlxuICAgICAgICBgPGRpdiBjbGFzcz1cIm5vdGVcIj4ke1xuICAgICAgICAgIHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZSlcbiAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJub3RlLXRleHQtYmFja2Ryb3BcIj48L2Rpdj48c3BhbiBjbGFzcz1cIm5vdGUtdGV4dFwiPjxwPiR7bm90ZX08L3A+PC9zcGFuPmBcbiAgICAgICAgICAgIDogJydcbiAgICAgICAgfTwvZGl2PmBcbiAgICApXG4gICAgLmpvaW4oJycpfTwvZGl2PmA7XG59O1xuXG5mdW5jdGlvbiBidWlsZEtleVNlbGVjdG9yKCkge1xuICBsZXQgb3B0aW9ucyA9IFtdO1xuICBmb3IgKGNvbnN0IGtleU5hbWUgaW4gc2NhbGVzTWFwKSB7XG4gICAgb3B0aW9ucyA9IFsuLi5vcHRpb25zLCBgPG9wdGlvbiB2YWx1ZT1cIiR7a2V5TmFtZX1cIj4ke2tleU5hbWV9PC9vcHRpb24+YF07XG4gIH1cbiAgbGV0IGtleVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlTZWxlY3QnKTtcbiAga2V5U2VsZWN0LmlubmVySFRNTCA9IG9wdGlvbnMuam9pbigpO1xuICBrZXlTZWxlY3QudmFsdWUgPSBzZWxlY3RlZEtleTtcbn1cblxuZnVuY3Rpb24gYnVpbGRTY2FsZVNlbGVjdG9yKCkge1xuICBsZXQgb3B0aW9ucyA9IFtdO1xuICBmb3IgKGNvbnN0IHNjYWxlTmFtZSBpbiBkZWdyZWVzTWFwKSB7XG4gICAgb3B0aW9ucyA9IFtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICBgPG9wdGlvbiB2YWx1ZT1cIiR7c2NhbGVOYW1lfVwiPiR7c2NhbGVOYW1lfTwvb3B0aW9uPmBcbiAgICBdO1xuICB9XG4gIGxldCBzY2FsZVNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZVNlbGVjdCcpO1xuICBzY2FsZVNlbGVjdC5pbm5lckhUTUwgPSBvcHRpb25zLmpvaW4oKTtcbiAgc2NhbGVTZWxlY3QudmFsdWUgPSBzZWxlY3RlZFNjYWxlRGVncmVlcy5pZDtcbn1cblxuZnVuY3Rpb24gcmVEcmF3QXBwKCkge1xuICBidWlsZFNjYWxlc01hcCgpO1xuICBidWlsZEtleVNlbGVjdG9yKCk7XG4gIGJ1aWxkU2NhbGVTZWxlY3RvcigpO1xuXG4gIGlmICh3aW5kb3cuaW5uZXJIZWlnaHQgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuY2xhc3NOYW1lID0gJ2FwcC13cmFwcGVyIHBvcnRyYWl0LW1vZGUnO1xuICAgIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IHRydWUgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd3cmFwcGVyJykuY2xhc3NOYW1lID0gJ2FwcC13cmFwcGVyIGxhbmRzY2FwZS1tb2RlJztcbiAgYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdDogZmFsc2UgfSk7XG59XG5cbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB7XG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlTZWxlY3QnKS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcbiAgc2VsZWN0ZWRLZXkgPSBlLnRhcmdldC52YWx1ZTtcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tleVNlbGVjdCcpLnZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cbiAgcmVEcmF3QXBwKCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjYWxlU2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gIHNlbGVjdGVkU2NhbGVEZWdyZWVzID0gZGVncmVlc01hcFtlLnRhcmdldC52YWx1ZV07XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZVNlbGVjdCcpLnZhbHVlID0gZS50YXJnZXQudmFsdWU7XG5cbiAgcmVEcmF3QXBwKCk7XG59KTtcblxucmVEcmF3QXBwKCk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmdWxsU2NyZWVuJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgaWYgKCFzY3JlZW5mdWxsLmlzRW5hYmxlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzY3JlZW5mdWxsLnRvZ2dsZSgpO1xufSk7XG4iXX0=