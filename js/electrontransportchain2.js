import {
  cellState, strings, updateDashboard,
  complex4, COMPLEX4_CYCLE, COMPLEX4_CYTC_COST, COMPLEX4_HALF_CYCLES, complex4CytCNeeded,
} from './state.js';
import { getETCElements } from './elements.js';
import { makeUI } from './svgHelpers.js';
import { resetETCState } from './render.js';
import { createQuinonePool } from './quinonePool.js';
import { createCytochromeHandler } from './cytochrome.js';

export function initETC(svgDoc) {
   const el = getETCElements(svgDoc);
  const ui = makeUI(svgDoc);
  const runtime = { complex3Running: false, cringRotation: 0 };
  const ctx = { el, ui, state: cellState, strings, runtime };

  const { setElementActive, isVisible, delay, createPopText } = ui;
  const { buttons, synthase, cmplx4, particles, paths, counters, cringBaseTransform } = el;

  const complex1Btn = buttons.I;
  const complex2Btn = buttons.II;
  const complex3Btn = buttons.III;
  const complex4Btn = buttons.IV;
  const complex5Btn = buttons.V;
  const imsCounter = counters.ims;
  const matrixCounter = counters.matrix;
  const QH2counter = counters.QH2;
  const cytCcounter = counters.cytC;

   resetETCState(ctx);
  const { ubiquinonehandler, matrixubiquinonehandler } = createQuinonePool(ctx);
  const cytochromehandler = createCytochromeHandler(ctx);

  async function handleComplex1Click() {
     particles.c1NADH.classList.add('intake-highlight');
    const popIntake = createPopText(particles.c1NADH, '-1', false, 'left');
    cellState.nadh -= 1;
    updateDashboard(svgDoc);
    particles.c1Electrons.forEach((e) => setElementActive(e, true));
    setElementActive(paths.protontocI, true);
    await delay(300);
    setElementActive(particles.cIinput, false);
    setElementActive(particles.cIprotons, true);
    await delay(500);
    cellState.matrixprotons -=1;
    await delay(900);
    setElementActive(paths.protontocI, false);

    particles.c1NADH.classList.remove('intake-highlight');
    popIntake.remove();
    particles.c1NAD.classList.add('product-highlight');
    const popProduct = createPopText(particles.c1NAD, '+1', true, 'left');
    cellState.nad += 1;
     matrixCounter.textContent = cellState.matrixprotons;
    matrixCounter.textContent = cellState.matrixprotons;
    setElementActive(particles.cIinput, true);
    updateDashboard(svgDoc);
    await delay(900);
    particles.c1NAD.classList.remove('product-highlight');
    popProduct.remove();
    await delay(400);
    
    setElementActive(paths.complex1toQ, true);
    await delay(800);
    setElementActive(paths.QtoQH2, true);
    await delay(1000);
    setElementActive(particles.cIprotons, false);
    particles.c1Electrons.forEach((e) => setElementActive(e, false));

    cellState.QH2count += 1;
    QH2counter.textContent = cellState.QH2count;
    ubiquinonehandler();
    updateDashboard(svgDoc);
    await delay(800);
    setElementActive(paths.complex1toQ, false);
    setElementActive(paths.QtoQH2, false);
    //setElementActive(paths.protonstoQ, false);
    await delay(800);

    for (const [matrixProton, imsProton] of [
      [particles.cImat1, particles.cIims1],
      [particles.cImat2, particles.cIims2],
      [particles.cImat3, particles.cIims3],
      [particles.cImat4, particles.cIims4],
    ]) {
      setElementActive(matrixProton, false);
      setElementActive(imsProton, true);
      await delay(100);
    }

    cellState.matrixprotons -= 4;
    cellState.imsprotons += 4;
    matrixCounter.textContent = cellState.matrixprotons;
    imsCounter.textContent = cellState.imsprotons;
    await delay(1000);

    [particles.cImat1, particles.cImat2, particles.cImat3, particles.cImat4]
      .forEach((e) => setElementActive(e, true));
    [particles.cIims1, particles.cIims2, particles.cIims3, particles.cIims4]
      .forEach((e) => setElementActive(e, false));
    setElementActive(particles.protonfeeder, true);
    await delay(800);
    if (cellState.imsprotons > cellState.matrixprotons) {
      setElementActive(complex5Btn, true);
    } else {
      setElementActive(complex5Btn, false);
    }
  }
  async function handleComplex2Click() {
    particles.c2Succinate.classList.add('intake-highlight');
    const popIntake = createPopText(particles.c2Succinate, '-1', false, 'left');
    cellState.Succinate -= 1;
    updateDashboard(svgDoc);
    particles.c2Electrons.forEach((e) => setElementActive(e, true));
    setElementActive(particles.cIIprotons, true);

    await delay(900);
    particles.c2Succinate.classList.remove('intake-highlight');
    popIntake.remove();

    particles.c2Fumarate.classList.add('product-highlight');
    const popProduct = createPopText(particles.c2Fumarate, '+1', true, 'left');
    cellState.Fumarate += 1;
    cellState.matrixprotons += 2;
    matrixCounter.textContent = cellState.matrixprotons;
    updateDashboard(svgDoc);
    await delay(900);
    particles.c2Fumarate.classList.remove('product-highlight');
    popProduct.remove();
    await delay(400);

    setElementActive(paths.complex2toQ, true);
    await delay(800);
    setElementActive(paths.QtoQH2, true);
    await delay(1000);
    particles.c2Electrons.forEach((e) => setElementActive(e, false));
    setElementActive(particles.cIIprotons, false);
    cellState.QH2count += 1;
    QH2counter.textContent = cellState.QH2count;
    ubiquinonehandler();
    updateDashboard(svgDoc);
    await delay(800);

    setElementActive(paths.complex2toQ, false);
    setElementActive(paths.QtoQH2, false);

    await delay(800);
    if (cellState.imsprotons > cellState.matrixprotons) {
      setElementActive(complex5Btn, true);
    } else {
      setElementActive(complex5Btn, false);
    }
  }

   async function handleComplex3Click() {
    if (runtime.complex3Running || cellState.QH2count === 0) return;

    runtime.complex3Running = true;
    setElementActive(complex3Btn, false);

    try {
      if (cellState.QH2count !== 0) {
        if (cellState.MatrixQstate < 2) {
          setElementActive(paths.QH2protonsOUT, true);
          setElementActive(paths.QH2tocomplex3, true);
          setElementActive(paths.QH2toQ, true);
          await delay(800);
          setElementActive(paths.QH2toQ, false);
          setElementActive(paths.QH2protonsOUT, false);
          setElementActive(paths.QH2tocomplex3, false);
          setElementActive(paths.QH2toQ, false);
          cellState.QH2count -= 1;
          cellState.imsprotons += 2;
          QH2counter.textContent = cellState.QH2count;
          imsCounter.textContent = cellState.imsprotons;
          ubiquinonehandler();
          setElementActive(particles.c3ProtonsIMS, true);
          particles.c3Electrons.forEach((e) => setElementActive(e, true));
          await delay(800);
          setElementActive(paths.complex3tocytC, true);
          setElementActive(paths.complex3toQmat, true);
          await delay(400);
          particles.c3Electrons.forEach((e) => setElementActive(e, false));
          cellState.cytochrome += 1;
          cellState.MatrixQstate += 1;
          console.log(cellState.MatrixQstate);
          await matrixubiquinonehandler();
          await cytochromehandler();
          await delay(800);
          setElementActive(paths.complex3tocytC, false);
          setElementActive(paths.complex3toQmat, false);
          setElementActive(particles.c3ProtonsIMS, false);
          await delay(400);
        } else if (cellState.MatrixQstate === 2) {
          setElementActive(paths.QH2protonsOUT, true);
          setElementActive(paths.QH2tocomplex3, true);
          setElementActive(paths.QH2toQ, true);

          await delay(800);
          setElementActive(paths.QH2toQ, true);

          setElementActive(paths.QH2protonsOUT, false);
          setElementActive(paths.QH2tocomplex3, false);
          setElementActive(paths.QH2toQ, false);
          cellState.QH2count -= 1;
          cellState.imsprotons += 2;
          QH2counter.textContent = cellState.QH2count;
          imsCounter.textContent = cellState.imsprotons;
          ubiquinonehandler();
          setElementActive(particles.c3ProtonsIMS, true);
          particles.c3Electrons.forEach((e) => setElementActive(e, true));
          await delay(800);
          setElementActive(paths.complex3tocytC, true);
          setElementActive(paths.complex3toQmat, true);
          await delay(400);
          particles.c3Electrons.forEach((e) => setElementActive(e, false));
          cellState.cytochrome += 1;
          cellState.MatrixQstate = 1;
          console.log(cellState.MatrixQstate);
          await matrixubiquinonehandler();
          await cytochromehandler();
          await delay(800);
          setElementActive(paths.complex3tocytC, false);
          setElementActive(paths.complex3toQmat, false);
          setElementActive(particles.c3ProtonsIMS, false);
          await delay(400);
        }
      }
      if (cellState.imsprotons > cellState.matrixprotons) {
        setElementActive(complex5Btn, true);
      } else {
        setElementActive(complex5Btn, false);
      }
    } finally {
      runtime.complex3Running = false;
      await ubiquinonehandler();
    }
  }

  
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

  function consumeCytochromeC() {
    cellState.cytochrome -= 1;
    cytCcounter.textContent = cellState.cytochrome;
  }

  async function stepRtoA() {
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

  async function stepPmtoPr() {
    setElementActive(paths.cytCtocIV, true);
    isVisible(cmplx4.Y_Oradical, false);
    isVisible(cmplx4.Y_Ominus, true);
    await delay(800);
    setElementActive(paths.cytCtocIV, false);
    consumeCytochromeC();
  }

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

  const complex4Steps = {
    R: stepRtoA,
    A: stepAtoPm,
    Pm: stepPmtoPr,
    Pr: stepPrtoF,
    F: stepFtoOh,
    Oh: stepOhtoEh,
    Eh: stepEhtoR,
  };

  async function handleComplex4Click() {
    if (complex4.running) return;

    const from = complex4.intermediate;

   
    if (Object.hasOwn(COMPLEX4_HALF_CYCLES, from)
        && cellState.cytochrome < complex4CytCNeeded(from)) return;

    if (cellState.cytochrome < COMPLEX4_CYTC_COST[from]) return;

    complex4.running = true;
    try {
      await complex4Steps[from]();
      complex4.intermediate =
        COMPLEX4_CYCLE[(COMPLEX4_CYCLE.indexOf(from) + 1) % COMPLEX4_CYCLE.length];
      renderComplex4State();
    } finally {
      complex4.running = false;
      if (cellState.imsprotons > cellState.matrixprotons) {
        setElementActive(complex5Btn, true);
      } else {
        setElementActive(complex5Btn, false);
      }
    }
  }

//ATP Synthase
  async function cringhandler() {
    setElementActive(synthase.synthaseims1, false);
    cellState.imsprotons -= 1;
    cellState.matrixprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
    matrixCounter.textContent = cellState.matrixprotons;

    if (cellState.imshalfchannel < 8) {
      setElementActive(synthase[`cring${cellState.imshalfchannel}`], true);
      cellState.imshalfchannel += 1;
    } else if (cellState.imshalfchannel === 8) {
      setElementActive(synthase.cring8, true);
      cellState.imshalfchannel = 1;
    }

    await delay(500);
    runtime.cringRotation = (runtime.cringRotation - 45 + 360) % 360;
    const ringBounds = synthase.cring.getBBox();
    const centerX = ringBounds.x + ringBounds.width / 2;
    const centerY = ringBounds.y + ringBounds.height / 2;
    synthase.cring.setAttribute(
      'transform',
      `${cringBaseTransform ? `${cringBaseTransform} ` : ''}rotate(${runtime.cringRotation} ${centerX} ${centerY})`,
    );

    await delay(750);

    if (cellState.mathalfchannel < 8) {
      setElementActive(synthase[`cring${cellState.mathalfchannel}`], false);
      cellState.mathalfchannel += 1;
    } else if (cellState.mathalfchannel === 8) {
      setElementActive(synthase.cring8, false);
      cellState.mathalfchannel = 1;
    }
    setElementActive(synthase.synthasemat1, true);
    await delay(900);
    setElementActive(synthase.synthaseims1, true);
    setElementActive(synthase.synthasemat1, false);
  }

  async function atphandler() {
    const nextBetaState = { 'O:': 'L:', 'L:': 'T:', 'T:': 'O:' };
    const textForBetaState = { 'O:': 'EMPTY', 'L:': 'ADP', 'T:': 'ATP' };
    const popTexts = [];
    for (let i = 1; i <= 3; i++) {
      const betaKey = `beta${i}`;
      const currentState = strings[betaKey];
      const nextState = nextBetaState[currentState] ?? currentState;

      if (currentState === 'O:' && nextState === 'L:') {
        popTexts.push(createPopText(synthase.ADP, '-1', false, 'left'));
        cellState.adp -= 1;
      } else if (currentState === 'T:' && nextState === 'O:') {
        popTexts.push(createPopText(synthase.ATP, '+1', true, 'left'));
        cellState.atp += 1;
      }

      strings[betaKey] = nextState;
      synthase[betaKey].textContent = strings[betaKey];

      for (const textState of ['ATP', 'ADP', 'EMPTY']) {
        ui.isVisible(
          synthase[`${betaKey}text${textState}`],
          textState === textForBetaState[nextState],
        );
      }
    }

    if (popTexts.length > 0) {
      updateDashboard(svgDoc);
      await delay(800);
      popTexts.forEach((popText) => popText.remove());
    }
  }

  async function handleComplex5Click() {
    if (cellState.imsprotons - 3 >= cellState.matrixprotons) {
      if (cellState.synthaserotation === 0) {
        await cringhandler();
        strings.rotation = '045';
        synthase.rotationtext.textContent = strings.rotation;
        await delay(1000);
        await cringhandler();
        strings.rotation = '090';
        synthase.rotationtext.textContent = strings.rotation;
        await delay(1000);
        strings.rotation = '120';
        synthase.rotationtext.textContent = strings.rotation;
        atphandler();
        cellState.synthaserotation = 120;
      } else if (cellState.synthaserotation === 120) {
        await cringhandler();
        strings.rotation = '135';
        synthase.rotationtext.textContent = strings.rotation;
        await delay(1000);

        await cringhandler();
        strings.rotation = '180';
        synthase.rotationtext.textContent = strings.rotation;
        await delay(1000);

        await cringhandler();
        strings.rotation = '225';
        synthase.rotationtext.textContent = strings.rotation;
        await delay(1000);

        strings.rotation = '240';
        synthase.rotationtext.textContent = strings.rotation;

        atphandler();
        cellState.synthaserotation = 240;
      } else if (cellState.synthaserotation === 240) {
        await cringhandler();
        strings.rotation = '270';
        synthase.rotationtext.textContent = strings.rotation;
        await cringhandler();
        strings.rotation = '315';
        synthase.rotationtext.textContent = strings.rotation;
        await cringhandler();
        strings.rotation = '000';
        await atphandler();
        synthase.rotationtext.textContent = strings.rotation;
        cellState.synthaserotation = 0;
      }
    }
  }

  // ---- Initial synthase button state and listeners ----
  if (cellState.imsprotons-3 >= cellState.matrixprotons) {
    setElementActive(complex5Btn, true);
  } else {
    setElementActive(complex5Btn, false);
  }

  complex1Btn.addEventListener('click', handleComplex1Click);
  complex2Btn.addEventListener('click', handleComplex2Click);
  complex3Btn.addEventListener('click', handleComplex3Click);
  complex4Btn.addEventListener('click', handleComplex4Click);
  complex5Btn.addEventListener('click', handleComplex5Click);
}