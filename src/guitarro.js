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
    buildFretboard({ portrait: true });
    return;
  }
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
