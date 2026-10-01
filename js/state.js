export const cellState = {
  atp: 0,
  adp: 0,
  nad: 0,
  nadh: 0,
  fad: 0,
  fadh2: 0,
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
  //F1state: 0,
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
  /*

  FOR USE IN FUTURE VERSIONS
  if (!svgDoc) return;

  const elements = {
    atp: svgDoc.getElementById('atp-val'),
    adp: svgDoc.getElementById('adp-val'),
    nad: svgDoc.getElementById('nad-val'),
    nadh: svgDoc.getElementById('nadh-val'),
    fad: svgDoc.getElementById('fad-val'),
    fadh2: svgDoc.getElementById('fadh2-val'),
    h2o: svgDoc.getElementById('h2o-val'),
    o2: svgDoc.getElementById('o2-val'),
    co2: svgDoc.getElementById('co2-val'),
    h: svgDoc.getElementById('h+-val'),
    pyruvate: svgDoc.getElementById('pyruvateval'),
  };
  
  for (const [key, element] of Object.entries(elements)) {
    if (element && cellState[key] !== undefined) {
      element.textContent = cellState[key];
    }
  }
    */
};




