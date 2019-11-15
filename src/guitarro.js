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

const scales = {
  aMajor: {
    id: 'aMajor',
    name: 'A Maj',
    notes: [
      intervals[9],
      intervals[11],
      intervals[1],
      intervals[2],
      intervals[4],
      intervals[6],
      intervals[8]
    ]
  },
  cMajor: {
    id: 'cMajor',
    name: 'C Maj',
    notes: [
      intervals[0],
      intervals[2],
      intervals[4],
      intervals[5],
      intervals[7],
      intervals[9],
      intervals[11]
    ]
  },
  fSharpMajor: {
    id: 'fSharpMajor',
    name: 'F# Maj',
    notes: [
      intervals[6],
      intervals[8],
      intervals[10],
      intervals[11],
      intervals[1],
      intervals[3],
      intervals[5]
    ]
  },
  gMajor: {
    id: 'gMajor',
    name: 'G Maj',
    notes: [
      intervals[7],
      intervals[9],
      intervals[11],
      intervals[0],
      intervals[2],
      intervals[4],
      intervals[6]
    ]
  }
};

var selectedScale = scales['cMajor'];

function getNotesOfString(startingNote) {
  var notes = [];
  var i =
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
          `${buildString(startingNote)} ${
            stringNumber < 5
              ? `<div class="frets">${buildFrets(stringNumber)}</div>`
              : ''
          }`
      )
      .join('')} 
    <div class="frets-edge">${buildFrets()}</div>
    </div>`;
}

const buildFrets = stringNumber => {
  let frets = ``;
  for (var i = 0; i < 12; i++) {
    frets += `<div class="fret">${
      (stringNumber === 2 && (i === 4 || i === 6 || i === 8)) ||
      (i === 11 && (stringNumber === 0 || stringNumber === 4))
        ? `<div class="fret-dot"></div>`
        : ''
    }</div>`;
  }
  return frets;
};

const buildString = startingNote =>
  `<div class="guitar-string">${getNotesOfString(startingNote)
    .map(
      note =>
        `<div class="note">${
          selectedScale.notes.includes(note)
            ? `<div class="note-text-backdrop"></div><span class="note-text"><p>${note}</p></span>`
            : ''
        }</div>`
    )
    .join('')}</div>`;

function buildNoteSelector({ portrait }) {
  var options = [];
  for (const scaleId in scales) {
    options = [
      ...options,
      `<option value="${scaleId}">${scales[scaleId].name}</option>`
    ];
  }
  var scaleSelect = document.getElementById('noteSelect');
  scaleSelect.innerHTML = options.join();
  scaleSelect.value = selectedScale.id;
}

function reDrawApp() {
  if (window.innerHeight > window.innerWidth) {
    document.getElementById('wrapper').className = 'app-wrapper portrait-mode';
    buildNoteSelector({ portrait: true });
    buildFretboard({ portrait: true });
    return;
  }
  document.getElementById('wrapper').className = 'app-wrapper landscape-mode';
  buildNoteSelector({ portrait: false });
  buildFretboard({ portrait: false });
}

window.addEventListener('resize', () => {
  reDrawApp();
});

document.getElementById('noteSelect').addEventListener('change', e => {
  selectedScale = scales[e.target.value];
  document.getElementById('noteSelect').value = e.target.value;

  reDrawApp();
});

reDrawApp();

document.getElementById('fullScreen').addEventListener('click', e => {
  if (!screenfull.isEnabled) {
    return;
  }
  screenfull.toggle();
});
