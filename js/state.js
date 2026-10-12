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

  rows.forEach((row) => {
    for (let index = 0; index < row.cells.length - 1; index += 2) {
      const molecule = row.cells[index].textContent;
      const stateKey = molecule.toLowerCase().replace(/[^a-z0-9]/g, '');
      const valueCell = row.cells[index + 1];

      if (cellState[stateKey] !== undefined) {
        valueCell.textContent = cellState[stateKey];
      }
    }
  });
};




