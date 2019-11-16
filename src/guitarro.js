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

const steps = [2, 2, 1, 2, 2, 2, 1];

function buildScale(rootNote) {
  let scale = [];

  let i = intervals.indexOf(rootNote);
  for (const step of steps) {
    if (!intervals[i + step]) {
      let startIndex = i === intervals.length - 1 && step === 2 ? 1 : 0;
      i = startIndex;
      scale = [...scale, intervals[startIndex]];
      continue;
    }

    scale = [...scale, intervals[i + step]];

    i += step;
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
}

buildScalesMap();

var selectedScale = scalesMap['C'];

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
  for (const scaleName in scalesMap) {
    options = [
      ...options,
      `<option value="${scaleName}">${scaleName}</option>`
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
  selectedScale = scalesMap[e.target.value];
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
