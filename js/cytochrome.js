export function createCytochromeHandler(ctx) {
  const { el, ui, state: cellState } = ctx;
  const { setElementActive, delay } = ui;
  const { buttons, particles, paths, counters } = el;
  const complex4Btn = buttons.IV;
  const cytCcounter = counters.cytC;

  return async function cytochromehandler() {
    cytCcounter.textContent = cellState.cytochrome;

    if (cellState.cytochrome >= 1) {
      setElementActive(particles.cytcelec, true);

      setElementActive(complex4Btn, true);
    } else {
      setElementActive(complex4Btn, false);
      setElementActive(particles.cytcelec, false);
    }

    if (cellState.cIVcycle === 0) {
      await delay(500);

      setElementActive(paths.cytCtocIV, false);
      setElementActive(paths.electronstoO2, false);
      setElementActive(paths.protonstocIV, false);
      setElementActive(paths.oxygentocIV, false);
      setElementActive(paths.waterout, false);
      setElementActive(particles.cIVoxygen, true);

      setElementActive(particles.cIVprotons, true);
      setElementActive(particles.cIVwater, true);

      [
        particles.cIVmat1,
        particles.cIVmat2,
        particles.cIVmat3,
        particles.cIVmat4,
      ].forEach((e) => setElementActive(e, true));

      [
        particles.cIVims1,
        particles.cIVims2,
        particles.cIVims3,
        particles.cIVims4,
      ].forEach((e) => setElementActive(e, false));
    }
  };
}
