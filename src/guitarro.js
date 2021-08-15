const intervals = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B'
];

const standardTuningNotes = [
  intervals[4],
  intervals[9],
  intervals[2],
  intervals[7],
  intervals[11],
  intervals[4]
];

let scalesMap = {};

const degreesMap = {
  major: { id: 'major', degrees: [2, 2, 1, 2, 2, 2, 1] },
  minor: { id: 'minor', degrees: [2, 1, 2, 2, 1, 2, 2] }
};

let selectedKey = intervals[0];
let selectedScaleDegrees = degreesMap.major;
let selectedScale = null;

let stringsArray = [];
let shapeNotes = []
let selectedShape = 0

let isPortrait = false

function buildScale(rootNote) {
  let scale = [];

  let i = intervals.indexOf(rootNote);
  for (const degree of selectedScaleDegrees.degrees) {
    if (!intervals[i + degree]) {
      let startIndex = i === intervals.length - 1 && degree === 2 ? 1 : 0;
      i = startIndex;
      scale = [...scale, intervals[startIndex]];
      continue;
    }

    scale = [...scale, intervals[i + degree]];

    i += degree;
  }
  return scale;
}

function buildScalesMap() {
  for (let interval of intervals) {
    scalesMap = {
      ...scalesMap,
      [interval]: { id: interval, notes: buildScale(interval) }
    };
  }
  selectedScale = scalesMap[selectedKey];
}

buildScalesMap();

function getNotesOfString(startingNote) {
  let notes = [];
  let i =
    intervals.indexOf(startingNote) === 11
      ? 0
      : intervals.indexOf(startingNote) + 1;

  while (notes.length <= 11) {
    if (!intervals[i]) {
      i = 0;
    }
    notes = [...notes, intervals[i]];
    i++;
  }

  return notes;
}

function buildFretboard({ portrait }) {
  stringsArray = [];
  const startingNotes =
    portrait === true
      ? [...standardTuningNotes]
      : [...standardTuningNotes].reverse();

  document.getElementById(
    'fretBoard'
  ).innerHTML = `<div class="frets-edge">${buildFrets()}</div> 
    ${startingNotes
      .map(
        (startingNote, stringNumber) =>
          `${buildString(startingNote, stringNumber)} ${
            stringNumber < 5
              ? `<div class="frets">${buildFrets(stringNumber)}</div>`
              : ''
          }`
      )
      .join('')} 
    <div class="frets-edge">${buildFrets()}</div>
    </div>`;

  let shapes = [];
  const shapeNumbers = [1, 7, 6, 5, 4, 3, 2];
  let currentShape = 1;

  shapeNotes = []

  stringsArray[0].map((note, noteIndex) => {
    const rootNoteIndex = stringsArray[0].indexOf(
      stringsArray[0].find(note => note.note === selectedKey)
    );

    if (noteIndex === 0) {
      currentShape = shapeNumbers[rootNoteIndex];
      shapes = [{ fret: note.fret, shapeNumber: currentShape }];
      return;
    }

    currentShape = { fret: note.fret, shapeNumber: shapeNumbers[shapeNumbers.indexOf(currentShape) - 1] };

    if (currentShape === undefined) {
      currentShape = { fret: note.fret, shapeNumber: shapeNumbers[shapeNumbers.length - 1] }
    }

    shapes = [...shapes, currentShape];
  });

  shapes.map((shape, shapeIndex) => {
    let strings = portrait? [...stringsArray] : [...stringsArray].reverse()
    strings.map((string, stringNumber) => {
      let notes = [];
      let onRootFret = true
      let noteOnShapeStartFret = string.indexOf(string.find(note=>note.fret === shape.fret))
      if(noteOnShapeStartFret === -1){
        onRootFret = false
        noteOnShapeStartFret = string.indexOf(string.find(note=>note.fret === shape.fret + 1))
      }
      
      if (stringNumber === 4 || stringNumber === 5) {
        const start = onRootFret? noteOnShapeStartFret + 1 : noteOnShapeStartFret
        notes = string.slice(start, start + 3);
      } else {
        notes = string.slice(noteOnShapeStartFret, noteOnShapeStartFret + 3);
      }

      if (!shapeNotes[shapeIndex]) {
        shapeNotes[shapeIndex] = notes;
        return;
      }
      shapeNotes[shapeIndex] = [
        ...shapeNotes[shapeIndex],
        ...notes
      ];
    });
  });

  shapeNotes[selectedShape].map(note => {
    document.getElementById(note.id).className = 'highlight';
  });
}

const buildFrets = stringNumber => {
  let frets = ``;
  for (let i = 0; i < 12; i++) {
    frets += `<div class="fret">${
      (stringNumber === 2 && (i === 4 || i === 6 || i === 8)) ||
      (i === 11 && (stringNumber === 0 || stringNumber === 4))
        ? `<div class="fret-dot"></div>`
        : ''
    }</div>`;
  }
  return frets;
};

const buildString = (startingNote, stringNumber) => {
  const stringNotes = getNotesOfString(startingNote).map((note, fret) => ({
    id: stringNumber + note,
    note,
    stringNumber,
    fret
  }));
  stringsArray = [
    ...stringsArray,
    stringNotes.filter(note => selectedScale.notes.includes(note.note))
  ];

  return `<div class="guitar-string">${stringNotes
    .map(
      note =>
        `<div class="note">${
          selectedScale.notes.includes(note.note)
            ? `<div class="note-text-backdrop"></div><span class="note-text"><p  id=${note.id}>${note.note}</p></span>`
            : ''
        }</div>`
    )
    .join('')}</div>`;
};

function buildKeySelector() {
  let options = [];
  for (const keyName in scalesMap) {
    options = [...options, `<option value="${keyName}">${keyName}</option>`];
  }
  let keySelect = document.getElementById('keySelect');
  keySelect.innerHTML = options.join();
  keySelect.value = selectedKey;
}

function buildScaleSelector() {
  let options = [];
  for (const scaleName in degreesMap) {
    options = [
      ...options,
      `<option value="${scaleName}">${scaleName}</option>`
    ];
  }
  let scaleSelect = document.getElementById('scaleSelect');
  scaleSelect.innerHTML = options.join();
  scaleSelect.value = selectedScaleDegrees.id;
}

function reDrawApp() {
  buildScalesMap();
  buildKeySelector();
  buildScaleSelector();

  if (window.innerHeight > window.innerWidth) {
    document.getElementById('wrapper').className = 'app-wrapper portrait-mode';
    isPortrait = true
    buildFretboard({ portrait: true });
    return;
  }
  isPortrait = false
  document.getElementById('wrapper').className = 'app-wrapper landscape-mode';
  buildFretboard({ portrait: false });
}

window.addEventListener('resize', () => {
  reDrawApp();
});

document.getElementById('keySelect').addEventListener('change', e => {
  selectedKey = e.target.value;
  document.getElementById('keySelect').value = e.target.value;

  reDrawApp();
});

document.getElementById('scaleSelect').addEventListener('change', e => {
  selectedScaleDegrees = degreesMap[e.target.value];
  document.getElementById('scaleSelect').value = e.target.value;

  reDrawApp();
});

reDrawApp();

document.getElementById('fullScreen').addEventListener('click', e => {
  if (!screenfull.isEnabled) {
    return;
  }
  screenfull.toggle();
});

document.querySelectorAll('.shapeSelect').forEach(el=>el.addEventListener('click', e=>{
  selectedShape = e.target.getAttribute('shapeIndex') 
  buildFretboard(isPortrait)
}))
