export function resetETCState(ctx) {
  const { el, ui, state: cellState, strings, runtime } = ctx;
  const { setElementActive, isVisible } = ui;
  const { buttons, synthase, cmplx4, particles, paths, counters, cringBaseTransform } = el;
  const complex3Btn = buttons.III;
  const complex4Btn = buttons.IV;
  const complex5Btn = buttons.V;
  const imsCounter = counters.ims;
  const matrixCounter = counters.matrix;
  const QH2counter = counters.QH2;
  const cytCcounter = counters.cytC;

  cellState.matrixprotons = 0;
  cellState.imsprotons = 999;
  cellState.QH2count = 0;
  cellState.cytochrome = 999;
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
  
  setElementActive(particles.cytcelec, false);
  setElementActive(synthase.cring1, false);
  setElementActive(synthase.cring2, false);
  setElementActive(synthase.synthaseims1, true);
  setElementActive(synthase.synthasemat1, false);
 

  isVisible(cmplx4.iron_dioxygen, false);
  isVisible(cmplx4.iron_oxygen2minus, false);
  isVisible(cmplx4.iron_water, false);
  isVisible(cmplx4.iron_hydroxide, false);
  isVisible(cmplx4.Y_Ominus, false);
  isVisible(cmplx4.Y_Oradical, false);
  isVisible(cmplx4.copper_hydroxide, false);
  isVisible(cmplx4.copper_water, false);

  setElementActive(cmplx4.Y_OH, true);
  isVisible(cmplx4.Y_OH, true);

  setElementActive(cmplx4.O2in, false);
  setElementActive(cmplx4.protonstocIV, false);
  setElementActive(cmplx4.cIVoxygen, true);
  setElementActive(cmplx4.h2o_out, false);
  isVisible(cmplx4.iron_h2o_out, false);
  isVisible(cmplx4.copper_h2o_out, false);
  setElementActive(particles.cIVprotons, true);
  setElementActive(particles.waterout, false);
  isVisible(cmplx4.scission, false);
  isVisible(cmplx4.YtoFe, false);
  isVisible(cmplx4.YtoCu, false);



}
