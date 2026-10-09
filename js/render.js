// Puts both the model state and the SVG back to their starting appearance.
export function resetETCState(ctx) {
  const { el, ui, state: cellState, strings, runtime } = ctx;
  const { setElementActive, isVisible } = ui;
  const { buttons, synthase, particles, paths, counters, cringBaseTransform } = el;
  const complex3Btn = buttons.III;
  const complex4Btn = buttons.IV;
  const complex5Btn = buttons.V;
  const imsCounter = counters.ims;
  const matrixCounter = counters.matrix;
  const QH2counter = counters.QH2;
  const cytCcounter = counters.cytC;

  cellState.matrixprotons = 0;
  cellState.imsprotons = 0;
  cellState.QH2count = 0;
  cellState.cytochrome = 0;
  cellState.imshalfchannel = 1;
  cellState.mathalfchannel = 3;
  strings.rotation = "000";
  strings.beta1 = "O:";
  strings.beta2 = "L:";
  strings.beta3 = "T:";
  strings.betatext1 = "EMPTY";
  strings.betatext2 = "ADP+P\u1D62";
  strings.betatext3 = "ATP";
  runtime.cringRotation = 0;
  if (cringBaseTransform) {
    synthase.cring.setAttribute('transform', cringBaseTransform);
  } else {
    synthase.cring.removeAttribute('transform');
  }
  matrixCounter.textContent = cellState.matrixprotons;
  imsCounter.textContent = cellState.imsprotons;
  QH2counter.textContent = cellState.QH2count;
  cytCcounter.textContent = cellState.cytochrome;
  synthase.rotationtext.textContent = strings.rotation;
  synthase.beta1.textContent = strings.beta1;
  synthase.beta2.textContent = strings.beta2;
  synthase.beta3.textContent = strings.beta3;
  [
    synthase.beta1textATP,
    synthase.beta1textADP,
    synthase.beta1textEMPTY,
    synthase.beta2textATP,
    synthase.beta2textADP,
    synthase.beta2textEMPTY,
    synthase.beta3textATP,
    synthase.beta3textADP,
    synthase.beta3textEMPTY,
  ].forEach((e) => isVisible(e, false));
  [
    synthase.beta1textEMPTY,
    synthase.beta2textADP,
    synthase.beta3textATP,
  ].forEach((e) => isVisible(e, true));

  Object.values(paths).forEach((path) => setElementActive(path, false));
  particles.c1Electrons.forEach((e) => setElementActive(e, false));
  particles.c2Electrons.forEach((e) => setElementActive(e, false));
  particles.c3Electrons.forEach((e) => setElementActive(e, false));
  setElementActive(particles.cIVelec1, false);
  setElementActive(particles.cIVelec2, false);
  setElementActive(particles.cytCount, true);
  setElementActive(particles.cIprotons, false);
  setElementActive(particles.cIIprotons, false);
  //setElementActive(paths.protontocI, false);
  [
    particles.cIVims1,
    particles.cIVims2,
    particles.cIVims3,
    particles.cIVims4,
  ].forEach((e) => setElementActive(e, false));
  [
    particles.cIVmat1,
    particles.cIVmat2,
    particles.cIVmat3,
    particles.cIVmat4,
  ].forEach((e) => setElementActive(e, true));

  [particles.cImat1, particles.cImat2, particles.cImat3, particles.cImat4]
    .forEach((e) => setElementActive(e, true));
  [particles.cIims1, particles.cIims2, particles.cIims3, particles.cIims4]
    .forEach((e) => setElementActive(e, false));
  setElementActive(particles.c3ProtonsIMS, false);
  setElementActive(particles.protonfeeder, true);
  isVisible(particles.Qradical, false);
  setElementActive(particles.QH2membrane, false);
  setElementActive(particles.Qmembrane, true);
  setElementActive(complex3Btn, false);
  setElementActive(complex4Btn, false);
  setElementActive(complex5Btn, false);
  setElementActive(paths.protonstocIV, false);
  setElementActive(paths.oxygentocIV, false);
  setElementActive(paths.waterout, false);
  setElementActive(particles.cIVoxygen, true);
  setElementActive(particles.cIVprotons, true);
  setElementActive(particles.cIVwater, true);
  setElementActive(particles.cytcelec, false);
  setElementActive(synthase.cring1, false);
  setElementActive(synthase.cring2, false);
  setElementActive(synthase.synthaseims1, true);
  setElementActive(synthase.synthasemat1, false);
}
