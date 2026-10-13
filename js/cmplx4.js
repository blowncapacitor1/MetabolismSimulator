// Complex IV (cytochrome c oxidase): the diagram display and the animation for each step
// of the catalytic cycle.
// The cycle is modelled as a chain of intermediates:
//   R -> A -> Pm -> Pr -> F -> Oh -> Eh -> R
// The current intermediate lives in state.js (complex4.intermediate). Deciding *when* a step
// may run (button press, cytochrome c gating) is done by the click handler in
// electrontransportchain2.js.
import { updateDashboard, complex4 } from './state.js';

export function createComplex4(ctx) {
  const { el, ui, state: cellState, svgDoc } = ctx;
  const { setElementActive, isVisible, delay, createPopText } = ui;
  const { cmplx4, paths, counters } = el;
  const imsCounter = counters.ims;
  const matrixCounter = counters.matrix;
  const cytCcounter = counters.cytC;

  // ---- Intermediate display: one element per intermediate, only the current one visible ----
  const complex4StateElements = {
    R: cmplx4.STATE_R,
    A: cmplx4.STATE_A,
    Pm: cmplx4.STATE_Pm,
    Pr: cmplx4.STATE_Pr,
    F: cmplx4.STATE_F,
    Oh: cmplx4.STATE_Oh,
    Eh: cmplx4.STATE_Eh,
  };

  function renderComplex4State() {
    for (const [intermediate, element] of Object.entries(complex4StateElements)) {
      if (!element) {
        console.warn(`Complex IV: no SVG element found for STATE_${intermediate}`);
        continue;
      }
      isVisible(element, intermediate === complex4.intermediate);
    }
  }
  renderComplex4State();

  // Proton chemistry + pumping: one matrix proton is pumped into the IMS.
  async function pumpComplex4Proton(matChannel, imsChannel) {
    setElementActive(matChannel, false);
    await delay(100);
    cellState.matrixprotons -= 1;
    matrixCounter.textContent = cellState.matrixprotons;
    await delay(100);
    setElementActive(imsChannel, true);
    cellState.imsprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
  }

  // Takes one electron from cytochrome c.
  function consumeCytochromeC() {
    cellState.cytochrome -= 1;
    cytCcounter.textContent = cellState.cytochrome;
  }

  // R -> A: O2 binds the fully reduced binuclear centre.
  async function stepRtoA() {
    // Fresh cycle: put the proton-pump channels back to their starting appearance.
    [cmplx4.cIVmat1, cmplx4.cIVmat2, cmplx4.cIVmat3, cmplx4.cIVmat4]
      .forEach((e) => setElementActive(e, true));
    [cmplx4.cIVims1, cmplx4.cIVims2, cmplx4.cIVims3, cmplx4.cIVims4]
      .forEach((e) => setElementActive(e, false));

    setElementActive(cmplx4.O2in, true);
    await delay(500);
    setElementActive(cmplx4.cIVoxygen, false);
    const oxygenPop = createPopText(cmplx4.cIVoxygen, '-1', false, 'left');
    cellState.o2 -= 1;
    isVisible(cmplx4.iron_dioxygen, true);
    updateDashboard(svgDoc);
    await delay(800);
    oxygenPop.remove();
    await delay(500);
    setElementActive(cmplx4.O2in, false);
    setElementActive(cmplx4.cIVoxygen, true);
  }

  // A -> Pm: O-O bond scission.
  async function stepAtoPm() {
    isVisible(cmplx4.scission, true);
    isVisible(cmplx4.YtoFe, true);
    await delay(800);
    isVisible(cmplx4.Y_OH, false);
    isVisible(cmplx4.Y_Oradical, true);
    isVisible(cmplx4.iron_dioxygen, false);
    isVisible(cmplx4.iron_oxygen2minus, true);
    isVisible(cmplx4.copper_hydroxide, true);
    isVisible(cmplx4.scission, false);
    isVisible(cmplx4.YtoFe, false);
  }

  // Pm -> Pr: first cytochrome c electron arrives.
  async function stepPmtoPr() {
    setElementActive(paths.cytCtocIV, true);
    isVisible(cmplx4.Y_Oradical, false);
    isVisible(cmplx4.Y_Ominus, true);
    await delay(800);
    setElementActive(paths.cytCtocIV, false);
    consumeCytochromeC();
  }

  // Pr -> F: proton taken up, first proton pumped.
  async function stepPrtoF() {
    setElementActive(cmplx4.protonstocIV, true);
    await delay(500);
    setElementActive(cmplx4.cIVprotons, false);
    const protonPop = createPopText(cmplx4.cIVprotons, '-1', false, 'left');
    await delay(800);
    isVisible(cmplx4.copper_hydroxide, false);
    isVisible(cmplx4.copper_water, true);
    protonPop.remove();
    setElementActive(cmplx4.cIVprotons, true);
    setElementActive(cmplx4.protonstocIV, false);
    await pumpComplex4Proton(cmplx4.cIVmat1, cmplx4.cIVims1);
  }

  // F -> Oh: second cytochrome c electron arrives, second proton pumped.
  async function stepFtoOh() {
    setElementActive(paths.cytCtocIV, true);
    setElementActive(cmplx4.protonstocIV, true);
    await delay(500);
    setElementActive(cmplx4.cIVprotons, false);
    const protonPop = createPopText(cmplx4.cIVprotons, '-1', false, 'left');
    consumeCytochromeC();
    await delay(800);
    protonPop.remove();
    setElementActive(cmplx4.protonstocIV, false);
    setElementActive(paths.cytCtocIV, false);
    setElementActive(cmplx4.cIVprotons, true);
    await delay(500);
    isVisible(cmplx4.iron_oxygen2minus, false);
    isVisible(cmplx4.iron_hydroxide, true);
    await pumpComplex4Proton(cmplx4.cIVmat2, cmplx4.cIVims2);
  }

  // Oh -> Eh: third electron, first water released, third proton pumped.
  async function stepOhtoEh() {
    setElementActive(paths.cytCtocIV, true);
    setElementActive(cmplx4.protonstocIV, true);
    await delay(500);
    setElementActive(cmplx4.cIVprotons, false);
    const protonPop = createPopText(cmplx4.cIVprotons, '-1', false, 'left');
    consumeCytochromeC();
    await delay(500);
    protonPop.remove();
    setElementActive(cmplx4.cIVprotons, true);
    setElementActive(cmplx4.protonstocIV, false);
    setElementActive(paths.cytCtocIV, false);
    await delay(500);
    isVisible(cmplx4.copper_h2o_out, true);
    setElementActive(cmplx4.h2o_out, true);
    isVisible(cmplx4.copper_water, false);
    isVisible(cmplx4.iron_hydroxide, false);
    isVisible(cmplx4.iron_water, true);
    setElementActive(cmplx4.waterout, true);

    const waterPop = createPopText(cmplx4.waterout, '+1', true, 'left');
    cellState.h2o += 1;
    await delay(500);
    setElementActive(cmplx4.waterout, false);
    isVisible(cmplx4.copper_h2o_out, false);
    setElementActive(cmplx4.h2o_out, false);
    updateDashboard(svgDoc);
    await pumpComplex4Proton(cmplx4.cIVmat3, cmplx4.cIVims3);
    await delay(300);
    waterPop.remove();
  }

  // Eh -> R: fourth electron, second water released, fourth proton pumped.
  async function stepEhtoR() {
    setElementActive(paths.cytCtocIV, true);
    setElementActive(cmplx4.protonstocIV, true);
    await delay(500);
    setElementActive(cmplx4.cIVprotons, false);
    const protonPop = createPopText(cmplx4.cIVprotons, '-1', false, 'left');
    consumeCytochromeC();
    isVisible(cmplx4.Y_Ominus, false);
    isVisible(cmplx4.Y_OH, true);
    await delay(500);
    protonPop.remove();
    setElementActive(cmplx4.cIVprotons, true);
    setElementActive(cmplx4.protonstocIV, false);
    setElementActive(paths.cytCtocIV, false);
    await delay(500);
    isVisible(cmplx4.iron_h2o_out, true);
    setElementActive(cmplx4.h2o_out, true);
    isVisible(cmplx4.iron_water, false);
    setElementActive(cmplx4.waterout, true);

    const waterPop = createPopText(cmplx4.waterout, '+1', true, 'left');
    cellState.h2o += 1;
    await delay(500);
    setElementActive(cmplx4.waterout, false);
    isVisible(cmplx4.iron_h2o_out, false);
    setElementActive(cmplx4.h2o_out, false);
    updateDashboard(svgDoc);
    await pumpComplex4Proton(cmplx4.cIVmat4, cmplx4.cIVims4);
    await delay(300);
    waterPop.remove();
  }

  // Each intermediate maps to the step that carries it to the next one.
  const complex4Steps = {
    R: stepRtoA,
    A: stepAtoPm,
    Pm: stepPmtoPr,
    Pr: stepPrtoF,
    F: stepFtoOh,
    Oh: stepOhtoEh,
    Eh: stepEhtoR,
  };

  return { steps: complex4Steps, renderState: renderComplex4State };
}
