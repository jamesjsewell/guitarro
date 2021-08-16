"use strict";function ownKeys(a,b){var c=Object.keys(a);if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(a);b&&(d=d.filter(function(b){return Object.getOwnPropertyDescriptor(a,b).enumerable})),c.push.apply(c,d)}return c}function _objectSpread(a){for(var b,c=1;c<arguments.length;c++)b=null==arguments[c]?{}:arguments[c],c%2?ownKeys(b,!0).forEach(function(c){_defineProperty(a,c,b[c])}):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(b)):ownKeys(b).forEach(function(c){Object.defineProperty(a,c,Object.getOwnPropertyDescriptor(b,c))});return a}function _defineProperty(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||"[object Arguments]"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}var intervals=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],scalesMap={},degreesMap={major:{id:"major",degrees:[2,2,1,2,2,2,1]},minor:{id:"minor",degrees:[2,1,2,2,1,2,2]}},selectedKey=intervals[0],selectedScaleDegrees=degreesMap.major,selectedScale=null,stringsArray=[],shapeNotes=[],selectedShape={index:0,fret:0,number:0},isPortrait=!1;function buildScale(a){var b=[],c=intervals.indexOf(a),d=!0,e=!1,f=void 0;try{for(var g,h,j=selectedScaleDegrees.degrees[Symbol.iterator]();!(d=(g=j.next()).done);d=!0){if(h=g.value,!intervals[c+h]){var k=c===intervals.length-1&&2===h?1:0;c=k,b=[].concat(_toConsumableArray(b),[intervals[k]]);continue}b=[].concat(_toConsumableArray(b),[intervals[c+h]]),c+=h}}catch(a){e=!0,f=a}finally{try{d||null==j["return"]||j["return"]()}finally{if(e)throw f}}return b}function buildScalesMap(){var a=!0,b=!1,c=void 0;try{for(var d,e,f=intervals[Symbol.iterator]();!(a=(d=f.next()).done);a=!0)e=d.value,scalesMap=_objectSpread({},scalesMap,_defineProperty({},e,{id:e,notes:buildScale(e)}))}catch(a){b=!0,c=a}finally{try{a||null==f["return"]||f["return"]()}finally{if(b)throw c}}selectedScale=scalesMap[selectedKey]}buildScalesMap();function getNotesOfString(a){for(var b=[],c=11===intervals.indexOf(a)?0:intervals.indexOf(a)+1;11>=b.length;)intervals[c]||(c=0),b=[].concat(_toConsumableArray(b),[intervals[c]]),c++;return b}function buildFretboard(a){var b=a.portrait,c=[intervals[4],intervals[9],intervals[2],intervals[7],intervals[11],intervals[4]];stringsArray=[];var d=!0===b?[].concat(c):[].concat(c).reverse();document.getElementById("fretBoard").innerHTML="<div class=\"frets-edge\">".concat(buildFrets(),"</div> \n    ").concat(d.map(function(a,b){return"".concat(buildString(a,b)," ").concat(5>b?"<div class=\"frets\">".concat(buildFrets(b),"</div>"):"")}).join("")," \n    <div class=\"frets-edge\">").concat(buildFrets(),"</div>\n    </div>");var e=[],f=[1,7,6,5,4,3,2],g=1;shapeNotes=[],stringsArray[0].forEach(function(a,b){var c=stringsArray[0].indexOf(stringsArray[0].find(function(a){return a.note===selectedKey})),d=null;if(0===b)return g=f[c],d={fret:a.fret,number:f[c],index:c,note:a.note},void(e=[d]);var h=f.indexOf(g)-1;g=f[h],d={fret:a.fret,number:g,index:h,note:a.note},h=f.length-1,g===void 0&&(g=f[h],d={fret:a.fret,number:g,index:h,note:a.note}),e=[].concat(_toConsumableArray(e),[d])}),e.forEach(function(a,c){var d=b?_toConsumableArray(stringsArray):_toConsumableArray(stringsArray).reverse();d.map(function(b,d){var e=[],f=!0,g=b.indexOf(b.find(function(b){return b.fret===a.fret}));if(-1===g&&(f=!1,g=b.indexOf(b.find(function(b){return b.fret===a.fret+1}))),4===d||5===d){var h=f?g+1:g;e=b.slice(h,h+3)}else e=b.slice(g,g+3);return shapeNotes[c]?void(shapeNotes[c]=[].concat(_toConsumableArray(shapeNotes[c]),_toConsumableArray(e))):void(shapeNotes[c]=e)})}),buildShapeSelect(e),shapeNotes[selectedShape.index].map(function(a){document.getElementById(a.id).className="highlight"})}var buildFrets=function(a){for(var b="",c=0;12>c;c++)b+="<div class=\"fret\">".concat(2===a&&(4===c||6===c||8===c)||11===c&&(0===a||4===a)?"<div class=\"fret-dot\"></div>":"","</div>");return b},buildString=function(a,b){var c=getNotesOfString(a).map(function(a,c){return{id:b+a,note:a,stringNumber:b,fret:c}});stringsArray=[].concat(_toConsumableArray(stringsArray),[c.filter(function(a){return selectedScale.notes.includes(a.note)})]);var d=isPortrait?0:5;return"<div class=\"guitar-string\">".concat(c.map(function(a){return b===d?"<div class=\"root-note\">".concat(selectedScale.notes.includes(a.note)?"<button rootNoteFret=\"".concat(a.fret,"\" class=\"root-note-text-backdrop shape-select root-note-shape-select ").concat(selectedShape.note===a.note?"selected-root-note":"","\"></button><span class=\"root-note-text\"><p id=").concat(a.id,">").concat(a.note,"</p></span>"):"","</div>"):"<div class=\"note\">".concat(selectedScale.notes.includes(a.note)?"<div class=\"note-text-backdrop\"></div><span class=\"note-text\"><p id=".concat(a.id,">").concat(a.note,"</p></span>"):"","</div>")}).join(""),"</div>")};function buildKeySelector(){var a=[];for(var c in scalesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("keySelect");b.innerHTML=a.join(),b.value=selectedKey}function buildScaleSelector(){var a=[];for(var c in degreesMap)a=[].concat(_toConsumableArray(a),["<option value=\"".concat(c,"\">").concat(c,"</option>")]);var b=document.getElementById("scaleSelect");b.innerHTML=a.join(),b.value=selectedScaleDegrees.id}function buildShapeSelect(a){a.forEach(function(a,b){+b===+selectedShape.index&&(selectedShape=a,selectedShape.index=b)}),document.getElementById("shape-select").innerHTML=a.map(function(a,b){return"<button \n    shapeIndex=".concat(b,"\n    shapeFret=").concat(a.fret," \n    class=\"shape-select ").concat(+selectedShape.index===+b?"selected-shape":"","\">\n    ").concat(a.number,"\n  </button>")}).join(""),document.querySelectorAll("[rootNoteFret]").forEach(function(b){var c=null,d=null;a.forEach(function(a,e){if(+b.getAttribute("rootNoteFret")===+a.fret)return c=a,d=e,e===selectedShape.index?void b.classList.add("selected-root-note"):void b.classList.remove("selected-root-note")}),b.setAttribute("shapeIndex",d),b.setAttribute("shapeNumber",c.number),b.setAttribute("shapeNote",c.note)}),document.querySelectorAll(".shape-select","[rootNoteFret]").forEach(function(a){return a.addEventListener("click",function(a){selectedShape={index:a.target.getAttribute("shapeIndex"),number:a.target.getAttribute("shapeNumber"),fret:a.target.getAttribute("rootNoteFret")?a.target.getAttribute("rootNoteFret"):a.target.getAttribute("shapeFret"),note:a.target.getAttribute("shapeNote")},buildFretboard({portrait:isPortrait})})})}function reDrawApp(){return buildScalesMap(),buildKeySelector(),buildScaleSelector(),window.innerHeight>window.innerWidth?(document.getElementById("wrapper").className="app-wrapper portrait-mode",isPortrait=!0,void buildFretboard({portrait:!0})):void(isPortrait=!1,document.getElementById("wrapper").className="app-wrapper landscape-mode",buildFretboard({portrait:!1}))}window.addEventListener("resize",function(){reDrawApp()}),document.getElementById("keySelect").addEventListener("change",function(a){selectedKey=a.target.value,document.getElementById("keySelect").value=a.target.value,reDrawApp()}),document.getElementById("scaleSelect").addEventListener("change",function(a){selectedScaleDegrees=degreesMap[a.target.value],document.getElementById("scaleSelect").value=a.target.value,reDrawApp()}),reDrawApp(),document.getElementById("fullScreen").addEventListener("click",function(){screenfull.isEnabled&&screenfull.toggle()});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9ndWl0YXJyby5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoicXJDQUFNLENBQUEsU0FBUyxDQUFHLENBQ2hCLEdBRGdCLENBRWhCLElBRmdCLENBR2hCLEdBSGdCLENBSWhCLElBSmdCLENBS2hCLEdBTGdCLENBTWhCLEdBTmdCLENBT2hCLElBUGdCLENBUWhCLEdBUmdCLENBU2hCLElBVGdCLENBVWhCLEdBVmdCLENBV2hCLElBWGdCLENBWWhCLEdBWmdCLEMsQ0FlZCxTQUFTLENBQUcsRSxDQUVWLFVBQVUsQ0FBRyxDQUNqQixLQUFLLENBQUUsQ0FBRSxFQUFFLENBQUUsT0FBTixDQUFlLE9BQU8sQ0FBRSxDQUFDLENBQUQsQ0FBSSxDQUFKLENBQU8sQ0FBUCxDQUFVLENBQVYsQ0FBYSxDQUFiLENBQWdCLENBQWhCLENBQW1CLENBQW5CLENBQXhCLENBRFUsQ0FFakIsS0FBSyxDQUFFLENBQUUsRUFBRSxDQUFFLE9BQU4sQ0FBZSxPQUFPLENBQUUsQ0FBQyxDQUFELENBQUksQ0FBSixDQUFPLENBQVAsQ0FBVSxDQUFWLENBQWEsQ0FBYixDQUFnQixDQUFoQixDQUFtQixDQUFuQixDQUF4QixDQUZVLEMsQ0FLZixXQUFXLENBQUcsU0FBUyxDQUFDLENBQUQsQyxDQUN2QixvQkFBb0IsQ0FBRyxVQUFVLENBQUMsSyxDQUNsQyxhQUFhLENBQUcsSSxDQUVoQixZQUFZLENBQUcsRSxDQUNmLFVBQVUsQ0FBRyxFLENBQ2IsYUFBYSxDQUFHLENBQUUsS0FBSyxDQUFFLENBQVQsQ0FBWSxJQUFJLENBQUUsQ0FBbEIsQ0FBcUIsTUFBTSxDQUFFLENBQTdCLEMsQ0FFaEIsVUFBVSxHLENBRWQsUUFBUyxDQUFBLFVBQVQsQ0FBb0IsQ0FBcEIsQ0FBOEIsSUFDeEIsQ0FBQSxDQUFLLENBQUcsRUFEZ0IsQ0FHeEIsQ0FBQyxDQUFHLFNBQVMsQ0FBQyxPQUFWLENBQWtCLENBQWxCLENBSG9CLHdCQUk1QixVQUFXLENBQVgsR0FBcUIsb0JBQW9CLENBQUMsT0FBMUMsZ0RBQW1ELENBQ2pELEdBRFMsQ0FDVCxTQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBRyxDQUFMLENBQWQsQ0FBNEIsQ0FDMUIsR0FBSSxDQUFBLENBQVUsQ0FBRyxDQUFDLEdBQUssU0FBUyxDQUFDLE1BQVYsQ0FBbUIsQ0FBekIsRUFBeUMsQ0FBWCxHQUFBLENBQTlCLENBQTZDLENBQTdDLENBQWlELENBQWxFLENBQ0EsQ0FBQyxDQUFHLENBRnNCLENBRzFCLENBQUssOEJBQU8sQ0FBUCxHQUFjLFNBQVMsQ0FBQyxDQUFELENBQXZCLEVBSHFCLENBSTFCLFFBQ0QsQ0FFRCxDQUFLLDhCQUFPLENBQVAsR0FBYyxTQUFTLENBQUMsQ0FBQyxDQUFHLENBQUwsQ0FBdkIsRUFSNEMsQ0FVakQsQ0FBQyxFQUFJLENBQ04sQ0FmMkIseUZBZ0I1QixNQUFPLENBQUEsQ0FDUixDQUVELFFBQVMsQ0FBQSxjQUFULEVBQTBCLDRCQUN4QixVQUFTLENBQVQsR0FBcUIsU0FBckIsZ0RBQVMsQ0FBVCxTQUNFLFNBQVMsa0JBQ0osU0FESSxvQkFFTixDQUZNLENBRUssQ0FBRSxFQUFFLENBQUUsQ0FBTixDQUFnQixLQUFLLENBQUUsVUFBVSxDQUFDLENBQUQsQ0FBakMsQ0FGTCxFQUZhLHlGQU94QixhQUFhLENBQUcsU0FBUyxDQUFDLFdBQUQsQ0FDMUIsQ0FFRCxjQUFjLEUsQ0FFZCxRQUFTLENBQUEsZ0JBQVQsQ0FBMEIsQ0FBMUIsQ0FBd0MsUUFDbEMsQ0FBQSxDQUFLLENBQUcsRUFEMEIsQ0FFbEMsQ0FBQyxDQUNpQyxFQUFwQyxHQUFBLFNBQVMsQ0FBQyxPQUFWLENBQWtCLENBQWxCLEVBQ0ksQ0FESixDQUVJLFNBQVMsQ0FBQyxPQUFWLENBQWtCLENBQWxCLEVBQWtDLENBTEYsQ0FPZixFQUFoQixFQUFBLENBQUssQ0FBQyxNQVB5QixFQVEvQixTQUFTLENBQUMsQ0FBRCxDQVJzQixHQVNsQyxDQUFDLENBQUcsQ0FUOEIsRUFXcEMsQ0FBSyw4QkFBTyxDQUFQLEdBQWMsU0FBUyxDQUFDLENBQUQsQ0FBdkIsRUFYK0IsQ0FZcEMsQ0FBQyxFQVptQyxDQWV0QyxNQUFPLENBQUEsQ0FDUixDQUVELFFBQVMsQ0FBQSxjQUFULEdBQXNDLElBQVosQ0FBQSxDQUFZLEdBQVosUUFBWSxDQUM5QixDQUFtQixDQUFHLENBQzFCLFNBQVMsQ0FBQyxDQUFELENBRGlCLENBRTFCLFNBQVMsQ0FBQyxDQUFELENBRmlCLENBRzFCLFNBQVMsQ0FBQyxDQUFELENBSGlCLENBSTFCLFNBQVMsQ0FBQyxDQUFELENBSmlCLENBSzFCLFNBQVMsQ0FBQyxFQUFELENBTGlCLENBTTFCLFNBQVMsQ0FBQyxDQUFELENBTmlCLENBRFEsQ0FTcEMsWUFBWSxDQUFHLEVBVHFCLENBVXBDLEdBQU0sQ0FBQSxDQUFhLENBQ2pCLEtBQUEsQ0FBUSxXQUNBLENBREEsRUFFSixVQUFJLENBQUosRUFBeUIsT0FBekIsRUFITixDQUtBLFFBQVEsQ0FBQyxjQUFULENBQ0UsV0FERixFQUVFLFNBRkYscUNBRXlDLFVBQVUsRUFGbkQseUJBR0ksQ0FBYSxDQUNaLEdBREQsQ0FFRSxTQUFDLENBQUQsQ0FBZSxDQUFmLGtCQUNLLFdBQVcsQ0FBQyxDQUFELENBQWUsQ0FBZixDQURoQixhQUVtQixDQUFmLENBQUEsQ0FBWSxnQ0FDYyxVQUFVLENBQUMsQ0FBRCxDQUR4QixXQUVSLEVBSlIsRUFGRixFQVNDLElBVEQsQ0FTTSxFQVROLENBSEosNkNBYTRCLFVBQVUsRUFidEMsc0JBZm9DLElBK0JoQyxDQUFBLENBQU0sQ0FBRyxFQS9CdUIsQ0FnQzlCLENBQVksQ0FBRyxDQUFDLENBQUQsQ0FBSSxDQUFKLENBQU8sQ0FBUCxDQUFVLENBQVYsQ0FBYSxDQUFiLENBQWdCLENBQWhCLENBQW1CLENBQW5CLENBaENlLENBaUNoQyxDQUFrQixDQUFHLENBakNXLENBbUNwQyxVQUFVLENBQUcsRUFuQ3VCLENBcUNwQyxZQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCLE9BQWhCLENBQXdCLFNBQUMsQ0FBRCxDQUFPLENBQVAsQ0FBcUIsSUFDckMsQ0FBQSxDQUFhLENBQUcsWUFBWSxDQUFDLENBQUQsQ0FBWixDQUFnQixPQUFoQixDQUNwQixZQUFZLENBQUMsQ0FBRCxDQUFaLENBQWdCLElBQWhCLENBQXFCLFNBQUEsQ0FBSSxRQUFJLENBQUEsQ0FBSSxDQUFDLElBQUwsR0FBYyxXQUFsQixDQUF6QixDQURvQixDQURxQixDQUt2QyxDQUFZLENBQUcsSUFMd0IsQ0FPM0MsR0FBa0IsQ0FBZCxHQUFBLENBQUosQ0FTRSxNQVJBLENBQUEsQ0FBa0IsQ0FBRyxDQUFZLENBQUMsQ0FBRCxDQVFqQyxDQVBBLENBQVksQ0FBRyxDQUNiLElBQUksQ0FBRSxDQUFJLENBQUMsSUFERSxDQUViLE1BQU0sQ0FBRSxDQUFZLENBQUMsQ0FBRCxDQUZQLENBR2IsS0FBSyxDQUFFLENBSE0sQ0FJYixJQUFJLENBQUUsQ0FBSSxDQUFDLElBSkUsQ0FPZixNQURBLENBQU0sQ0FBRyxDQUFDLENBQUQsQ0FDVCxFQUdGLEdBQUksQ0FBQSxDQUFLLENBQUcsQ0FBWSxDQUFDLE9BQWIsQ0FBcUIsQ0FBckIsRUFBMkMsQ0FBdkQsQ0FDQSxDQUFrQixDQUNoQixDQUFZLENBQUMsQ0FBRCxDQXJCNkIsQ0FzQjNDLENBQVksQ0FBRyxDQUFFLElBQUksQ0FBRSxDQUFJLENBQUMsSUFBYixDQUFtQixNQUFNLENBQUUsQ0FBM0IsQ0FBK0MsS0FBSyxDQUFMLENBQS9DLENBQXNELElBQUksQ0FBRSxDQUFJLENBQUMsSUFBakUsQ0F0QjRCLENBd0IzQyxDQUFLLENBQUcsQ0FBWSxDQUFDLE1BQWIsQ0FBc0IsQ0F4QmEsQ0F5QnZDLENBQWtCLFNBekJxQixHQTBCekMsQ0FBa0IsQ0FBRyxDQUFZLENBQUMsQ0FBRCxDQTFCUSxDQTJCekMsQ0FBWSxDQUFHLENBQUUsSUFBSSxDQUFFLENBQUksQ0FBQyxJQUFiLENBQW1CLE1BQU0sQ0FBRSxDQUEzQixDQUErQyxLQUFLLENBQUwsQ0FBL0MsQ0FBc0QsSUFBSSxDQUFFLENBQUksQ0FBQyxJQUFqRSxDQTNCMEIsRUE4QjNDLENBQU0sOEJBQU8sQ0FBUCxHQUFlLENBQWYsRUFDUCxDQS9CRCxDQXJDb0MsQ0FzRXBDLENBQU0sQ0FBQyxPQUFQLENBQWUsU0FBQyxDQUFELENBQVEsQ0FBUixDQUF1QixDQUNwQyxHQUFJLENBQUEsQ0FBTyxDQUFHLENBQVEsb0JBQU8sWUFBUCxFQUF1QixtQkFBSSxZQUFKLEVBQWtCLE9BQWxCLEVBQTdDLENBQ0EsQ0FBTyxDQUFDLEdBQVIsQ0FBWSxTQUFDLENBQUQsQ0FBUyxDQUFULENBQTBCLElBQ2hDLENBQUEsQ0FBSyxDQUFHLEVBRHdCLENBRWhDLENBQVUsR0FGc0IsQ0FHaEMsQ0FBb0IsQ0FBRyxDQUFNLENBQUMsT0FBUCxDQUN6QixDQUFNLENBQUMsSUFBUCxDQUFZLFNBQUEsQ0FBSSxRQUFJLENBQUEsQ0FBSSxDQUFDLElBQUwsR0FBYyxDQUFLLENBQUMsSUFBeEIsQ0FBaEIsQ0FEeUIsQ0FIUyxDQWFwQyxHQVA2QixDQUFDLENBQTFCLEdBQUEsQ0FPSixHQU5FLENBQVUsR0FNWixDQUxFLENBQW9CLENBQUcsQ0FBTSxDQUFDLE9BQVAsQ0FDckIsQ0FBTSxDQUFDLElBQVAsQ0FBWSxTQUFBLENBQUksUUFBSSxDQUFBLENBQUksQ0FBQyxJQUFMLEdBQWMsQ0FBSyxDQUFDLElBQU4sQ0FBYSxDQUEvQixDQUFoQixDQURxQixDQUt6QixFQUFxQixDQUFqQixHQUFBLENBQVksRUFBMkIsQ0FBakIsR0FBQSxDQUExQixDQUE4QyxDQUM1QyxHQUFNLENBQUEsQ0FBSyxDQUFHLENBQVUsQ0FDcEIsQ0FBb0IsQ0FBRyxDQURILENBRXBCLENBRkosQ0FHQSxDQUFLLENBQUcsQ0FBTSxDQUFDLEtBQVAsQ0FBYSxDQUFiLENBQW9CLENBQUssQ0FBRyxDQUE1QixDQUNULENBTEQsSUFNRSxDQUFBLENBQUssQ0FBRyxDQUFNLENBQUMsS0FBUCxDQUFhLENBQWIsQ0FBbUMsQ0FBb0IsQ0FBRyxDQUExRCxDQU5WLENBYm9DLE1Bc0IvQixDQUFBLFVBQVUsQ0FBQyxDQUFELENBdEJxQixNQTBCcEMsVUFBVSxDQUFDLENBQUQsQ0FBViw4QkFBNkIsVUFBVSxDQUFDLENBQUQsQ0FBdkMscUJBQXdELENBQXhELEVBMUJvQyxPQXVCbEMsVUFBVSxDQUFDLENBQUQsQ0FBVixDQUF5QixDQXZCUyxDQTJCckMsQ0EzQkQsQ0E0QkQsQ0E5QkQsQ0F0RW9DLENBc0dwQyxnQkFBZ0IsQ0FBQyxDQUFELENBdEdvQixDQXdHcEMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFmLENBQVYsQ0FBZ0MsR0FBaEMsQ0FBb0MsU0FBQSxDQUFJLENBQUksQ0FDMUMsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsQ0FBSSxDQUFDLEVBQTdCLEVBQWlDLFNBQWpDLENBQTZDLFdBQzlDLENBRkQsQ0FHRCxDLEdBRUssQ0FBQSxVQUFVLENBQUcsU0FBQSxDQUFZLENBQUksQ0FFakMsT0FESSxDQUFBLENBQUssR0FDVCxDQUFTLENBQUMsQ0FBRyxDQUFiLENBQW9CLEVBQUosQ0FBQSxDQUFoQixDQUF3QixDQUFDLEVBQXpCLENBQ0UsQ0FBSyxnQ0FDZSxDQUFqQixHQUFBLENBQVksR0FBaUIsQ0FBTixHQUFBLENBQUMsRUFBZ0IsQ0FBTixHQUFBLENBQVgsRUFBNEIsQ0FBTixHQUFBLENBQWpDLENBQWIsRUFDTyxFQUFOLEdBQUEsQ0FBQyxHQUE2QixDQUFqQixHQUFBLENBQVksRUFBMkIsQ0FBakIsR0FBQSxDQUFsQyxDQURGLGtDQUdJLEVBSkQsVUFBTCxDQU9GLE1BQU8sQ0FBQSxDQUNSLEMsQ0FFSyxXQUFXLENBQUcsU0FBQyxDQUFELENBQWUsQ0FBZixDQUFnQyxDQUNsRCxHQUFNLENBQUEsQ0FBVyxDQUFHLGdCQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBK0IsR0FBL0IsQ0FBbUMsU0FBQyxDQUFELENBQU8sQ0FBUCxRQUFpQixDQUN0RSxFQUFFLENBQUUsQ0FBWSxDQUFHLENBRG1ELENBRXRFLElBQUksQ0FBSixDQUZzRSxDQUd0RSxZQUFZLENBQVosQ0FIc0UsQ0FJdEUsSUFBSSxDQUFKLENBSnNFLENBQWpCLENBQW5DLENBQXBCLENBTUEsWUFBWSw4QkFDUCxZQURPLEdBRVYsQ0FBVyxDQUFDLE1BQVosQ0FBbUIsU0FBQSxDQUFJLFFBQUksQ0FBQSxhQUFhLENBQUMsS0FBZCxDQUFvQixRQUFwQixDQUE2QixDQUFJLENBQUMsSUFBbEMsQ0FBSixDQUF2QixDQUZVLEVBUHNDLENBWWxELEdBQU0sQ0FBQSxDQUFJLENBQUcsVUFBVSxDQUFHLENBQUgsQ0FBTyxDQUE5QixDQUVBLDZDQUFxQyxDQUFXLENBQzdDLEdBRGtDLENBQzlCLFNBQUMsQ0FBRCxRQUNILENBQUEsQ0FBWSxHQUFLLENBQWpCLG9DQU9NLGFBQWEsQ0FBQyxLQUFkLENBQW9CLFFBQXBCLENBQTZCLENBQUksQ0FBQyxJQUFsQyxtQ0FDNkIsQ0FBSSxDQUFDLElBRGxDLG1GQUM4RyxhQUFhLENBQUMsSUFBZCxHQUF1QixDQUFJLENBQUMsSUFBNUIsQ0FBa0Msb0JBQWxDLENBQXlELEVBRHZLLDZEQUMwTixDQUFJLENBQUMsRUFEL04sYUFDcU8sQ0FBSSxDQUFDLElBRDFPLGdCQUVJLEVBVFYseUNBRU0sYUFBYSxDQUFDLEtBQWQsQ0FBb0IsUUFBcEIsQ0FBNkIsQ0FBSSxDQUFDLElBQWxDLG9GQUMyRSxDQUFJLENBQUMsRUFEaEYsYUFDc0YsQ0FBSSxDQUFDLElBRDNGLGdCQUVJLEVBSlYsVUFERyxDQUQ4QixFQWNsQyxJQWRrQyxDQWM3QixFQWQ2QixDQUFyQyxVQWVELEMsQ0FFRCxRQUFTLENBQUEsZ0JBQVQsRUFBNEIsQ0FDMUIsR0FBSSxDQUFBLENBQU8sQ0FBRyxFQUFkLENBQ0EsSUFBSyxHQUFNLENBQUEsQ0FBWCxHQUFzQixDQUFBLFNBQXRCLENBQ0UsQ0FBTyw4QkFBTyxDQUFQLDZCQUFrQyxDQUFsQyxlQUE4QyxDQUE5QyxlQUFQLENBRUYsR0FBSSxDQUFBLENBQVMsQ0FBRyxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixDQUFoQixDQUNBLENBQVMsQ0FBQyxTQUFWLENBQXNCLENBQU8sQ0FBQyxJQUFSLEVBTkksQ0FPMUIsQ0FBUyxDQUFDLEtBQVYsQ0FBa0IsV0FDbkIsQ0FFRCxRQUFTLENBQUEsa0JBQVQsRUFBOEIsQ0FDNUIsR0FBSSxDQUFBLENBQU8sQ0FBRyxFQUFkLENBQ0EsSUFBSyxHQUFNLENBQUEsQ0FBWCxHQUF3QixDQUFBLFVBQXhCLENBQ0UsQ0FBTyw4QkFDRixDQURFLDZCQUVhLENBRmIsZUFFMkIsQ0FGM0IsZUFBUCxDQUtGLEdBQUksQ0FBQSxDQUFXLENBQUcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FBbEIsQ0FDQSxDQUFXLENBQUMsU0FBWixDQUF3QixDQUFPLENBQUMsSUFBUixFQVRJLENBVTVCLENBQVcsQ0FBQyxLQUFaLENBQW9CLG9CQUFvQixDQUFDLEVBQzFDLENBRUQsUUFBUyxDQUFBLGdCQUFULENBQTBCLENBQTFCLENBQWtDLENBRWhDLENBQU0sQ0FBQyxPQUFQLENBQWUsU0FBQyxDQUFELENBQVEsQ0FBUixDQUFxQixDQUMvQixDQUFPLENBQVAsSUFBNEIsYUFBYSxDQUFDLEtBRFgsR0FFaEMsYUFBYSxDQUFHLENBRmdCLENBR2hDLGFBQWEsQ0FBQyxLQUFkLENBQXNCLENBSFUsQ0FLbkMsQ0FMRCxDQUZnQyxDQVNoQyxRQUFRLENBQUMsY0FBVCxDQUF3QixjQUF4QixFQUF3QyxTQUF4QyxDQUFvRCxDQUFNLENBQ3ZELEdBRGlELENBRWhELFNBQUMsQ0FBRCxDQUFRLENBQVIsMkNBRVcsQ0FGWCw0QkFHVSxDQUFLLENBQUMsSUFIaEIsd0NBS0EsQ0FBTyxhQUFhLENBQUMsS0FBckIsSUFBdUMsQ0FBdkMsQ0FBcUQsZ0JBQXJELENBQXdFLEVBTHhFLHFCQU9BLENBQUssQ0FBQyxNQVBOLGtCQUZnRCxFQVlqRCxJQVppRCxDQVk1QyxFQVo0QyxDQVRwQixDQXVCaEMsUUFBUSxDQUFDLGdCQUFULENBQTBCLGdCQUExQixFQUE0QyxPQUE1QyxDQUFvRCxTQUFDLENBQUQsQ0FBc0IsSUFDcEUsQ0FBQSxDQUFRLENBQUcsSUFEeUQsQ0FFcEUsQ0FBYSxDQUFHLElBRm9ELENBR3hFLENBQU0sQ0FBQyxPQUFQLENBQWUsU0FBQyxDQUFELENBQVEsQ0FBUixDQUFjLENBQzNCLEdBQUksQ0FBTyxDQUFFLENBQUMsWUFBSCxDQUFnQixjQUFoQixDQUFQLElBQW1ELENBQUssQ0FBQyxJQUE3RCxPQUNBLENBQUEsQ0FBUSxDQUFHLENBRFgsQ0FFQSxDQUFhLENBQUcsQ0FGaEIsQ0FHRyxDQUFDLEdBQUssYUFBYSxDQUFDLEtBSHZCLEtBT0EsQ0FBQSxDQUFFLENBQUMsU0FBSCxDQUFhLEdBQWIsQ0FBaUIsb0JBQWpCLENBUEEsS0FJRSxDQUFBLENBQUUsQ0FBQyxTQUFILENBQWEsTUFBYixDQUFvQixvQkFBcEIsQ0FLSCxDQVZELENBSHdFLENBZXhFLENBQUUsQ0FBQyxZQUFILENBQWdCLFlBQWhCLENBQThCLENBQTlCLENBZndFLENBZ0J4RSxDQUFFLENBQUMsWUFBSCxDQUFnQixhQUFoQixDQUErQixDQUFRLENBQUMsTUFBeEMsQ0FoQndFLENBaUJ4RSxDQUFFLENBQUMsWUFBSCxDQUFnQixXQUFoQixDQUE2QixDQUFRLENBQUMsSUFBdEMsQ0FDRCxDQWxCRCxDQXZCZ0MsQ0EyQ2hDLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixlQUExQixDQUEyQyxnQkFBM0MsRUFBNkQsT0FBN0QsQ0FBcUUsU0FBQSxDQUFFLFFBQ3JFLENBQUEsQ0FBRSxDQUFDLGdCQUFILENBQW9CLE9BQXBCLENBQTZCLFNBQUEsQ0FBQyxDQUFJLENBQ2hDLGFBQWEsQ0FBRyxDQUNkLEtBQUssQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFTLFlBQVQsQ0FBc0IsWUFBdEIsQ0FETyxDQUVkLE1BQU0sQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFTLFlBQVQsQ0FBc0IsYUFBdEIsQ0FGTSxDQUdkLElBQUksQ0FBRSxDQUFDLENBQUMsTUFBRixDQUFTLFlBQVQsQ0FBc0IsY0FBdEIsRUFDRixDQUFDLENBQUMsTUFBRixDQUFTLFlBQVQsQ0FBc0IsY0FBdEIsQ0FERSxDQUVGLENBQUMsQ0FBQyxNQUFGLENBQVMsWUFBVCxDQUFzQixXQUF0QixDQUxVLENBTWQsSUFBSSxDQUFFLENBQUMsQ0FBQyxNQUFGLENBQVMsWUFBVCxDQUFzQixXQUF0QixDQU5RLENBRGdCLENBU2hDLGNBQWMsQ0FBQyxDQUFFLFFBQVEsQ0FBRSxVQUFaLENBQUQsQ0FDZixDQVZELENBRHFFLENBQXZFLENBYUQsQ0FFRCxRQUFTLENBQUEsU0FBVCxFQUFxQixPQUNuQixDQUFBLGNBQWMsRUFESyxDQUVuQixnQkFBZ0IsRUFGRyxDQUduQixrQkFBa0IsRUFIQyxDQUtmLE1BQU0sQ0FBQyxXQUFQLENBQXFCLE1BQU0sQ0FBQyxVQUxiLEVBTWpCLFFBQVEsQ0FBQyxjQUFULENBQXdCLFNBQXhCLEVBQW1DLFNBQW5DLENBQStDLDJCQU45QixDQU9qQixVQUFVLEdBUE8sS0FRakIsQ0FBQSxjQUFjLENBQUMsQ0FBRSxRQUFRLEdBQVYsQ0FBRCxDQVJHLE9BV25CLFVBQVUsR0FYUyxDQVluQixRQUFRLENBQUMsY0FBVCxDQUF3QixTQUF4QixFQUFtQyxTQUFuQyxDQUErQyw0QkFaNUIsQ0FhbkIsY0FBYyxDQUFDLENBQUUsUUFBUSxHQUFWLENBQUQsQ0FiSyxDQWNwQixDQUVELE1BQU0sQ0FBQyxnQkFBUCxDQUF3QixRQUF4QixDQUFrQyxVQUFNLENBQ3RDLFNBQVMsRUFDVixDQUZELEMsQ0FJQSxRQUFRLENBQUMsY0FBVCxDQUF3QixXQUF4QixFQUFxQyxnQkFBckMsQ0FBc0QsUUFBdEQsQ0FBZ0UsU0FBQSxDQUFDLENBQUksQ0FDbkUsV0FBVyxDQUFHLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FENEMsQ0FFbkUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsV0FBeEIsRUFBcUMsS0FBckMsQ0FBNkMsQ0FBQyxDQUFDLE1BQUYsQ0FBUyxLQUZhLENBSW5FLFNBQVMsRUFDVixDQUxELEMsQ0FPQSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxnQkFBdkMsQ0FBd0QsUUFBeEQsQ0FBa0UsU0FBQSxDQUFDLENBQUksQ0FDckUsb0JBQW9CLENBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFGLENBQVMsS0FBVixDQURvQyxDQUVyRSxRQUFRLENBQUMsY0FBVCxDQUF3QixhQUF4QixFQUF1QyxLQUF2QyxDQUErQyxDQUFDLENBQUMsTUFBRixDQUFTLEtBRmEsQ0FJckUsU0FBUyxFQUNWLENBTEQsQyxDQU9BLFNBQVMsRSxDQUVULFFBQVEsQ0FBQyxjQUFULENBQXdCLFlBQXhCLEVBQXNDLGdCQUF0QyxDQUF1RCxPQUF2RCxDQUFnRSxVQUFLLENBQzlELFVBQVUsQ0FBQyxTQURtRCxFQUluRSxVQUFVLENBQUMsTUFBWCxFQUNELENBTEQsQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGludGVydmFscyA9IFtcbiAgJ0MnLFxuICAnQyMnLFxuICAnRCcsXG4gICdEIycsXG4gICdFJyxcbiAgJ0YnLFxuICAnRiMnLFxuICAnRycsXG4gICdHIycsXG4gICdBJyxcbiAgJ0EjJyxcbiAgJ0InXG5dO1xuXG5sZXQgc2NhbGVzTWFwID0ge307XG5cbmNvbnN0IGRlZ3JlZXNNYXAgPSB7XG4gIG1ham9yOiB7IGlkOiAnbWFqb3InLCBkZWdyZWVzOiBbMiwgMiwgMSwgMiwgMiwgMiwgMV0gfSxcbiAgbWlub3I6IHsgaWQ6ICdtaW5vcicsIGRlZ3JlZXM6IFsyLCAxLCAyLCAyLCAxLCAyLCAyXSB9XG59O1xuXG5sZXQgc2VsZWN0ZWRLZXkgPSBpbnRlcnZhbHNbMF07XG5sZXQgc2VsZWN0ZWRTY2FsZURlZ3JlZXMgPSBkZWdyZWVzTWFwLm1ham9yO1xubGV0IHNlbGVjdGVkU2NhbGUgPSBudWxsO1xuXG5sZXQgc3RyaW5nc0FycmF5ID0gW107XG5sZXQgc2hhcGVOb3RlcyA9IFtdO1xubGV0IHNlbGVjdGVkU2hhcGUgPSB7IGluZGV4OiAwLCBmcmV0OiAwLCBudW1iZXI6IDAgfVxuXG5sZXQgaXNQb3J0cmFpdCA9IGZhbHNlO1xuXG5mdW5jdGlvbiBidWlsZFNjYWxlKHJvb3ROb3RlKSB7XG4gIGxldCBzY2FsZSA9IFtdO1xuXG4gIGxldCBpID0gaW50ZXJ2YWxzLmluZGV4T2Yocm9vdE5vdGUpO1xuICBmb3IgKGNvbnN0IGRlZ3JlZSBvZiBzZWxlY3RlZFNjYWxlRGVncmVlcy5kZWdyZWVzKSB7XG4gICAgaWYgKCFpbnRlcnZhbHNbaSArIGRlZ3JlZV0pIHtcbiAgICAgIGxldCBzdGFydEluZGV4ID0gaSA9PT0gaW50ZXJ2YWxzLmxlbmd0aCAtIDEgJiYgZGVncmVlID09PSAyID8gMSA6IDA7XG4gICAgICBpID0gc3RhcnRJbmRleDtcbiAgICAgIHNjYWxlID0gWy4uLnNjYWxlLCBpbnRlcnZhbHNbc3RhcnRJbmRleF1dO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgc2NhbGUgPSBbLi4uc2NhbGUsIGludGVydmFsc1tpICsgZGVncmVlXV07XG5cbiAgICBpICs9IGRlZ3JlZTtcbiAgfVxuICByZXR1cm4gc2NhbGU7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkU2NhbGVzTWFwKCkge1xuICBmb3IgKGxldCBpbnRlcnZhbCBvZiBpbnRlcnZhbHMpIHtcbiAgICBzY2FsZXNNYXAgPSB7XG4gICAgICAuLi5zY2FsZXNNYXAsXG4gICAgICBbaW50ZXJ2YWxdOiB7IGlkOiBpbnRlcnZhbCwgbm90ZXM6IGJ1aWxkU2NhbGUoaW50ZXJ2YWwpIH1cbiAgICB9O1xuICB9XG4gIHNlbGVjdGVkU2NhbGUgPSBzY2FsZXNNYXBbc2VsZWN0ZWRLZXldO1xufVxuXG5idWlsZFNjYWxlc01hcCgpO1xuXG5mdW5jdGlvbiBnZXROb3Rlc09mU3RyaW5nKHN0YXJ0aW5nTm90ZSkge1xuICBsZXQgbm90ZXMgPSBbXTtcbiAgbGV0IGkgPVxuICAgIGludGVydmFscy5pbmRleE9mKHN0YXJ0aW5nTm90ZSkgPT09IDExXG4gICAgICA/IDBcbiAgICAgIDogaW50ZXJ2YWxzLmluZGV4T2Yoc3RhcnRpbmdOb3RlKSArIDE7XG5cbiAgd2hpbGUgKG5vdGVzLmxlbmd0aCA8PSAxMSkge1xuICAgIGlmICghaW50ZXJ2YWxzW2ldKSB7XG4gICAgICBpID0gMDtcbiAgICB9XG4gICAgbm90ZXMgPSBbLi4ubm90ZXMsIGludGVydmFsc1tpXV07XG4gICAgaSsrO1xuICB9XG5cbiAgcmV0dXJuIG5vdGVzO1xufVxuXG5mdW5jdGlvbiBidWlsZEZyZXRib2FyZCh7IHBvcnRyYWl0IH0pIHtcbiAgY29uc3Qgc3RhbmRhcmRUdW5pbmdOb3RlcyA9IFtcbiAgICBpbnRlcnZhbHNbNF0sXG4gICAgaW50ZXJ2YWxzWzldLFxuICAgIGludGVydmFsc1syXSxcbiAgICBpbnRlcnZhbHNbN10sXG4gICAgaW50ZXJ2YWxzWzExXSxcbiAgICBpbnRlcnZhbHNbNF1cbiAgXTtcbiAgc3RyaW5nc0FycmF5ID0gW107XG4gIGNvbnN0IHN0YXJ0aW5nTm90ZXMgPVxuICAgIHBvcnRyYWl0ID09PSB0cnVlXG4gICAgICA/IFsuLi5zdGFuZGFyZFR1bmluZ05vdGVzXVxuICAgICAgOiBbLi4uc3RhbmRhcmRUdW5pbmdOb3Rlc10ucmV2ZXJzZSgpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICdmcmV0Qm9hcmQnXG4gICkuaW5uZXJIVE1MID0gYDxkaXYgY2xhc3M9XCJmcmV0cy1lZGdlXCI+JHtidWlsZEZyZXRzKCl9PC9kaXY+IFxuICAgICR7c3RhcnRpbmdOb3Rlc1xuICAgICAgLm1hcChcbiAgICAgICAgKHN0YXJ0aW5nTm90ZSwgc3RyaW5nTnVtYmVyKSA9PlxuICAgICAgICAgIGAke2J1aWxkU3RyaW5nKHN0YXJ0aW5nTm90ZSwgc3RyaW5nTnVtYmVyKX0gJHtcbiAgICAgICAgICAgIHN0cmluZ051bWJlciA8IDVcbiAgICAgICAgICAgICAgPyBgPGRpdiBjbGFzcz1cImZyZXRzXCI+JHtidWlsZEZyZXRzKHN0cmluZ051bWJlcil9PC9kaXY+YFxuICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfWBcbiAgICAgIClcbiAgICAgIC5qb2luKCcnKX0gXG4gICAgPGRpdiBjbGFzcz1cImZyZXRzLWVkZ2VcIj4ke2J1aWxkRnJldHMoKX08L2Rpdj5cbiAgICA8L2Rpdj5gO1xuXG4gIGxldCBzaGFwZXMgPSBbXTtcbiAgY29uc3Qgc2hhcGVOdW1iZXJzID0gWzEsIDcsIDYsIDUsIDQsIDMsIDJdO1xuICBsZXQgY3VycmVudFNoYXBlTnVtYmVyID0gMTtcblxuICBzaGFwZU5vdGVzID0gW107XG5cbiAgc3RyaW5nc0FycmF5WzBdLmZvckVhY2goKG5vdGUsIG5vdGVJbmRleCkgPT4ge1xuICAgIGNvbnN0IHJvb3ROb3RlSW5kZXggPSBzdHJpbmdzQXJyYXlbMF0uaW5kZXhPZihcbiAgICAgIHN0cmluZ3NBcnJheVswXS5maW5kKG5vdGUgPT4gbm90ZS5ub3RlID09PSBzZWxlY3RlZEtleSlcbiAgICApO1xuXG4gICAgbGV0IGN1cnJlbnRTaGFwZSA9IG51bGw7XG5cbiAgICBpZiAobm90ZUluZGV4ID09PSAwKSB7XG4gICAgICBjdXJyZW50U2hhcGVOdW1iZXIgPSBzaGFwZU51bWJlcnNbcm9vdE5vdGVJbmRleF07XG4gICAgICBjdXJyZW50U2hhcGUgPSB7XG4gICAgICAgIGZyZXQ6IG5vdGUuZnJldCxcbiAgICAgICAgbnVtYmVyOiBzaGFwZU51bWJlcnNbcm9vdE5vdGVJbmRleF0sXG4gICAgICAgIGluZGV4OiByb290Tm90ZUluZGV4LFxuICAgICAgICBub3RlOiBub3RlLm5vdGVcbiAgICAgIH07XG4gICAgICBzaGFwZXMgPSBbY3VycmVudFNoYXBlXTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaW5kZXggPSBzaGFwZU51bWJlcnMuaW5kZXhPZihjdXJyZW50U2hhcGVOdW1iZXIpIC0gMVxuICAgIGN1cnJlbnRTaGFwZU51bWJlciA9XG4gICAgICBzaGFwZU51bWJlcnNbaW5kZXhdO1xuICAgIGN1cnJlbnRTaGFwZSA9IHsgZnJldDogbm90ZS5mcmV0LCBudW1iZXI6IGN1cnJlbnRTaGFwZU51bWJlciwgaW5kZXgsIG5vdGU6IG5vdGUubm90ZSB9O1xuXG4gICAgaW5kZXggPSBzaGFwZU51bWJlcnMubGVuZ3RoIC0gMVxuICAgIGlmIChjdXJyZW50U2hhcGVOdW1iZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY3VycmVudFNoYXBlTnVtYmVyID0gc2hhcGVOdW1iZXJzW2luZGV4XTtcbiAgICAgIGN1cnJlbnRTaGFwZSA9IHsgZnJldDogbm90ZS5mcmV0LCBudW1iZXI6IGN1cnJlbnRTaGFwZU51bWJlciwgaW5kZXgsIG5vdGU6IG5vdGUubm90ZSB9O1xuICAgIH1cblxuICAgIHNoYXBlcyA9IFsuLi5zaGFwZXMsIGN1cnJlbnRTaGFwZV07XG4gIH0pO1xuXG4gIHNoYXBlcy5mb3JFYWNoKChzaGFwZSwgc2hhcGVJbmRleCkgPT4ge1xuICAgIGxldCBzdHJpbmdzID0gcG9ydHJhaXQgPyBbLi4uc3RyaW5nc0FycmF5XSA6IFsuLi5zdHJpbmdzQXJyYXldLnJldmVyc2UoKTtcbiAgICBzdHJpbmdzLm1hcCgoc3RyaW5nLCBzdHJpbmdOdW1iZXIpID0+IHtcbiAgICAgIGxldCBub3RlcyA9IFtdO1xuICAgICAgbGV0IG9uUm9vdEZyZXQgPSB0cnVlO1xuICAgICAgbGV0IG5vdGVPblNoYXBlU3RhcnRGcmV0ID0gc3RyaW5nLmluZGV4T2YoXG4gICAgICAgIHN0cmluZy5maW5kKG5vdGUgPT4gbm90ZS5mcmV0ID09PSBzaGFwZS5mcmV0KVxuICAgICAgKTtcbiAgICAgIGlmIChub3RlT25TaGFwZVN0YXJ0RnJldCA9PT0gLTEpIHtcbiAgICAgICAgb25Sb290RnJldCA9IGZhbHNlO1xuICAgICAgICBub3RlT25TaGFwZVN0YXJ0RnJldCA9IHN0cmluZy5pbmRleE9mKFxuICAgICAgICAgIHN0cmluZy5maW5kKG5vdGUgPT4gbm90ZS5mcmV0ID09PSBzaGFwZS5mcmV0ICsgMSlcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0cmluZ051bWJlciA9PT0gNCB8fCBzdHJpbmdOdW1iZXIgPT09IDUpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBvblJvb3RGcmV0XG4gICAgICAgICAgPyBub3RlT25TaGFwZVN0YXJ0RnJldCArIDFcbiAgICAgICAgICA6IG5vdGVPblNoYXBlU3RhcnRGcmV0O1xuICAgICAgICBub3RlcyA9IHN0cmluZy5zbGljZShzdGFydCwgc3RhcnQgKyAzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5vdGVzID0gc3RyaW5nLnNsaWNlKG5vdGVPblNoYXBlU3RhcnRGcmV0LCBub3RlT25TaGFwZVN0YXJ0RnJldCArIDMpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXNoYXBlTm90ZXNbc2hhcGVJbmRleF0pIHtcbiAgICAgICAgc2hhcGVOb3Rlc1tzaGFwZUluZGV4XSA9IG5vdGVzO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzaGFwZU5vdGVzW3NoYXBlSW5kZXhdID0gWy4uLnNoYXBlTm90ZXNbc2hhcGVJbmRleF0sIC4uLm5vdGVzXTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYnVpbGRTaGFwZVNlbGVjdChzaGFwZXMpO1xuXG4gIHNoYXBlTm90ZXNbc2VsZWN0ZWRTaGFwZS5pbmRleF0ubWFwKG5vdGUgPT4ge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5vdGUuaWQpLmNsYXNzTmFtZSA9ICdoaWdobGlnaHQnO1xuICB9KTtcbn1cblxuY29uc3QgYnVpbGRGcmV0cyA9IHN0cmluZ051bWJlciA9PiB7XG4gIGxldCBmcmV0cyA9IGBgO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspIHtcbiAgICBmcmV0cyArPSBgPGRpdiBjbGFzcz1cImZyZXRcIj4ke1xuICAgICAgKHN0cmluZ051bWJlciA9PT0gMiAmJiAoaSA9PT0gNCB8fCBpID09PSA2IHx8IGkgPT09IDgpKSB8fFxuICAgICAgKGkgPT09IDExICYmIChzdHJpbmdOdW1iZXIgPT09IDAgfHwgc3RyaW5nTnVtYmVyID09PSA0KSlcbiAgICAgICAgPyBgPGRpdiBjbGFzcz1cImZyZXQtZG90XCI+PC9kaXY+YFxuICAgICAgICA6ICcnXG4gICAgfTwvZGl2PmA7XG4gIH1cbiAgcmV0dXJuIGZyZXRzO1xufTtcblxuY29uc3QgYnVpbGRTdHJpbmcgPSAoc3RhcnRpbmdOb3RlLCBzdHJpbmdOdW1iZXIpID0+IHtcbiAgY29uc3Qgc3RyaW5nTm90ZXMgPSBnZXROb3Rlc09mU3RyaW5nKHN0YXJ0aW5nTm90ZSkubWFwKChub3RlLCBmcmV0KSA9PiAoe1xuICAgIGlkOiBzdHJpbmdOdW1iZXIgKyBub3RlLFxuICAgIG5vdGUsXG4gICAgc3RyaW5nTnVtYmVyLFxuICAgIGZyZXRcbiAgfSkpO1xuICBzdHJpbmdzQXJyYXkgPSBbXG4gICAgLi4uc3RyaW5nc0FycmF5LFxuICAgIHN0cmluZ05vdGVzLmZpbHRlcihub3RlID0+IHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZS5ub3RlKSlcbiAgXTtcblxuICBjb25zdCBsb3dFID0gaXNQb3J0cmFpdCA/IDAgOiA1O1xuXG4gIHJldHVybiBgPGRpdiBjbGFzcz1cImd1aXRhci1zdHJpbmdcIj4ke3N0cmluZ05vdGVzXG4gICAgLm1hcCgobm90ZSwgbm90ZUluZGV4KSA9PlxuICAgICAgc3RyaW5nTnVtYmVyICE9PSBsb3dFXG4gICAgICAgID8gYDxkaXYgY2xhc3M9XCJub3RlXCI+JHtcbiAgICAgICAgICAgIHNlbGVjdGVkU2NhbGUubm90ZXMuaW5jbHVkZXMobm90ZS5ub3RlKVxuICAgICAgICAgICAgICA/IGA8ZGl2IGNsYXNzPVwibm90ZS10ZXh0LWJhY2tkcm9wXCI+PC9kaXY+PHNwYW4gY2xhc3M9XCJub3RlLXRleHRcIj48cCBpZD0ke25vdGUuaWR9PiR7bm90ZS5ub3RlfTwvcD48L3NwYW4+YFxuICAgICAgICAgICAgICA6ICcnXG4gICAgICAgICAgfTwvZGl2PmBcbiAgICAgICAgOiBgPGRpdiBjbGFzcz1cInJvb3Qtbm90ZVwiPiR7XG4gICAgICAgICAgICBzZWxlY3RlZFNjYWxlLm5vdGVzLmluY2x1ZGVzKG5vdGUubm90ZSlcbiAgICAgICAgICAgICAgPyBgPGJ1dHRvbiByb290Tm90ZUZyZXQ9XCIke25vdGUuZnJldH1cIiBjbGFzcz1cInJvb3Qtbm90ZS10ZXh0LWJhY2tkcm9wIHNoYXBlLXNlbGVjdCByb290LW5vdGUtc2hhcGUtc2VsZWN0ICR7c2VsZWN0ZWRTaGFwZS5ub3RlID09PSBub3RlLm5vdGU/ICdzZWxlY3RlZC1yb290LW5vdGUnIDogJyd9XCI+PC9idXR0b24+PHNwYW4gY2xhc3M9XCJyb290LW5vdGUtdGV4dFwiPjxwIGlkPSR7bm90ZS5pZH0+JHtub3RlLm5vdGV9PC9wPjwvc3Bhbj5gXG4gICAgICAgICAgICAgIDogJydcbiAgICAgICAgICB9PC9kaXY+YFxuICAgIClcbiAgICAuam9pbignJyl9PC9kaXY+YDtcbn07XG5cbmZ1bmN0aW9uIGJ1aWxkS2V5U2VsZWN0b3IoKSB7XG4gIGxldCBvcHRpb25zID0gW107XG4gIGZvciAoY29uc3Qga2V5TmFtZSBpbiBzY2FsZXNNYXApIHtcbiAgICBvcHRpb25zID0gWy4uLm9wdGlvbnMsIGA8b3B0aW9uIHZhbHVlPVwiJHtrZXlOYW1lfVwiPiR7a2V5TmFtZX08L29wdGlvbj5gXTtcbiAgfVxuICBsZXQga2V5U2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tleVNlbGVjdCcpO1xuICBrZXlTZWxlY3QuaW5uZXJIVE1MID0gb3B0aW9ucy5qb2luKCk7XG4gIGtleVNlbGVjdC52YWx1ZSA9IHNlbGVjdGVkS2V5O1xufVxuXG5mdW5jdGlvbiBidWlsZFNjYWxlU2VsZWN0b3IoKSB7XG4gIGxldCBvcHRpb25zID0gW107XG4gIGZvciAoY29uc3Qgc2NhbGVOYW1lIGluIGRlZ3JlZXNNYXApIHtcbiAgICBvcHRpb25zID0gW1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIGA8b3B0aW9uIHZhbHVlPVwiJHtzY2FsZU5hbWV9XCI+JHtzY2FsZU5hbWV9PC9vcHRpb24+YFxuICAgIF07XG4gIH1cbiAgbGV0IHNjYWxlU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjYWxlU2VsZWN0Jyk7XG4gIHNjYWxlU2VsZWN0LmlubmVySFRNTCA9IG9wdGlvbnMuam9pbigpO1xuICBzY2FsZVNlbGVjdC52YWx1ZSA9IHNlbGVjdGVkU2NhbGVEZWdyZWVzLmlkO1xufVxuXG5mdW5jdGlvbiBidWlsZFNoYXBlU2VsZWN0KHNoYXBlcykge1xuXG4gIHNoYXBlcy5mb3JFYWNoKChzaGFwZSwgc2hhcGVJbmRleCk9PntcbiAgICBpZihOdW1iZXIoc2hhcGVJbmRleCk9PT1OdW1iZXIoc2VsZWN0ZWRTaGFwZS5pbmRleCkpIHtcbiAgICAgIHNlbGVjdGVkU2hhcGUgPSBzaGFwZVxuICAgICAgc2VsZWN0ZWRTaGFwZS5pbmRleCA9IHNoYXBlSW5kZXhcbiAgICB9XG4gIH0pXG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXBlLXNlbGVjdCcpLmlubmVySFRNTCA9IHNoYXBlc1xuICAgIC5tYXAoXG4gICAgICAoc2hhcGUsIHNoYXBlSW5kZXgpID0+XG4gICAgICAgIGA8YnV0dG9uIFxuICAgIHNoYXBlSW5kZXg9JHtzaGFwZUluZGV4fVxuICAgIHNoYXBlRnJldD0ke3NoYXBlLmZyZXR9IFxuICAgIGNsYXNzPVwic2hhcGUtc2VsZWN0ICR7XG4gICAgICBOdW1iZXIoc2VsZWN0ZWRTaGFwZS5pbmRleCkgPT09IE51bWJlcihzaGFwZUluZGV4KSA/ICdzZWxlY3RlZC1zaGFwZScgOiAnJ1xuICAgIH1cIj5cbiAgICAke3NoYXBlLm51bWJlcn1cbiAgPC9idXR0b24+YFxuICAgIClcbiAgICAuam9pbignJyk7XG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW3Jvb3ROb3RlRnJldF0nKS5mb3JFYWNoKChlbCwgZWxlbWVudEluZGV4KSA9PiB7XG4gICAgbGV0IHRoZVNoYXBlID0gbnVsbFxuICAgIGxldCB0aGVTaGFwZUluZGV4ID0gbnVsbFxuICAgIHNoYXBlcy5mb3JFYWNoKChzaGFwZSwgaSkgPT4ge1xuICAgICAgaWYgKE51bWJlcihlbC5nZXRBdHRyaWJ1dGUoJ3Jvb3ROb3RlRnJldCcpKSAhPT0gTnVtYmVyKHNoYXBlLmZyZXQpKSByZXR1cm5cbiAgICAgIHRoZVNoYXBlID0gc2hhcGVcbiAgICAgIHRoZVNoYXBlSW5kZXggPSBpXG4gICAgICBpZihpICE9PSBzZWxlY3RlZFNoYXBlLmluZGV4KXtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQtcm9vdC1ub3RlJylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9IFxuICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcm9vdC1ub3RlJylcbiAgICAgIFxuICAgIH0pO1xuICAgXG4gICAgZWwuc2V0QXR0cmlidXRlKCdzaGFwZUluZGV4JywgdGhlU2hhcGVJbmRleCk7XG4gICAgZWwuc2V0QXR0cmlidXRlKCdzaGFwZU51bWJlcicsIHRoZVNoYXBlLm51bWJlcilcbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ3NoYXBlTm90ZScsIHRoZVNoYXBlLm5vdGUgKSAgIFxuICB9KTtcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc2hhcGUtc2VsZWN0JywgJ1tyb290Tm90ZUZyZXRdJykuZm9yRWFjaChlbCA9PlxuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBzZWxlY3RlZFNoYXBlID0ge1xuICAgICAgICBpbmRleDogZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdzaGFwZUluZGV4JyksXG4gICAgICAgIG51bWJlcjogZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdzaGFwZU51bWJlcicpLFxuICAgICAgICBmcmV0OiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3Jvb3ROb3RlRnJldCcpXG4gICAgICAgICAgPyBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3Jvb3ROb3RlRnJldCcpXG4gICAgICAgICAgOiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NoYXBlRnJldCcpLFxuICAgICAgICBub3RlOiBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ3NoYXBlTm90ZScpXG4gICAgICB9O1xuICAgICAgYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdDogaXNQb3J0cmFpdCB9KTtcbiAgICB9KVxuICApO1xufVxuXG5mdW5jdGlvbiByZURyYXdBcHAoKSB7XG4gIGJ1aWxkU2NhbGVzTWFwKCk7XG4gIGJ1aWxkS2V5U2VsZWN0b3IoKTtcbiAgYnVpbGRTY2FsZVNlbGVjdG9yKCk7XG5cbiAgaWYgKHdpbmRvdy5pbm5lckhlaWdodCA+IHdpbmRvdy5pbm5lcldpZHRoKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3dyYXBwZXInKS5jbGFzc05hbWUgPSAnYXBwLXdyYXBwZXIgcG9ydHJhaXQtbW9kZSc7XG4gICAgaXNQb3J0cmFpdCA9IHRydWU7XG4gICAgYnVpbGRGcmV0Ym9hcmQoeyBwb3J0cmFpdDogdHJ1ZSB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgaXNQb3J0cmFpdCA9IGZhbHNlO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd3JhcHBlcicpLmNsYXNzTmFtZSA9ICdhcHAtd3JhcHBlciBsYW5kc2NhcGUtbW9kZSc7XG4gIGJ1aWxkRnJldGJvYXJkKHsgcG9ydHJhaXQ6IGZhbHNlIH0pO1xufVxuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4ge1xuICByZURyYXdBcHAoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2V5U2VsZWN0JykuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gIHNlbGVjdGVkS2V5ID0gZS50YXJnZXQudmFsdWU7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdrZXlTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZVNlbGVjdCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICBzZWxlY3RlZFNjYWxlRGVncmVlcyA9IGRlZ3JlZXNNYXBbZS50YXJnZXQudmFsdWVdO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhbGVTZWxlY3QnKS52YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xuXG4gIHJlRHJhd0FwcCgpO1xufSk7XG5cbnJlRHJhd0FwcCgpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZnVsbFNjcmVlbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGlmICghc2NyZWVuZnVsbC5pc0VuYWJsZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc2NyZWVuZnVsbC50b2dnbGUoKTtcbn0pO1xuIl19