// Membrane QH2 pool and matrix-side Q handlers, shared by Complexes I, II and III.
export function createQuinonePool(ctx) {
  const { el, ui, state: cellState, runtime } = ctx;
  const { setElementActive, isVisible, delay } = ui;
  const { buttons, particles, paths, counters } = el;
  const complex3Btn = buttons.III;
  const matrixCounter = counters.matrix;
  const QH2counter = counters.QH2;

  // Enable or disable Complex III according to the membrane QH2 count.
  async function ubiquinonehandler() {
    const hasQH2 = cellState.QH2count !== 0;
    setElementActive(particles.QH2membrane, hasQH2);
    setElementActive(complex3Btn, hasQH2 && !runtime.complex3Running);
  }

  async function matrixubiquinonehandler() {
    if (cellState.MatrixQstate === 0) {
      setElementActive(particles.Qmatrix, true);

      isVisible(particles.Qradical, false);
      isVisible(particles.Qmatrix, true);
    }
    else if (cellState.MatrixQstate === 1) {
      setElementActive(particles.Qmatrix, true);

      isVisible(particles.Qradical, true);
      isVisible(particles.Qmatrix, false);
    }
    else if (cellState.MatrixQstate === 2) {
      setElementActive(paths.protonstoQmat, true);
      await delay(400);
      setElementActive(particles.protonfeeder, false)
      setElementActive(paths.QradicaltoQH2, true);
      cellState.matrixprotons -= 2;
      matrixCounter.textContent = cellState.matrixprotons;

      await delay(800);
      cellState.QH2count += 1;
      QH2counter.textContent = cellState.QH2count
      ubiquinonehandler();
      await delay(400);
      setElementActive(particles.Qmatrix, false);
      isVisible(particles.Qmatrix, true);
      isVisible(particles.Qradical, false);
      setElementActive(paths.protonstoQmat, false);
      setElementActive(particles.protonfeeder, false)
      setElementActive(paths.QradicaltoQH2, false);

      await delay(400);
      setElementActive(paths.QH2toQmat, true);
      await delay(800);
      setElementActive(particles.Qmatrix, true);
      isVisible(particles.Qmatrix, true);
      setElementActive(paths.QH2toQmat, false);
    }
  }

  return { ubiquinonehandler, matrixubiquinonehandler };
}
