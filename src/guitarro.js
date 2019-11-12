const intervals = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B"
];

const standardTuningNotes = [
  intervals[4],
  intervals[9],
  intervals[2],
  intervals[7],
  intervals[11],
  intervals[4]
].reverse();

const scales = {
  aMajor: {
    name: "A Maj",
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
    name: "C Maj",
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
    name: "F# Maj",
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
    name: "G Maj",
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

var selectedScale = scales["cMajor"];

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

function buildFretboard() {
  document.getElementById("fretBoard").innerHTML = standardTuningNotes
    .map(startingNote => getNotesOfString(startingNote))
    .map(
      (guitarString, stringNumber) =>
        `<div class="guitar-string">
          <span class="string-graphic"></span>
          ${guitarString
            .map(
              (note, noteNumber) =>
                `<div class="fret"> 
                ${
                  selectedScale.notes.includes(note)
                    ? `<span class='note'>
                      <p>${note}</p>
                    </span>`
                    : ""
                } 
                ${
                  stringNumber === 5
                    ? `<span class="fret-number">${noteNumber + 1}</span>`
                    : ""
                }
                ${
                  stringNumber === 3 &&
                  (noteNumber === 4 || noteNumber === 6 || noteNumber === 8)
                    ? `<span class="fret-dot"></span>`
                    : ""
                }

                ${
                  noteNumber === 11 &&
                  (stringNumber === 1 || stringNumber === 5)
                    ? `<span class="fret-dot"></span>`
                    : ""
                }
              </div>`
            )
            .join("")}
        </div>`
    )
    .join("");
}

function buildNoteSelector() {
  var options = [];
  for (const scaleName in scales) {
    options = [
      ...options,
      `<option value="${scaleName}">${scales[scaleName].name}</option>`
    ];
  }
  var scaleSelect = document.createElement("select");
  scaleSelect.innerHTML = options.join();
  scaleSelect.value = "cMajor";

  scaleSelect.addEventListener("change", e => {
    selectedScale = scales[e.target.value];
    buildFretboard();
  });

  document.body.appendChild(scaleSelect);
}

const fretBoardWrapper = document.createElement("div");
fretBoardWrapper.innerHTML =
  '<div id="fretBoard" class="guitar-strings" ></div>';
document.body.appendChild(fretBoardWrapper);
buildNoteSelector();
buildFretboard();
