"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}var intervals=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],standardTuningNotes=[intervals[4],intervals[9],intervals[2],intervals[7],intervals[11],intervals[4]],scalesMap={},degreesMap={major:{id:"major",degrees:[2,2,1,2,2,2,1]},minor:{id:"minor",degrees:[2,1,2,2,1,2,2]}},selectedKey=intervals[0],selectedScaleDegrees=degreesMap.major,selectedScale=null,stringsArray=[],shapeNotes=[],selectedShape=0,isPortrait=!1;function buildScale(a){var b=[],c=intervals.indexOf(a),d=!0,e=!1,f=void 0;try{for(var g,h,j=selectedScaleDegrees.degrees[Symbol.iterator]();!(d=(g=j.next()).done);d=!0){if(h=g.value,!intervals[c+h]){var k=c===intervals.length-1&&2===h?1:0;c=k,b=[].concat(_toConsumableArray(b),[intervals[k]]);continue}b=[].concat(_toConsumableArray(b),[intervals[c+h]]),c+=h}}catch(a){e=!0,f=a}finally{try{d||null==j["return"]||j["return"]()}finally{if(e)throw f}}return b}function buildScalesMap(){var a=!0,b=!1,c=void 0;try{for(var d,e,f=intervals[Symbol.iterator]();!(a=(d=f.next()).done);a=!0)e=d.value,scalesMap=_objectSpread({},scalesMap,_defineProperty({},e,{id:e,notes:buildScale(e)}))}catch(a){b=!0,c=a}finally{try{a||null==f["return"]||f["return"]()}finally{if(b)throw c}}selectedScale=scalesMap[selectedKey]}buildScalesMap();function getNotesOfString(a){for(var b=[],c=11===intervals.indexOf(a)?0:intervals.indexOf(a)+1;11>=b.length;)intervals[c]||(c=0),b=[].concat(_toConsumableArray(b),[intervals[c]]),c++;return b}function buildFretboard(a){var b=a.portrait;stringsArray=[];var c=!0===b?[].concat(standardTuningNotes):[].concat(standardTuningNotes).reverse();document.getElementById("fretBoard").innerHTML="<div class=\"frets-edge\">".concat(buildFrets(),"</div> \n    ").concat(c.map(function(a,b){return"".concat(buildString(a,b)," ").concat(5>b?"<div class=\"frets\">".concat(buildFrets(b),"</div>"):"")}).join("")," \n    <div class=\"frets-edge\">").concat(buildFrets(),"</div>\n    </div>");var d=[],e=[1,7,6,5,4,3,2],f=1;shapeNotes=[],stringsArray[0].forEach(function(a,b){var c=stringsArray[0].indexOf(stringsArray[0].find(function(a){return a.note===selectedKey})),g=null;return 0===b?(f=e[c],g={fret:a.fret,shapeNumber:e[c]},void(d=[g])):void(f=e[e.indexOf(f)-1],g={fret:a.fret,shapeNumber:f},f===void 0&&(f=e[e.length-1],g={fret:a.fret,shapeNumber:f}),d=[].concat(_toConsumableArray(d),[g]))}),d.forEach(function(a,c){var d=b?_toConsumableArray(stringsArray):_toConsumableArray(stringsArray).reverse();d.map(function(b,d){var e=[],f=!0,g=b.indexOf(b.find(function(b){return b.fret===a.fret}));if(-1===g&&(f=!1,g=b.indexOf(b.find(function(b){return b.fret===a.fret+1}))),4===d||5===d){var h=f?g+1:g;e=b.slice(h,h+3)}else e=b.slice(g,g+3);return shapeNotes[c]?void(shapeNotes[c]=[].concat(_toConsumableArray(shapeNotes[c]),_toConsumableArray(e))):void(shapeNotes[c]=e)})}),buildShapeSelect(d),shapeNotes[selectedShape].map(function(a){document.getElementById(a.id).className="highlight"})}var buildFrets=function(a){for(var b="",c=0;12>c;c++)b+="<div class=\"fret\">".concat(2===a&&(4===c||6===c||8===c)||11===c&&(0===a||4===a)?"<div class=\"fret-dot\"></div>":"","</div>");return b},buildString=function(a,b){var c=getNotesOfString(a).map(function(a,c){return{id:b+a,note:a,stringNumber:b,fret:c}});stringsArray=[].concat(_toConsumableArray(stringsArray),[c.filter(function(a){return selectedScale.notes.includes(a.note)})]);var d=isPortrait?0:5;return"<div class=\"guitar-string\">".concat(c.map(function(a){return b===d?"<div class=\"root-note\">".concat(selectedScale.notes.includes(a.note)?"<button rootNoteFret=\"".concat(a.fret,"\" class=\"root-note-text-backdrop shape-select\"></button><span class=\"root-note-text\"><p id=").concat(a.id,">").concat(a.note,"</p></span>"):"","</div>"):"<div class=\"note\">".concat(selectedScale.notes.includes(a.note)?"<div class=\"note-text-backdrop\"></div><span class=\"note-text\"><p id=".concat(a.id,">").concat(a.note,"</p></span>"):"","</div>")}).join(""),"</div>")};function buildKeySelector(){var a=[];for(var c in scalesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("keySelect");b.innerHTML=a.join(),b.value=selectedKey}function buildScaleSelector(){var a=[];for(var c in degreesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("scaleSelect");b.innerHTML=a.join(),b.value=selectedScaleDegrees.id}function buildShapeSelect(a){document.getElementById("shape-select").innerHTML=a.map(function(a,b){return"<button \n    shapeIndex=".concat(b," \n    class=\"shape-select ").concat(+selectedShape===+b?"selected-shape":"","\">\n    ").concat(a.shapeNumber,"\n  </button>")}).join(""),document.querySelectorAll("[rootNoteFret]").forEach(function(b){var c=0;a.forEach(function(a,d){+b.getAttribute("rootNoteFret")===+a.fret&&(c=d)}),b.setAttribute("shapeIndex",c)}),document.querySelectorAll(".shape-select","[rootNoteFret]").forEach(function(a){return a.addEventListener("click",function(a){selectedShape=a.target.getAttribute("shapeIndex"),buildFretboard(isPortrait)})})}function reDrawApp(){return buildScalesMap(),buildKeySelector(),buildScaleSelector(),window.innerHeight>window.innerWidth?(document.getElementById("wrapper").className="app-wrapper portrait-mode",isPortrait=!0,void buildFretboard({portrait:!0})):void(isPortrait=!1,document.getElementById("wrapper").className="app-wrapper landscape-mode",buildFretboard({portrait:!1}))}window.addEventListener("resize",function(){reDrawApp()}),document.getElementById("keySelect").addEventListener("change",function(a){selectedKey=a.target.value,document.getElementById("keySelect").value=a.target.value,reDrawApp()}),document.getElementById("scaleSelect").addEventListener("change",function(a){selectedScaleDegrees=degreesMap[a.target.value],document.getElementById("scaleSelect").value=a.target.value,reDrawApp()}),reDrawApp(),document.getElementById("fullScreen").addEventListener("click",function(){screenfull.isEnabled&&screenfull.toggle()});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cyA9IFtcbiAgJ0MnLFxuICAnQyMnLFxuICAnRCcsXG4gICdEIycsXG4gICdFJyxcbiAgJ0YnLFxuICAnRiMnLFxuICAnRycsXG4gICdHIycsXG4gICdBJyxcbiAgJ0EjJyxcbiAgJ0InXG5dO1xuXG5jb25zdCBzdGFuZGFyZFR1bmluZ05vdGVzID0gW1xuICBpbnRlcnZhbHNbNF0sXG4gIGludGVydmFsc1s5XSxcbiAgaW50ZXJ2YWxzWzJdLFxuICBpbnRlcnZhbHNbN10sXG4gIGludGVydmFsc1sxMV0sXG4gIGludGVydmFsc1s0XVxuXTtcblxubGV0IHNjYWxlc01hcCA9IHt9O1xuXG5jb25zdCBkZWdyZWVzTWFwID0ge1xuICBtYWpvcjogeyBpZDogJ21ham9yJywgZGVncmVlczogWzIsIDIsIDEsIDIsIDIsIDIsIDFdIH0sXG4gIG1pbm9yOiB7IGlkOiAnbWlub3InLCBkZWdyZWVzOiBbMiwgMSwgMiwgMiwgMSwgMiwgMl0gfVxufTtcblxubGV0IHNlbGVjdGVkS2V5ID0gaW50ZXJ2YWxzWzBdO1xubGV0IHNlbGVjdGVkU2NhbGVEZWdyZWVzID0gZGVncmVlc01hcC5tYWpvcjtcbmxldCBzZWxlY3RlZFNjYWxlID0gbnVsbDtcblxubGV0IHN0cmluZ3NBcnJheSA9IFtdO1xubGV0IHNoYXBlTm90ZXMgPSBbXVxubGV0IHNlbGVjdGVkU2hhcGUgPSAwXG5cbmxldCBpc1BvcnRyYWl0ID0gZmFsc2VcblxuZnVuY3Rpb24gYnVpbGRTY2FsZShyb290Tm90ZSkge1xuICBsZXQgc2NhbGUgPSBbXTtcblxuICBsZXQgaSA9IGludGVydmFscy5pbmRleE9mKHJvb3ROb3RlKTtcbiAgZm9yIChjb25zdCBkZWdyZWUgb2Ygc2VsZWN0ZWRTY2FsZURlZ3JlZXMuZGVncmVlcykge1xuICAgIGlmICghaW50ZXJ2YWxzW2kgKyBkZWdyZWVdKSB7XG4gICAgICBsZXQgc3RhcnRJbmRleCA9IGkgPT09IGludGVydmFscy5sZW5ndGggLSAxICYmIGRlZ3JlZSA9PT0gMiA/IDEgOiAwO1xuICAgICAgaSA9IHN0YXJ0SW5kZXg7XG4gICAgICBzY2FsZSA9IFsuLi5zY2FsZSwgaW50ZXJ2YWxzW3N0YXJ0SW5kZXhdXTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHNjYWxlID0gWy4uLnNjYWxlLCBpbnRlcnZhbHNbaSArIGRlZ3JlZV1dO1xuXG4gICAgaSArPSBkZWdyZWU7XG4gIH1cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5mdW5jdGlvbiBidWlsZFNjYWxlc01hcCgpIHtcbiAgZm9yIChsZXQgaW50ZXJ2YWwgb2YgaW50ZXJ2YWxzKSB7XG4gICAgc2NhbGVzTWFwID0ge1xuICAgICAgLi4uc2NhbGVzTWFwLFxuICAgICAgW2ludGVydmFsXTogeyBpZDogaW50ZXJ2YWwsIG5vdGVzOiBidWlsZFNjYWxlKGludGVydmFsKSB9XG4gICAgfTtcbiAgfVxuICBzZWxlY3RlZFNjYWxlID0gc2NhbGVzTWFwW3NlbGVjdGVkS2V5XTtcbn1cblxuYnVpbGRTY2FsZXNNYXAoKTtcblxuZnVuY3Rpb24gZ2V0Tm90ZXNPZlN0cmluZyhzdGFydGluZ05vdGUpIHtcbiAgbGV0IG5vdGVzID0gW107XG4gIGxldCBpID1cbiAgICBpbnRlcnZhbHMuaW5kZXhPZihzdGFydGluZ05vdGUpID09PSAxMVxuICAgICAgPyAwXG4gICAgICA6IGludGVydmFscy5pbmRleE9mKHN0YXJ0aW5nTm90ZSkgKyAxO1xuXG4gIHdoaWxlIChub3Rlcy5sZW5ndGggPD0gMTEpIHtcbiAgICBpZiAoIWludGVydmFsc1tpXSkge1xuICAgICAgaSA9IDA7XG4gICAgfVxuICAgIG5vdGVzID0gWy4uLm5vdGVzLCBpbnRlcnZhbHNbaV1dO1xuICAgIGkrKztcbiAgfVxuXG4gIHJldHVybiBub3Rlcztcbn1cblxuZnVuY3Rpb24gYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdCB9KSB7XG4gIHN0cmluZ3NBcnJheSA9IFtdO1xuICBjb25zdCBzdGFydGluZ05vdGVzID1cbiAgICBwb3J0cmFpdCA9PT0gdHJ1ZVxuICAgICAgPyBbLi4uc3RhbmRhcmRUdW5pbmdOb3Rlc11cbiAgICAgIDogWy4uLnN0YW5kYXJkVHVuaW5nTm90ZXNdLnJldmVyc2UoKTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAnZnJldEJvYXJkJ1xuICApLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZnJldHMtZWRnZVwiPiR7YnVpbGRGcmV0cygpfTwvZGl2PiBcbiAgICAke3N0YXJ0aW5nTm90ZXNcbiAgICAgIC5tYXAoXG4gICAgICAgIChzdGFydGluZ05vdGUsIHN0cmluZ051bWJlcikgPT5cbiAgICAgICAgICBgJHtidWlsZFN0cmluZyhzdGFydGluZ05vdGUsIHN0cmluZ051bWJlcil9ICR7XG4gICAgICAgICAgICBzdHJpbmdOdW1iZXIgPCA1XG4gICAgICAgICAgICAgID8gYDxkaXYgY2xhc3M9XCJmcmV0c1wiPiR7YnVpbGRGcmV0cyhzdHJpbmdOdW1iZXIpfTwvZGl2PmBcbiAgICAgICAgICAgICAgOiAnJ1xuICAgICAgICAgIH1gXG4gICAgICApXG4gICAgICAuam9pbignJyl9IFxuICAgIDxkaXYgY2xhc3M9XCJmcmV0cy1lZGdlXCI+JHtidWlsZEZyZXRzKCl9PC9kaXY+XG4gICAgPC9kaXY+YDtcblxuICBsZXQgc2hhcGVzID0gW107XG4gIGNvbnN0IHNoYXBlTnVtYmVycyA9IFsxLCA3LCA2LCA1LCA0LCAzLCAyXTtcbiAgbGV0IGN1cnJlbnRTaGFwZU51bWJlciA9IDE7XG5cbiAgc2hhcGVOb3RlcyA9IFtdXG5cbiAgc3RyaW5nc0FycmF5WzBdLmZvckVhY2goKG5vdGUsIG5vdGVJbmRleCkgPT4ge1xuICAgIGNvbnN0IHJvb3ROb3RlSW5kZXggPSBzdHJpbmdzQXJyYXlbMF0uaW5kZXhPZihcbiAgICAgIHN0cmluZ3NBcnJheVswXS5maW5kKG5vdGUgPT4gbm90ZS5ub3RlID09PSBzZWxlY3RlZEtleSlcbiAgICApO1xuXG4gICAgbGV0IGN1cnJlbnRTaGFwZSA9IG51bGxcblxuICAgIGlmIChub3RlSW5kZXggPT09IDApIHtcbiAgICAgIGN1cnJlbnRTaGFwZU51bWJlciA9IHNoYXBlTnVtYmVyc1tyb290Tm90ZUluZGV4XVxuICAgICAgY3VycmVudFNoYXBlID0geyBmcmV0OiBub3RlLmZyZXQsIHNoYXBlTnVtYmVyOiBzaGFwZU51bWJlcnNbcm9vdE5vdGVJbmRleF0gfSBcbiAgICAgIHNoYXBlcyA9IFtjdXJyZW50U2hhcGVdO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN1cnJlbnRTaGFwZU51bWJlciA9IHNoYXBlTnVtYmVyc1tzaGFwZU51bWJlcnMuaW5kZXhPZihjdXJyZW50U2hhcGVOdW1iZXIpIC0gMSBdIFxuICAgIGN1cnJlbnRTaGFwZSA9IHsgZnJldDogbm90ZS5mcmV0LCBzaGFwZU51bWJlcjogY3VycmVudFNoYXBlTnVtYmVyIH07XG5cbiAgICBpZiAoY3VycmVudFNoYXBlTnVtYmVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGN1cnJlbnRTaGFwZU51bWJlciA9ICBzaGFwZU51bWJlcnNbc2hhcGVOdW1iZXJzLmxlbmd0aCAtIDFdXG4gICAgICBjdXJyZW50U2hhcGUgPSB7IGZyZXQ6IG5vdGUuZnJldCwgc2hhcGVOdW1iZXI6IGN1cnJlbnRTaGFwZU51bWJlciB9XG4gICAgfVxuXG4gICAgc2hhcGVzID0gWy4uLnNoYXBlcywgY3VycmVudFNoYXBlXTtcbiAgfSk7XG5cbiAgc2hhcGVzLmZvckVhY2goKHNoYXBlLCBzaGFwZUluZGV4KSA9PiB7XG4gICAgbGV0IHN0cmluZ3MgPSBwb3J0cmFpdD8gWy4uLnN0cmluZ3NBcnJheV0gOiBbLi4uc3RyaW5nc0FycmF5XS5yZXZlcnNlKClcbiAgICBzdHJpbmdzLm1hcCgoc3RyaW5nLCBzdHJpbmdOdW1iZXIpID0+IHtcbiAgICAgIGxldCBub3RlcyA9IFtdO1xuICAgICAgbGV0IG9uUm9vdEZyZXQgPSB0cnVlXG4gICAgICBsZXQgbm90ZU9uU2hhcGVTdGFydEZyZXQgPSBzdHJpbmcuaW5kZXhPZihzdHJpbmcuZmluZChub3RlPT5ub3RlLmZyZXQgPT09IHNoYXBlLmZyZXQpKVxuICAgICAgaWYobm90ZU9uU2hhcGVTdGFydEZyZXQgPT09IC0xKXtcbiAgICAgICAgb25Sb290RnJldCA9IGZhbHNlXG4gICAgICAgIG5vdGVPblNoYXBlU3RhcnRGcmV0ID0gc3RyaW5nLmluZGV4T2Yoc3RyaW5nLmZpbmQobm90ZT0+bm90ZS5mcmV0ID09PSBzaGFwZS5mcmV0ICsgMSkpXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChzdHJpbmdOdW1iZXIgPT09IDQgfHwgc3RyaW5nTnVtYmVyID09PSA1KSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gb25Sb290RnJldD8gbm90ZU9uU2hhcGVTdGFydEZyZXQgKyAxIDogbm90ZU9uU2hhcGVTdGFydEZyZXRcbiAgICAgICAgbm90ZXMgPSBzdHJpbmcuc2xpY2Uoc3RhcnQsIHN0YXJ0ICsgMyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBub3RlcyA9IHN0cmluZy5zbGljZShub3RlT25TaGFwZVN0YXJ0RnJldCwgbm90ZU9uU2hhcGVTdGFydEZyZXQgKyAzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFzaGFwZU5vdGVzW3NoYXBlSW5kZXhdKSB7XG4gICAgICAgIHNoYXBlTm90ZXNbc2hhcGVJbmRleF0gPSBub3RlcztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2hhcGVOb3Rlc1tzaGFwZUluZGV4XSA9IFtcbiAgICAgICAgLi4uc2hhcGVOb3Rlc1tzaGFwZUluZGV4XSxcbiAgICAgICAgLi4ubm90ZXNcbiAgICAgIF07XG4gICAgfSk7XG4gIH0pO1xuXG4gIGJ1aWxkU2hhcGVTZWxlY3Qoc2hhcGVzKVxuXG4gIHNoYXBlTm90ZXNbc2VsZWN0ZWRTaGFwZV0ubWFwKG5vdGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vdGUuaWQpLmNsYXNzTmFtZSA9ICdoaWdobGlnaHQnO1xuICB9KTtcbn1cblxuY29uc3QgYnVpbGRGcmV0cyA9IHN0cmluZ051bWJlciA9PiB7XG4gIGxldCBmcmV0cyA9IGBgO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICBmcmV0cyArPSBgPGRpdiBjbGFzcz1cImZyZXRcIj4ke1xuICAgICAgKHN0cmluZ051bWJlciA9PT0gMiAmJiAoaSA9PT0gNCB8fCBpID09PSA2IHx8IGkgPT09IDgpKSB8fFxuICAgICAgKGkgPT09IDExICYmIChzdHJpbmdOdW1iZXIgPT09IDAgfHwgc3RyaW5nTnVtYmVyID09PSA0KSlcbiAgICAgICAgPyBgPGRpdiBjbGFzcz1cImZyZXQtZG90XCI+PC9kaXY+YFxuICAgICAgICA6ICcnXG4gICAgfTwvZGl2PmA7XG4gIH1cbiAgcmV0dXJuIGZyZXRzO1xufTtcblxuY29uc3QgYnVpbGRTdHJpbmcgPSAoc3RhcnRpbmdOb3RlLCBzdHJpbmdOdW1iZXIpID0+IHtcbiAgY29uc3Qgc3RyaW5nTm90ZXMgPSBnZXROb3Rlc09mU3RyaW5nKHN0YXJ0aW5nTm90ZSkubWFwKChub3RlLCBmcmV0KSA9PiAoe1xuICAgIGlkOiBzdHJpbmdOdW1iZXIgKyBub3RlLFxuICAgIG5vdGUsXG4gICAgc3RyaW5nTnVtYmVyLFxuICAgIGZyZXRcbiAgfSkpO1xuICBzdHJpbmdzQXJyYXkgPSBbXG4gICAgLi4uc3RyaW5nc0FycmF5LFxuICAgIHN0cmluZ05vdGVzLmZpbHRlcihub3RlID0+IHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZS5ub3RlKSlcbiAgXTtcblxuICBjb25zdCBsb3dFID0gaXNQb3J0cmFpdD8gMCA6IDVcblxuICByZXR1cm4gYDxkaXYgY2xhc3M9XCJndWl0YXItc3RyaW5nXCI+JHtzdHJpbmdOb3Rlc1xuICAgIC5tYXAoXG4gICAgICAobm90ZSwgbm90ZUluZGV4KSA9PiBzdHJpbmdOdW1iZXIgIT09IGxvd0U/XG4gICAgICAgIGA8ZGl2IGNsYXNzPVwibm90ZVwiPiR7XG4gICAgICAgICAgc2VsZWN0ZWRTY2FsZS5ub3Rlcy5pbmNsdWRlcyhub3RlLm5vdGUpXG4gICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LWJhY2tkcm9wXCI+PC9kaXY+PHNwYW4gY2xhc3M9XCJub3RlLXRleHRcIj48cCBpZD0ke25vdGUuaWR9PiR7bm90ZS5ub3RlfTwvcD48L3NwYW4+YFxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICB9PC9kaXY+YCBcbiAgICAgICAgOiBcbiAgICAgICAgYDxkaXYgY2xhc3M9XCJyb290LW5vdGVcIj4ke1xuICAgICAgICAgIHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZS5ub3RlKVxuICAgICAgICAgICAgPyBgPGJ1dHRvbiByb290Tm90ZUZyZXQ9XCIke25vdGUuZnJldH1cIiBjbGFzcz1cInJvb3Qtbm90ZS10ZXh0LWJhY2tkcm9wIHNoYXBlLXNlbGVjdFwiPjwvYnV0dG9uPjxzcGFuIGNsYXNzPVwicm9vdC1ub3RlLXRleHRcIj48cCBpZD0ke25vdGUuaWR9PiR7bm90ZS5ub3RlfTwvcD48L3NwYW4+YFxuICAgICAgICAgICAgOiAnJ1xuICAgICAgICB9PC9kaXY+YFxuICAgIClcbiAgICAuam9pbignJyl9PC9kaXY+YDtcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkS2V5U2VsZWN0b3IoKSB7XG4gIGxldCBvcHRpb25zID0gW107XG4gIGZvciAoY29uc3Qga2V5TmFtZSBpbiBzY2FsZXNNYXApIHtcbiAgICBvcHRpb25zID0gWy4uLm9wdGlvbnMsIGA8b3B0aW9uIHZhbHVlPVwiJHtrZXlOYW1lfVwiPiR7a2V5TmFtZX08L29wdGlvbj5gXTtcbiAgfVxuICBsZXQga2V5U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tleVNlbGVjdCcpO1xuICBrZXlTZWxlY3QuaW5uZXJIVE1MID0gb3B0aW9ucy5qb2luKCk7XG4gIGtleVNlbGVjdC52YWx1ZSA9IHNlbGVjdGVkS2V5O1xufVxuXG5mdW5jdGlvbiBidWlsZFNjYWxlU2VsZWN0b3IoKSB7XG4gIGxldCBvcHRpb25zID0gW107XG4gIGZvciAoY29uc3Qgc2NhbGVOYW1lIGluIGRlZ3JlZXNNYXApIHtcbiAgICBvcHRpb25zID0gW1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHtzY2FsZU5hbWV9XCI+JHtzY2FsZU5hbWV9PC9vcHRpb24+YFxuICAgIF07XG4gIH1cbiAgbGV0IHNjYWxlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjYWxlU2VsZWN0Jyk7XG4gIHNjYWxlU2VsZWN0LmlubmVySFRNTCA9IG9wdGlvbnMuam9pbigpO1xuICBzY2FsZVNlbGVjdC52YWx1ZSA9IHNlbGVjdGVkU2NhbGVEZWdyZWVzLmlkO1xufVxuXG5mdW5jdGlvbiBidWlsZFNoYXBlU2VsZWN0KHNoYXBlcykge1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcGUtc2VsZWN0JykuaW5uZXJIVE1MID0gc2hhcGVzLm1hcCgoc2hhcGUsIHNoYXBlSW5kZXgpPT4gXG4gIGA8YnV0dG9uIFxuICAgIHNoYXBlSW5kZXg9JHtzaGFwZUluZGV4fSBcbiAgICBjbGFzcz1cInNoYXBlLXNlbGVjdCAke051bWJlcihzZWxlY3RlZFNoYXBlKSA9PT0gTnVtYmVyKHNoYXBlSW5kZXgpPyAnc2VsZWN0ZWQtc2hhcGUnIDogJyd9XCI+XG4gICAgJHtzaGFwZS5zaGFwZU51bWJlcn1cbiAgPC9idXR0b24+YFxuICApLmpvaW4oJycpXG5cblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICdbcm9vdE5vdGVGcmV0XSdcbiAgKS5mb3JFYWNoKGVsPT57XG4gICAgbGV0IHNoYXBlSW5kZXggPSAwXG4gICAgc2hhcGVzLmZvckVhY2goKHNoYXBlLGkpPT57XG4gICAgICBpZihOdW1iZXIoZWwuZ2V0QXR0cmlidXRlKCdyb290Tm90ZUZyZXQnKSkgPT09IE51bWJlcihzaGFwZS5mcmV0KSkge1xuICAgICAgICBzaGFwZUluZGV4ID0gaVxuICAgICAgfVxuICAgIH0pXG4gICAgZWwuc2V0QXR0cmlidXRlKCdzaGFwZUluZGV4Jywgc2hhcGVJbmRleClcbiAgfSlcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGUtc2VsZWN0JywgJ1tyb290Tm90ZUZyZXRdJykuZm9yRWFjaChlbD0+ZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlPT57XG4gICAgc2VsZWN0ZWRTaGFwZSA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnc2hhcGVJbmRleCcpIFxuICAgIGJ1aWxkRnJldGJvYXJkKGlzUG9ydHJhaXQpXG4gIH0pKVxuXG59XG5cbmZ1bmN0aW9uIHJlRHJhd0FwcCgpIHtcbiAgYnVpbGRTY2FsZXNNYXAoKTtcbiAgYnVpbGRLZXlTZWxlY3RvcigpO1xuICBidWlsZFNjYWxlU2VsZWN0b3IoKTtcblxuICBpZiAod2luZG93LmlubmVySGVpZ2h0ID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmNsYXNzTmFtZSA9ICdhcHAtd3JhcHBlciBwb3J0cmFpdC1tb2RlJztcbiAgICBpc1BvcnRyYWl0ID0gdHJ1ZVxuICAgIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IHRydWUgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzUG9ydHJhaXQgPSBmYWxzZVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmNsYXNzTmFtZSA9ICdhcHAtd3JhcHBlciBsYW5kc2NhcGUtbW9kZSc7XG4gIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IGZhbHNlIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICByZURyYXdBcHAoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5U2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gIHNlbGVjdGVkS2V5ID0gZS50YXJnZXQudmFsdWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZVNlbGVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICBzZWxlY3RlZFNjYWxlRGVncmVlcyA9IGRlZ3JlZXNNYXBbZS50YXJnZXQudmFsdWVdO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhbGVTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbnJlRHJhd0FwcCgpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbFNjcmVlbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGlmICghc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2NyZWVuZnVsbC50b2dnbGUoKTtcbn0pO1xuIl19