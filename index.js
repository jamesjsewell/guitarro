"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}var intervals=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],standardTuningNotes=[intervals[4],intervals[9],intervals[2],intervals[7],intervals[11],intervals[4]],scalesMap={},degreesMap={major:{id:"major",degrees:[2,2,1,2,2,2,1]},minor:{id:"minor",degrees:[2,1,2,2,1,2,2]}},selectedKey=intervals[0],selectedScaleDegrees=degreesMap.major,selectedScale=null,stringsArray=[],shapeNotes=[],selectedShape=0,isPortrait=!1;function buildScale(a){var b=[],c=intervals.indexOf(a),d=!0,e=!1,f=void 0;try{for(var g,h,j=selectedScaleDegrees.degrees[Symbol.iterator]();!(d=(g=j.next()).done);d=!0){if(h=g.value,!intervals[c+h]){var k=c===intervals.length-1&&2===h?1:0;c=k,b=[].concat(_toConsumableArray(b),[intervals[k]]);continue}b=[].concat(_toConsumableArray(b),[intervals[c+h]]),c+=h}}catch(a){e=!0,f=a}finally{try{d||null==j["return"]||j["return"]()}finally{if(e)throw f}}return b}function buildScalesMap(){var a=!0,b=!1,c=void 0;try{for(var d,e,f=intervals[Symbol.iterator]();!(a=(d=f.next()).done);a=!0)e=d.value,scalesMap=_objectSpread({},scalesMap,_defineProperty({},e,{id:e,notes:buildScale(e)}))}catch(a){b=!0,c=a}finally{try{a||null==f["return"]||f["return"]()}finally{if(b)throw c}}selectedScale=scalesMap[selectedKey]}buildScalesMap();function getNotesOfString(a){for(var b=[],c=11===intervals.indexOf(a)?0:intervals.indexOf(a)+1;11>=b.length;)intervals[c]||(c=0),b=[].concat(_toConsumableArray(b),[intervals[c]]),c++;return b}function buildFretboard(a){var b=a.portrait;stringsArray=[];var c=!0===b?[].concat(standardTuningNotes):[].concat(standardTuningNotes).reverse();document.getElementById("fretBoard").innerHTML="<div class=\"frets-edge\">".concat(buildFrets(),"</div> \n    ").concat(c.map(function(a,b){return"".concat(buildString(a,b)," ").concat(5>b?"<div class=\"frets\">".concat(buildFrets(b),"</div>"):"")}).join("")," \n    <div class=\"frets-edge\">").concat(buildFrets(),"</div>\n    </div>");var d=[],e=[1,7,6,5,4,3,2],f=1;shapeNotes=[],stringsArray[0].map(function(a,b){var c=stringsArray[0].indexOf(stringsArray[0].find(function(a){return a.note===selectedKey}));return 0===b?(f=e[c],void(d=[f])):void(f=e[e.indexOf(f)-1],f===void 0&&(f=e[e.length-1]),d=[].concat(_toConsumableArray(d),[f]))}),d.map(function(a,c){var d=b?_toConsumableArray(stringsArray):_toConsumableArray(stringsArray).reverse();d.map(function(a,b){var d=[];return d=4===b||5===b?a.slice(c+1,c+1+3):a.slice(c,c+3),shapeNotes[c]?void(shapeNotes[c]=[].concat(_toConsumableArray(shapeNotes[c]),_toConsumableArray(d))):void(shapeNotes[c]=d)})}),shapeNotes[selectedShape].map(function(a){document.getElementById(a.id).className="highlight"})}var buildFrets=function(a){for(var b="",c=0;12>c;c++)b+="<div class=\"fret\">".concat(2===a&&(4===c||6===c||8===c)||11===c&&(0===a||4===a)?"<div class=\"fret-dot\"></div>":"","</div>");return b},buildString=function(a,b){var c=getNotesOfString(a).map(function(a,c){return{id:b+a,note:a,stringNumber:b,fret:c}});return stringsArray=[].concat(_toConsumableArray(stringsArray),[c.filter(function(a){return selectedScale.notes.includes(a.note)})]),"<div class=\"guitar-string\">".concat(c.map(function(a){return"<div class=\"note\">".concat(selectedScale.notes.includes(a.note)?"<div class=\"note-text-backdrop\"></div><span class=\"note-text\"><p  id=".concat(a.id,">").concat(a.note,"</p></span>"):"","</div>")}).join(""),"</div>")};function buildKeySelector(){var a=[];for(var c in scalesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("keySelect");b.innerHTML=a.join(),b.value=selectedKey}function buildScaleSelector(){var a=[];for(var c in degreesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("scaleSelect");b.innerHTML=a.join(),b.value=selectedScaleDegrees.id}function reDrawApp(){return buildScalesMap(),buildKeySelector(),buildScaleSelector(),window.innerHeight>window.innerWidth?(document.getElementById("wrapper").className="app-wrapper portrait-mode",isPortrait=!0,void buildFretboard({portrait:!0})):void(isPortrait=!1,document.getElementById("wrapper").className="app-wrapper landscape-mode",buildFretboard({portrait:!1}))}window.addEventListener("resize",function(){reDrawApp()}),document.getElementById("keySelect").addEventListener("change",function(a){selectedKey=a.target.value,document.getElementById("keySelect").value=a.target.value,reDrawApp()}),document.getElementById("scaleSelect").addEventListener("change",function(a){selectedScaleDegrees=degreesMap[a.target.value],document.getElementById("scaleSelect").value=a.target.value,reDrawApp()}),reDrawApp(),document.getElementById("fullScreen").addEventListener("click",function(){screenfull.isEnabled&&screenfull.toggle()}),document.querySelectorAll(".shapeSelect").forEach(function(a){return a.addEventListener("click",function(a){selectedShape=a.target.getAttribute("shapeIndex"),buildFretboard(isPortrait)})});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bUQsRUFJbkUsVUFBVSxDQUFDLE1BQVgsRUFDRCxDQUxELEMsQ0FPQSxRQUFRLENBQUMsZ0JBQVQsQ0FBMEIsY0FBMUIsRUFBMEMsT0FBMUMsQ0FBa0QsU0FBQSxDQUFFLFFBQUUsQ0FBQSxDQUFFLENBQUMsZ0JBQUgsQ0FBb0IsT0FBcEIsQ0FBNkIsU0FBQSxDQUFDLENBQUUsQ0FDcEYsYUFBYSxDQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsWUFBVCxDQUFzQixZQUF0QixDQURvRSxDQUVwRixjQUFjLENBQUMsVUFBRCxDQUNmLENBSHFELENBQUYsQ0FBcEQsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGludGVydmFscyA9IFtcbiAgJ0MnLFxuICAnQyMnLFxuICAnRCcsXG4gICdEIycsXG4gICdFJyxcbiAgJ0YnLFxuICAnRiMnLFxuICAnRycsXG4gICdHIycsXG4gICdBJyxcbiAgJ0EjJyxcbiAgJ0InXG5dO1xuXG5jb25zdCBzdGFuZGFyZFR1bmluZ05vdGVzID0gW1xuICBpbnRlcnZhbHNbNF0sXG4gIGludGVydmFsc1s5XSxcbiAgaW50ZXJ2YWxzWzJdLFxuICBpbnRlcnZhbHNbN10sXG4gIGludGVydmFsc1sxMV0sXG4gIGludGVydmFsc1s0XVxuXTtcblxubGV0IHNjYWxlc01hcCA9IHt9O1xuXG5jb25zdCBkZWdyZWVzTWFwID0ge1xuICBtYWpvcjogeyBpZDogJ21ham9yJywgZGVncmVlczogWzIsIDIsIDEsIDIsIDIsIDIsIDFdIH0sXG4gIG1pbm9yOiB7IGlkOiAnbWlub3InLCBkZWdyZWVzOiBbMiwgMSwgMiwgMiwgMSwgMiwgMl0gfVxufTtcblxubGV0IHNlbGVjdGVkS2V5ID0gaW50ZXJ2YWxzWzBdO1xubGV0IHNlbGVjdGVkU2NhbGVEZWdyZWVzID0gZGVncmVlc01hcC5tYWpvcjtcbmxldCBzZWxlY3RlZFNjYWxlID0gbnVsbDtcblxubGV0IHN0cmluZ3NBcnJheSA9IFtdO1xubGV0IHNoYXBlTm90ZXMgPSBbXVxubGV0IHNlbGVjdGVkU2hhcGUgPSAwXG5cbmxldCBpc1BvcnRyYWl0ID0gZmFsc2VcblxuZnVuY3Rpb24gYnVpbGRTY2FsZShyb290Tm90ZSkge1xuICBsZXQgc2NhbGUgPSBbXTtcblxuICBsZXQgaSA9IGludGVydmFscy5pbmRleE9mKHJvb3ROb3RlKTtcbiAgZm9yIChjb25zdCBkZWdyZWUgb2Ygc2VsZWN0ZWRTY2FsZURlZ3JlZXMuZGVncmVlcykge1xuICAgIGlmICghaW50ZXJ2YWxzW2kgKyBkZWdyZWVdKSB7XG4gICAgICBsZXQgc3RhcnRJbmRleCA9IGkgPT09IGludGVydmFscy5sZW5ndGggLSAxICYmIGRlZ3JlZSA9PT0gMiA/IDEgOiAwO1xuICAgICAgaSA9IHN0YXJ0SW5kZXg7XG4gICAgICBzY2FsZSA9IFsuLi5zY2FsZSwgaW50ZXJ2YWxzW3N0YXJ0SW5kZXhdXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHNjYWxlID0gWy4uLnNjYWxlLCBpbnRlcnZhbHNbaSArIGRlZ3JlZV1dO1xuXG4gICAgaSArPSBkZWdyZWU7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5mdW5jdGlvbiBidWlsZFNjYWxlc01hcCgpIHtcbiAgZm9yIChsZXQgaW50ZXJ2YWwgb2YgaW50ZXJ2YWxzKSB7XG4gICAgc2NhbGVzTWFwID0ge1xuICAgICAgLi4uc2NhbGVzTWFwLFxuICAgICAgW2ludGVydmFsXTogeyBpZDogaW50ZXJ2YWwsIG5vdGVzOiBidWlsZFNjYWxlKGludGVydmFsKSB9XG4gICAgfTtcbiAgfVxuICBzZWxlY3RlZFNjYWxlID0gc2NhbGVzTWFwW3NlbGVjdGVkS2V5XTtcbn1cblxuYnVpbGRTY2FsZXNNYXAoKTtcblxuZnVuY3Rpb24gZ2V0Tm90ZXNPZlN0cmluZyhzdGFydGluZ05vdGUpIHtcbiAgbGV0IG5vdGVzID0gW107XG4gIGxldCBpID1cbiAgICBpbnRlcnZhbHMuaW5kZXhPZihzdGFydGluZ05vdGUpID09PSAxMVxuICAgICAgPyAwXG4gICAgICA6IGludGVydmFscy5pbmRleE9mKHN0YXJ0aW5nTm90ZSkgKyAxO1xuXG4gIHdoaWxlIChub3Rlcy5sZW5ndGggPD0gMTEpIHtcbiAgICBpZiAoIWludGVydmFsc1tpXSkge1xuICAgICAgaSA9IDA7XG4gICAgfVxuICAgIG5vdGVzID0gWy4uLm5vdGVzLCBpbnRlcnZhbHNbaV1dO1xuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiBub3Rlcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdCB9KSB7XG4gIHN0cmluZ3NBcnJheSA9IFtdO1xuICBjb25zdCBzdGFydGluZ05vdGVzID1cbiAgICBwb3J0cmFpdCA9PT0gdHJ1ZVxuICAgICAgPyBbLi4uc3RhbmRhcmRUdW5pbmdOb3Rlc11cbiAgICAgIDogWy4uLnN0YW5kYXJkVHVuaW5nTm90ZXNdLnJldmVyc2UoKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZnJldEJvYXJkJ1xuICApLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZnJldHMtZWRnZVwiPiR7YnVpbGRGcmV0cygpfTwvZGl2PiBcbiAgICAke3N0YXJ0aW5nTm90ZXNcbiAgICAgIC5tYXAoXG4gICAgICAgIChzdGFydGluZ05vdGUsIHN0cmluZ051bWJlcikgPT5cbiAgICAgICAgICBgJHtidWlsZFN0cmluZyhzdGFydGluZ05vdGUsIHN0cmluZ051bWJlcil9ICR7XG4gICAgICAgICAgICBzdHJpbmdOdW1iZXIgPCA1XG4gICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJmcmV0c1wiPiR7YnVpbGRGcmV0cyhzdHJpbmdOdW1iZXIpfTwvZGl2PmBcbiAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH1gXG4gICAgICApXG4gICAgICAuam9pbignJyl9IFxuICAgIDxkaXYgY2xhc3M9XCJmcmV0cy1lZGdlXCI+JHtidWlsZEZyZXRzKCl9PC9kaXY+XG4gICAgPC9kaXY+YDtcblxuICBsZXQgc2hhcGVzID0gW107XG4gIGNvbnN0IHNoYXBlTnVtYmVycyA9IFsxLCA3LCA2LCA1LCA0LCAzLCAyXTtcbiAgbGV0IGN1cnJlbnRTaGFwZSA9IDE7XG5cbiAgc2hhcGVOb3RlcyA9IFtdXG5cbiAgc3RyaW5nc0FycmF5WzBdLm1hcCgobm90ZSwgbm90ZUluZGV4KSA9PiB7XG4gICAgY29uc3Qgcm9vdE5vdGVJbmRleCA9IHN0cmluZ3NBcnJheVswXS5pbmRleE9mKFxuICAgICAgc3RyaW5nc0FycmF5WzBdLmZpbmQobm90ZSA9PiBub3RlLm5vdGUgPT09IHNlbGVjdGVkS2V5KVxuICAgICk7XG5cbiAgICBpZiAobm90ZUluZGV4ID09PSAwKSB7XG4gICAgICBjdXJyZW50U2hhcGUgPSBzaGFwZU51bWJlcnNbcm9vdE5vdGVJbmRleF07XG4gICAgICBzaGFwZXMgPSBbY3VycmVudFNoYXBlXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjdXJyZW50U2hhcGUgPSBzaGFwZU51bWJlcnNbc2hhcGVOdW1iZXJzLmluZGV4T2YoY3VycmVudFNoYXBlKSAtIDFdO1xuXG4gICAgaWYgKGN1cnJlbnRTaGFwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjdXJyZW50U2hhcGUgPSBzaGFwZU51bWJlcnNbc2hhcGVOdW1iZXJzLmxlbmd0aCAtIDFdO1xuICAgIH1cblxuICAgIHNoYXBlcyA9IFsuLi5zaGFwZXMsIGN1cnJlbnRTaGFwZV07XG4gIH0pO1xuXG4gIHNoYXBlcy5tYXAoKHNoYXBlLCBzaGFwZUluZGV4KSA9PiB7XG4gICAgbGV0IHN0cmluZ3MgPSBwb3J0cmFpdD8gWy4uLnN0cmluZ3NBcnJheV0gOiBbLi4uc3RyaW5nc0FycmF5XS5yZXZlcnNlKClcbiAgICBzdHJpbmdzLm1hcCgoc3RyaW5nLCBzdHJpbmdOdW1iZXIpID0+IHtcbiAgICAgIGxldCBub3RlcyA9IFtdO1xuICAgICAgaWYgKHN0cmluZ051bWJlciA9PT0gNCB8fCBzdHJpbmdOdW1iZXIgPT09IDUpIHtcbiAgICAgICAgbm90ZXMgPSBzdHJpbmcuc2xpY2Uoc2hhcGVJbmRleCArIDEsIHNoYXBlSW5kZXggKyAxICsgMyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3RlcyA9IHN0cmluZy5zbGljZShzaGFwZUluZGV4LCBzaGFwZUluZGV4ICsgMyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc2hhcGVOb3Rlc1tzaGFwZUluZGV4XSkge1xuICAgICAgICBzaGFwZU5vdGVzW3NoYXBlSW5kZXhdID0gbm90ZXM7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNoYXBlTm90ZXNbc2hhcGVJbmRleF0gPSBbXG4gICAgICAgIC4uLnNoYXBlTm90ZXNbc2hhcGVJbmRleF0sXG4gICAgICAgIC4uLm5vdGVzXG4gICAgICBdO1xuICAgIH0pO1xuICB9KTtcblxuICBzaGFwZU5vdGVzW3NlbGVjdGVkU2hhcGVdLm1hcChub3RlID0+IHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChub3RlLmlkKS5jbGFzc05hbWUgPSAnaGlnaGxpZ2h0JztcbiAgfSk7XG59XG5cbmNvbnN0IGJ1aWxkRnJldHMgPSBzdHJpbmdOdW1iZXIgPT4ge1xuICBsZXQgZnJldHMgPSBgYDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKSB7XG4gICAgZnJldHMgKz0gYDxkaXYgY2xhc3M9XCJmcmV0XCI+JHtcbiAgICAgIChzdHJpbmdOdW1iZXIgPT09IDIgJiYgKGkgPT09IDQgfHwgaSA9PT0gNiB8fCBpID09PSA4KSkgfHxcbiAgICAgIChpID09PSAxMSAmJiAoc3RyaW5nTnVtYmVyID09PSAwIHx8IHN0cmluZ051bWJlciA9PT0gNCkpXG4gICAgICAgID8gYDxkaXYgY2xhc3M9XCJmcmV0LWRvdFwiPjwvZGl2PmBcbiAgICAgICAgOiAnJ1xuICAgIH08L2Rpdj5gO1xuICB9XG4gIHJldHVybiBmcmV0cztcbn07XG5cbmNvbnN0IGJ1aWxkU3RyaW5nID0gKHN0YXJ0aW5nTm90ZSwgc3RyaW5nTnVtYmVyKSA9PiB7XG4gIGNvbnN0IHN0cmluZ05vdGVzID0gZ2V0Tm90ZXNPZlN0cmluZyhzdGFydGluZ05vdGUpLm1hcCgobm90ZSwgZnJldCkgPT4gKHtcbiAgICBpZDogc3RyaW5nTnVtYmVyICsgbm90ZSxcbiAgICBub3RlLFxuICAgIHN0cmluZ051bWJlcixcbiAgICBmcmV0XG4gIH0pKTtcbiAgc3RyaW5nc0FycmF5ID0gW1xuICAgIC4uLnN0cmluZ3NBcnJheSxcbiAgICBzdHJpbmdOb3Rlcy5maWx0ZXIobm90ZSA9PiBzZWxlY3RlZFNjYWxlLm5vdGVzLmluY2x1ZGVzKG5vdGUubm90ZSkpXG4gIF07XG5cbiAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiZ3VpdGFyLXN0cmluZ1wiPiR7c3RyaW5nTm90ZXNcbiAgICAubWFwKFxuICAgICAgbm90ZSA9PlxuICAgICAgICBgPGRpdiBjbGFzcz1cIm5vdGVcIj4ke1xuICAgICAgICAgIHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZS5ub3RlKVxuICAgICAgICAgICAgPyBgPGRpdiBjbGFzcz1cIm5vdGUtdGV4dC1iYWNrZHJvcFwiPjwvZGl2PjxzcGFuIGNsYXNzPVwibm90ZS10ZXh0XCI+PHAgIGlkPSR7bm90ZS5pZH0+JHtub3RlLm5vdGV9PC9wPjwvc3Bhbj5gXG4gICAgICAgICAgICA6ICcnXG4gICAgICAgIH08L2Rpdj5gXG4gICAgKVxuICAgIC5qb2luKCcnKX08L2Rpdj5gO1xufTtcblxuZnVuY3Rpb24gYnVpbGRLZXlTZWxlY3RvcigpIHtcbiAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgZm9yIChjb25zdCBrZXlOYW1lIGluIHNjYWxlc01hcCkge1xuICAgIG9wdGlvbnMgPSBbLi4ub3B0aW9ucywgYDxvcHRpb24gdmFsdWU9XCIke2tleU5hbWV9XCI+JHtrZXlOYW1lfTwvb3B0aW9uPmBdO1xuICB9XG4gIGxldCBrZXlTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5U2VsZWN0Jyk7XG4gIGtleVNlbGVjdC5pbm5lckhUTUwgPSBvcHRpb25zLmpvaW4oKTtcbiAga2V5U2VsZWN0LnZhbHVlID0gc2VsZWN0ZWRLZXk7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU2NhbGVTZWxlY3RvcigpIHtcbiAgbGV0IG9wdGlvbnMgPSBbXTtcbiAgZm9yIChjb25zdCBzY2FsZU5hbWUgaW4gZGVncmVlc01hcCkge1xuICAgIG9wdGlvbnMgPSBbXG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgYDxvcHRpb24gdmFsdWU9XCIke3NjYWxlTmFtZX1cIj4ke3NjYWxlTmFtZX08L29wdGlvbj5gXG4gICAgXTtcbiAgfVxuICBsZXQgc2NhbGVTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhbGVTZWxlY3QnKTtcbiAgc2NhbGVTZWxlY3QuaW5uZXJIVE1MID0gb3B0aW9ucy5qb2luKCk7XG4gIHNjYWxlU2VsZWN0LnZhbHVlID0gc2VsZWN0ZWRTY2FsZURlZ3JlZXMuaWQ7XG59XG5cbmZ1bmN0aW9uIHJlRHJhd0FwcCgpIHtcbiAgYnVpbGRTY2FsZXNNYXAoKTtcbiAgYnVpbGRLZXlTZWxlY3RvcigpO1xuICBidWlsZFNjYWxlU2VsZWN0b3IoKTtcblxuICBpZiAod2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmNsYXNzTmFtZSA9ICdhcHAtd3JhcHBlciBwb3J0cmFpdC1tb2RlJztcbiAgICBpc1BvcnRyYWl0ID0gdHJ1ZVxuICAgIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IHRydWUgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzUG9ydHJhaXQgPSBmYWxzZVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmNsYXNzTmFtZSA9ICdhcHAtd3JhcHBlciBsYW5kc2NhcGUtbW9kZSc7XG4gIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IGZhbHNlIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICByZURyYXdBcHAoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5U2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gIHNlbGVjdGVkS2V5ID0gZS50YXJnZXQudmFsdWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZVNlbGVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICBzZWxlY3RlZFNjYWxlRGVncmVlcyA9IGRlZ3JlZXNNYXBbZS50YXJnZXQudmFsdWVdO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhbGVTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbnJlRHJhd0FwcCgpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbFNjcmVlbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGlmICghc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2NyZWVuZnVsbC50b2dnbGUoKTtcbn0pO1xuXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGVTZWxlY3QnKS5mb3JFYWNoKGVsPT5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGU9PntcbiAgc2VsZWN0ZWRTaGFwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnc2hhcGVJbmRleCcpIFxuICBidWlsZEZyZXRib2FyZChpc1BvcnRyYWl0KVxufSkpXG4iXX0=