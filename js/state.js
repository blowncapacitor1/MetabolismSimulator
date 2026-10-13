export const cellState = {
  atp: 0,
  adp: 0,
  nad: 0,
  nadh: 0,
  Fumarate: 0,
  Succinate: 0,
  h: 0,
  h2o: 0,
  o2: 0,
  co2: 0,
  pyruvate: 0,
  matrixprotons: 0,
  imsprotons: 0,
  QH2count: 0,
  MatrixQstate: 0,
  cytochrome: 0,
  cIVcycle: 0,
  imshalfchannel: 8,
  mathalfchannel: 1,
  synthaserunstate:0,
  synthaserotation: 0,
  complex4state: 0,
};

// ---- Complex IV (cytochrome c oxidase) catalytic cycle ----
// Intermediates, in order:  R -> A -> Pm -> Pr -> F -> Oh -> Eh -> R
export const COMPLEX4_CYCLE = ['R', 'A', 'Pm', 'Pr', 'F', 'Oh', 'Eh'];

// Cytochrome c consumed by the step that leaves each intermediate.
export const COMPLEX4_CYTC_COST = { R: 0, A: 0, Pm: 1, Pr: 0, F: 1, Oh: 1, Eh: 1 };

// Only R and Oh are gated. A press from R must be able to afford the whole run to Oh,
// and a press from Oh the whole run back to R, so the cycle can never stall half-way.
export const COMPLEX4_HALF_CYCLES = {
  R: { stopAt: 'Oh' },
  Oh: { stopAt: 'R' },
};

// Live Complex IV state.
export const complex4 = {
  intermediate: 'R', // current intermediate
  running: false,    // true while a run is in progress
};

// Cytochrome c needed to carry a run from `from` through to its stopping point.
export function complex4CytCNeeded(from = complex4.intermediate) {
  const stopAt = COMPLEX4_HALF_CYCLES[from]?.stopAt;
  if (!stopAt) return Infinity;

  let needed = 0;
  let i = COMPLEX4_CYCLE.indexOf(from);
  while (COMPLEX4_CYCLE[i] !== stopAt) {
    needed += COMPLEX4_CYTC_COST[COMPLEX4_CYCLE[i]];
    i = (i + 1) % COMPLEX4_CYCLE.length;
  }
  return needed;
}

export const strings = {
  rotation: "000",
  beta1: "O:",
  beta2: "L:",
  beta3: "T:",
  betatext1: "EMPTY",
  betatext2: "ADP+P\u1D62",
  betatext3: "ATP",
}

export function updateDashboard(svgDoc) {
  const dashboardDocument = svgDoc || document;
  const rows = dashboardDocument.querySelectorAll('.table-wrapper tbody tr');

  // Table labels are lowercased ("Fumarate" -> "fumarate"), but some cellState
  // keys are capitalised (Fumarate, Succinate), so look keys up ignoring case.
  const keyLookup = {};
  Object.keys(cellState).forEach((key) => {
    keyLookup[key.toLowerCase()] = key;
  });

  rows.forEach((row) => {
    for (let index = 0; index < row.cells.length - 1; index += 2) {
      const molecule = row.cells[index].textContent;
      const stateKey = keyLookup[molecule.toLowerCase().replace(/[^a-z0-9]/g, '')];
      const valueCell = row.cells[index + 1];

      if (stateKey !== undefined) {
        valueCell.textContent = cellState[stateKey];
      }
    }
  });
}
