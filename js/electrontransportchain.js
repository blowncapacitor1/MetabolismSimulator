import { cellState, strings, updateDashboard } from './state.js';
const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export function initETC(svgDoc) {
  const complex1Btn = svgDoc.getElementById('btnI');
  const complex2Btn = svgDoc.getElementById('btnII');
  const complex3Btn = svgDoc.getElementById('btnIII');
  const complex4Btn = svgDoc.getElementById('btnIV');
  const complex5Btn = svgDoc.getElementById('synthaseBtn');

  // Resolve the metabolites, electrons, protons, and counters used by the ETC animation.

const synthase = {
    ATP: svgDoc.getElementById('synthaseATP'),
    ADP: svgDoc.getElementById('synthaseADP'),
    cring1: svgDoc.getElementById('cring1'),
    cring2: svgDoc.getElementById('cring2'),
    cring3: svgDoc.getElementById('cring3'),
    cring4: svgDoc.getElementById('cring4'),
    cring5: svgDoc.getElementById('cring5'),
    cring6: svgDoc.getElementById('cring6'),
    cring7: svgDoc.getElementById('cring7'),
    cring8: svgDoc.getElementById('cring8'),
    rotationtext: svgDoc.getElementById('rotationtext'),
    beta1: svgDoc.getElementById('beta1'),
    beta2: svgDoc.getElementById('beta2'),
    beta3: svgDoc.getElementById('beta3'),
    beta1textATP: svgDoc.getElementById('beta1textATP'),
    beta1textADP: svgDoc.getElementById('beta1textADP'),
    beta1textEMPTY: svgDoc.getElementById('beta1textEMPTY'),
    beta2textATP: svgDoc.getElementById('beta2textATP'),
    beta2textADP: svgDoc.getElementById('beta2textADP'),
    beta2textEMPTY: svgDoc.getElementById('beta2textEMPTY'),
    beta3textATP: svgDoc.getElementById('beta3textATP'),
    beta3textADP: svgDoc.getElementById('beta3textADP'),
    beta3textEMPTY: svgDoc.getElementById('beta3textEMPTY'),
    synthaseims1: svgDoc.getElementById('synthaseims1'),
    synthasemat1: svgDoc.getElementById('synthasemat1'),
    MATt1: svgDoc.getElementById('MATt1'),
    MATt2: svgDoc.getElementById('MATt2'),
    MATt3: svgDoc.getElementById('MATt3'),
    MATt4: svgDoc.getElementById('MATt4'),
    MATt5: svgDoc.getElementById('MATt5'),
    MATt6: svgDoc.getElementById('MATt6'),
    MATt7: svgDoc.getElementById('MATt7'),
    MATt8: svgDoc.getElementById('MATt8'),
    IMSt1: svgDoc.getElementById('IMSt1'),
    IMSt2: svgDoc.getElementById('IMSt2'),
    IMSt3: svgDoc.getElementById('IMSt3'),
    IMSt4: svgDoc.getElementById('IMSt4'),
    IMSt5: svgDoc.getElementById('IMSt5'),
    IMSt6: svgDoc.getElementById('IMSt6'),
    IMSt7: svgDoc.getElementById('IMSt7'),
    IMSt8: svgDoc.getElementById('IMSt8'),
  };
  const particles = {
    c1NADH: svgDoc.getElementById('cINADH'),
    c1NAD: svgDoc.getElementById('cINAD'),
    c2FADH2: svgDoc.getElementById('cIIFADH'),
    c2FAD: svgDoc.getElementById('cIIFAD'),
    cIVoxygen: svgDoc.getElementById('cIVoxygen'),
    cIVwater: svgDoc.getElementById('cIVwater'),
    cIVprotons: svgDoc.getElementById('cIVprotons'),
    c1Electrons: [
      svgDoc.getElementById('cIelec1'),
      svgDoc.getElementById('cIelec2'),
    ],
    c2Electrons: [
    svgDoc.getElementById('cIIelec1'),
    svgDoc.getElementById('cIIelec2'),
    ],
    c3Electrons: [
        svgDoc.getElementById('cIIIelec1'),
        svgDoc.getElementById('cIIIelec2'),
    ],
   cIVelec1: svgDoc.getElementById('cIVelec1'),
   cIVelec2: svgDoc.getElementById('cIVelec2'),
      
    cytcelec: svgDoc.getElementById('cytcelec'),
    cytCount: svgDoc.getElementById('cytCcounter'),
    cImat1: svgDoc.getElementById('cImat1'),
    cImat2: svgDoc.getElementById('cImat2'),
    cImat3: svgDoc.getElementById('cImat3'),
    cImat4: svgDoc.getElementById('cImat4'),
    cIims1: svgDoc.getElementById('cIims1'),
    cIims2: svgDoc.getElementById('cIims2'),
    cIims3: svgDoc.getElementById('cIims3'),
    cIims4: svgDoc.getElementById('cIims4'),

    cIVmat1: svgDoc.getElementById('cIVmat1'),
    cIVmat2: svgDoc.getElementById('cIVmat2'),
    cIVmat3: svgDoc.getElementById('cIVmat3'),
    cIVmat4: svgDoc.getElementById('cIVmat4'),
    cIVims1: svgDoc.getElementById('cIVims1'),
    cIVims2: svgDoc.getElementById('cIVims2'),
    cIVims3: svgDoc.getElementById('cIVims3'),
    cIVims4: svgDoc.getElementById('cIVims4'),
    c3ProtonsIMS: svgDoc.getElementById('cIIIimsprotons'),
  
    
    Qradical: svgDoc.getElementById('cIIIQradicalmat'),
    Qmatrix: svgDoc.getElementById('cIIIQmat'),
    protonfeeder: svgDoc.getElementById('2Hfeeder'),
    QH2membrane: svgDoc.getElementById('QH2'),
    Qmembrane: svgDoc.getElementById('Q'),
    

  };
  const paths = {
    complex1toQ: svgDoc.getElementById('QcIpath'),
    complex2toQ: svgDoc.getElementById('QcIIpath'),
    complex3toQmat: svgDoc.getElementById('complex3toQmat'),
    complex3tocytC: svgDoc.getElementById('complex3tocytC'),
    cytCtocIV: svgDoc.getElementById('cytCtocIV'),
    electronstoO2: svgDoc.getElementById('electronstoO2'),
    protonstoQ: svgDoc.getElementById('protonstoQ'),
    protonstoQmat: svgDoc.getElementById('protonstoQmat'),
    QtoQH2: svgDoc.getElementById('Qup'),
    QH2toQ: svgDoc.getElementById('Qdown'),
    QH2toQmat: svgDoc.getElementById('QH2toQmat'),
    QradicaltoQH2: svgDoc.getElementById('QradicaltoQH2'),
    QH2protonsOUT: svgDoc.getElementById('QH2protonsOUT'),
    QH2tocomplex3: svgDoc.getElementById('QH2toc3'),
    protonstocIV: svgDoc.getElementById('protonstocIV'),
    oxygentocIV: svgDoc.getElementById('oxygentocIV'),
    waterout: svgDoc.getElementById('waterout'),
    protonstocIV: svgDoc.getElementById('protonstocIV'),


  };
  const imsCounter = svgDoc.getElementById('imsCount');
  const matrixCounter = svgDoc.getElementById('matrixCount');
  const QH2counter = svgDoc.getElementById('QH2counter');
  const cytCcounter = svgDoc.getElementById('cytCcounter');

  // Create a temporary SVG label positioned relative to an animated particle.
  function createPopText(targetEl, text, isPositive, position = 'bottom') {
    const svgEl = svgDoc.querySelector('svg');
    const targetRect = targetEl.getBoundingClientRect();

    const Y_OFFSET = 10;
    const X_OFFSET = 12;

    let screenX = targetRect.left + targetRect.width / 2;
    let screenY = targetRect.top + targetRect.height / 2;
    let dominantBaseline = 'middle';
    let textAnchor = 'middle';

    switch (position) {
      case 'top':
        screenY = targetRect.top - Y_OFFSET;
        dominantBaseline = 'auto';
        break;
      case 'bottom':
        screenY = targetRect.bottom + Y_OFFSET;
        dominantBaseline = 'hanging';
        break;
      case 'left':
        screenX = targetRect.left - X_OFFSET;
        textAnchor = 'end';
        dominantBaseline = 'central';
        break;
      case 'right':
        screenX = targetRect.right + X_OFFSET;
        textAnchor = 'start';
        dominantBaseline = 'central';
        break;
    }

    const point = svgEl.createSVGPoint();
    point.x = screenX;
    point.y = screenY;
    const svgPoint = point.matrixTransform(svgEl.getScreenCTM().inverse());

    const pop = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'text');
    pop.textContent = text;
    pop.setAttribute('class', `pop-text ${isPositive ? 'pop-positive' : 'pop-negative'}`);
    pop.setAttribute('x', svgPoint.x);
    pop.setAttribute('y', svgPoint.y);
    pop.setAttribute('text-anchor', textAnchor);
    pop.setAttribute('dominant-baseline', dominantBaseline);

    svgEl.appendChild(pop);
    return pop;
  }

  // Apply the active or gray visual state to an SVG element or group.
  function setElementActive(el, isActive) {
    if (!el) return;
    const targets = el.tagName?.toLowerCase() === 'g'
      ? Array.from(el.querySelectorAll('path, circle, rect, text, tspan'))
      : [el];

    targets.forEach((target) => {
      if (isActive) {
        target.classList.add('active-state');
        target.classList.remove('greyed-out');
        target.style.opacity = '1';
        target.style.filter = 'none';
      } else {
        target.classList.add('greyed-out');
        target.classList.remove('active-state');
        target.style.opacity = '0.35';
        if (!target.getAttribute('marker-end')) {
          target.style.filter = 'grayscale(100%)';
        }
      }
    });
  }

  function isVisible(el, isActive) {
    if (!el) return;
    const targets = el.tagName?.toLowerCase() === 'g'
      ? Array.from(el.querySelectorAll('path, circle, rect, text, tspan'))
      : [el];

    targets.forEach((target) => {
      target.style.opacity = isActive ? '1' : '0';
    });
  }

  function resetETCState() {
    cellState.matrixprotons = 0;
    cellState.imsprotons = 0;
    cellState.QH2count = 0;
    cellState.cytochrome = 0;
    strings.rotation = "000";
    strings.beta1 = "O:";
    strings.beta2 = "L:";
    strings.beta3 = "T:";
    strings.betatext1 = "EMPTY";
    strings.betatext2 = "ADP+P\u1D62";
    strings.betatext3 = "ATP";
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
    ].forEach((el) => isVisible(el, false));
    [
      synthase.beta1textEMPTY,
      synthase.beta2textADP,
      synthase.beta3textATP,
    ].forEach((el) => isVisible(el, true));

    Object.values(paths).forEach((path) => setElementActive(path, false));
    particles.c1Electrons.forEach((el) => setElementActive(el, false));
    particles.c2Electrons.forEach((el) => setElementActive(el, false));
    particles.c3Electrons.forEach((el) => setElementActive(el, false));
    setElementActive(particles.cIVelec1, false);
    setElementActive(particles.cIVelec2, false);
    setElementActive(particles.cytCount, true);
    [
      particles.cIVims1,
      particles.cIVims2,
      particles.cIVims3,
      particles.cIVims4,
    ].forEach((el) => setElementActive(el, false));
    [
      particles.cIVmat1,
      particles.cIVmat2,
      particles.cIVmat3,
      particles.cIVmat4,
    ].forEach((el) => setElementActive(el, true));

    [particles.cImat1, particles.cImat2, particles.cImat3, particles.cImat4]
      .forEach((el) => setElementActive(el, true));
    [particles.cIims1, particles.cIims2, particles.cIims3, particles.cIims4]
      .forEach((el) => setElementActive(el, false));
    setElementActive(particles.c3ProtonsIMS, false);
    setElementActive(particles.protonfeeder, true);
    isVisible(particles.Qradical, false);
    [synthase.MATt1, synthase.IMSt8].forEach((el) => isVisible(el, true));
    [
      synthase.MATt2,
      synthase.MATt3,
      synthase.MATt4,
      synthase.MATt5,
      synthase.MATt6,
      synthase.MATt7,
      synthase.MATt8,
      synthase.IMSt1,
      synthase.IMSt2,
      synthase.IMSt3,
      synthase.IMSt4,
      synthase.IMSt5,
      synthase.IMSt6,
      synthase.IMSt7,
    ].forEach((el) => isVisible(el, false));
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
    for (let i = 1; i <= 8; i++) {
    setElementActive(synthase[`synthasemat${i}`], false);
  }
  setElementActive(synthase.cring8, false);
  }

  resetETCState();

  // Enable or disable Complex III according to the membrane QH2 count.
async function ubiquinonehandler() {
    if(cellState.QH2count === 0) {
   setElementActive(particles.QH2membrane, false);
     setElementActive(complex3Btn, false);
}
else{setElementActive(particles.QH2membrane, true);
    setElementActive(complex3Btn, true);}
}
async function matrixubiquinonehandler() {
    if(cellState.MatrixQstate === 0) {
        setElementActive(particles.Qmatrix, true);

        isVisible(particles.Qradical, false);
        isVisible(particles.Qmatrix, true);
    }
    else if(cellState.MatrixQstate === 1) {
        setElementActive(particles.Qmatrix, true);

        isVisible(particles.Qradical, true);
        isVisible(particles.Qmatrix, false);
    }
    else if(cellState.MatrixQstate === 2) {
        setElementActive(paths.protonstoQmat,true);
        await delay(400);
        setElementActive(particles.protonfeeder, false)
        setElementActive(paths.QradicaltoQH2, true);
        cellState.matrixprotons -=2;
        matrixCounter.textContent = cellState.matrixprotons;

        await delay(800);
        cellState.QH2count += 1;
        QH2counter.textContent = cellState.QH2count
        ubiquinonehandler();
        await delay(400);
        setElementActive(particles.Qmatrix, false);
        isVisible(particles.Qmatrix, true);
        isVisible(particles.Qradical, false);
        setElementActive(paths.protonstoQmat,false);
        setElementActive(particles.protonfeeder, false)
        setElementActive(paths.QradicaltoQH2, false);

        await delay(400);
        setElementActive(paths.QH2toQmat, true);
        await delay(800);
        setElementActive(particles.Qmatrix, true);
        isVisible(particles.Qmatrix, true);
        setElementActive(paths.QH2toQmat, false);
        // Refill the matrix Q site after the completed QH2 transfer.
    }
}
async function handleComplex1Click() {
  // Complex I transfers electrons from NADH and pumps four matrix protons.
        
          particles.c1NADH.classList.add('intake-highlight');
          const popIntake = createPopText(particles.c1NADH, '-1', false, 'left');
          cellState.nadh -= 1;
          updateDashboard(svgDoc);
          particles.c1Electrons.forEach((el) => setElementActive(el, true));
          await delay(900);
          particles.c1NADH.classList.remove('intake-highlight');
          popIntake.remove();
          particles.c1NAD.classList.add('product-highlight');
          const popProduct = createPopText(particles.c1NAD, '+1', true, 'left');
            cellState.nad += 1;
            cellState.matrixprotons += 1;
            matrixCounter.textContent = cellState.matrixprotons;
            updateDashboard(svgDoc);
         await delay(400);
          await delay(900);
          particles.c1NAD.classList.remove('product-highlight');
          popProduct.remove();
          await delay(400);
  
        setElementActive(paths.complex1toQ, true);
        await delay(800);
        setElementActive(paths.QtoQH2, true);
        setElementActive(paths.protonstoQ, true);
        await delay(1000);
        particles.c1Electrons.forEach((el) => setElementActive(el, false));        
        setElementActive(particles.protonfeeder, false);
        cellState.matrixprotons -= 2;
        matrixCounter.textContent = cellState.matrixprotons;
        cellState.QH2count += 1;
        QH2counter.textContent = cellState.QH2count;
        ubiquinonehandler();
        updateDashboard(svgDoc);
        await delay(800)
        setElementActive(paths.complex1toQ, false);
        setElementActive(paths.QtoQH2, false);
        setElementActive(paths.protonstoQ, false);
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
          .forEach((el) => setElementActive(el, true));
        [particles.cIims1, particles.cIims2, particles.cIims3, particles.cIims4]
          .forEach((el) => setElementActive(el, false));
        setElementActive(particles.protonfeeder, true);
        await delay(800);
  if(cellState.imsprotons > cellState.matrixprotons){
    setElementActive(complex5Btn, true);
  }
  else{setElementActive(complex5Btn, false);}
}
async function handleComplex2Click() {
  // Complex II transfers electrons from FADH2 and adds QH2 to the membrane pool.
  particles.c2FADH2.classList.add('intake-highlight');
  const popIntake = createPopText(particles.c2FADH2, '-1', false, 'left');
  cellState.fadh2 -= 1;
  updateDashboard(svgDoc);
  particles.c2Electrons.forEach((el) => setElementActive(el, true));
  await delay(900);
  particles.c2FADH2.classList.remove('intake-highlight');
  popIntake.remove();

  particles.c2FAD.classList.add('product-highlight');
  const popProduct = createPopText(particles.c2FAD, '+1', true, 'left');
  cellState.fad += 1;
  cellState.matrixprotons += 2;
  matrixCounter.textContent = cellState.matrixprotons;
  updateDashboard(svgDoc);
  await delay(900);
  particles.c2FAD.classList.remove('product-highlight');
  popProduct.remove();
  await delay(400);

  setElementActive(paths.complex2toQ, true);
  await delay(800);
  setElementActive(paths.QtoQH2, true);
  setElementActive(paths.protonstoQ, true);
  await delay(1000);
  particles.c2Electrons.forEach((el) => setElementActive(el, false));
  setElementActive(particles.protonfeeder, false);
  cellState.matrixprotons -= 2;
  matrixCounter.textContent = cellState.matrixprotons;
  cellState.QH2count += 1;
  QH2counter.textContent = cellState.QH2count;
  ubiquinonehandler();
  updateDashboard(svgDoc);
  await delay(800);

  setElementActive(paths.complex2toQ, false);
  setElementActive(paths.QtoQH2, false);
  setElementActive(paths.protonstoQ, false);
  setElementActive(particles.protonfeeder, true);
  await delay(800);
  if(cellState.imsprotons > cellState.matrixprotons){
    setElementActive(complex5Btn, true);
  }
  else{setElementActive(complex5Btn, false);}
}

async function cytochromehandler() {
    cytCcounter.textContent = cellState.cytochrome;

  if(cellState.cytochrome >= 1){
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
    ].forEach((el) => setElementActive(el, true));

    [
      particles.cIVims1,
      particles.cIVims2,
      particles.cIVims3,
      particles.cIVims4,
    ].forEach((el) => setElementActive(el, false));
  }
}
async function handleComplex3Click() {
  // Complex III transfers QH2 electrons to cytochrome c and replenishes matrix Q.
    if(cellState.QH2count !== 0) {
     if(cellState.MatrixQstate < 2) {
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
        particles.c3Electrons.forEach((el) => setElementActive(el, true));
        await delay(800);
        setElementActive(paths.complex3tocytC, true);
        setElementActive(paths.complex3toQmat, true);
        await delay(400);
        particles.c3Electrons.forEach((el) => setElementActive(el, false));
        cellState.cytochrome += 1;
        cellState.MatrixQstate += 1;
        console.log(cellState.MatrixQstate);
        matrixubiquinonehandler();
        cytochromehandler();
        await delay(800);
        setElementActive(paths.complex3tocytC, false);
        setElementActive(paths.complex3toQmat, false);
        setElementActive(particles.c3ProtonsIMS, false);
        await delay(400);

     }
     else if(cellState.MatrixQstate === 2){

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
        particles.c3Electrons.forEach((el) => setElementActive(el, true));
        await delay(800);
        setElementActive(paths.complex3tocytC, true);
        setElementActive(paths.complex3toQmat, true);
        await delay(400);
        particles.c3Electrons.forEach((el) => setElementActive(el, false));
        cellState.cytochrome += 1;
        cellState.MatrixQstate = 1;
        console.log(cellState.MatrixQstate);
        matrixubiquinonehandler();
        cytochromehandler();
        await delay(800);
        setElementActive(paths.complex3tocytC, false);
        setElementActive(paths.complex3toQmat, false);
        setElementActive(particles.c3ProtonsIMS, false);
        await delay(400);

     }
    
}
  if(cellState.imsprotons > cellState.matrixprotons){
    setElementActive(complex5Btn, true);
  }
  else{setElementActive(complex5Btn, false);}
}

async function handleComplex4Click(){
 // Complex IV consumes cytochrome c, oxygen, and matrix protons to produce water.
 if(cellState.cytochrome >=1){
  if(cellState.cIVcycle === 0){
    setElementActive(paths.cytCtocIV, true);
    setElementActive(particles.cIVelec1, true);
    cellState.cytochrome -=1;
    cytCcounter.textContent = cellState.cytochrome;
    cellState.matrixprotons -= 1;
    matrixCounter.textContent = cellState.matrixprotons;
    await delay(100);
    setElementActive(particles.cIVmat1, false);
    await delay(100);
    setElementActive(particles.cIVims1, true);
    cellState.imsprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
    await delay(400);
    setElementActive(paths.cytCtocIV, false);
    cellState.cIVcycle += 1;
    cytochromehandler();
  }
  else if(cellState.cIVcycle === 1){
    setElementActive(paths.cytCtocIV, true);
    setElementActive(particles.cIVelec2, true);
    cellState.cytochrome -=1;
    cytCcounter.textContent = cellState.cytochrome;
    cellState.matrixprotons -= 1;
    matrixCounter.textContent = cellState.matrixprotons;
    await delay(100);
    setElementActive(particles.cIVmat2, false);
    await delay(100);
    setElementActive(particles.cIVims2, true);
    cellState.imsprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
    await delay(400);
    setElementActive(paths.cytCtocIV, false);
    setElementActive(particles.cIVoxygen, false);
    setElementActive(paths.oxygentocIV, true);
     const oxygenPop = createPopText(particles.cIVoxygen, '-1', false, 'left');
    cellState.o2 -= 1;
    updateDashboard(svgDoc);
         setElementActive(paths.electronstoO2, true);

         setElementActive(particles.cIVelec1, false);
     setElementActive(particles.cIVelec2, false);

    cellState.matrixprotons -= 2;
    matrixCounter.textContent = cellState.matrixprotons;

    await delay(600);
     oxygenPop.remove();
    setElementActive(paths.oxygentocIV, false);
    
         setElementActive(paths.electronstoO2, false);

    cellState.cIVcycle += 1;
    cytochromehandler();
  }
  else if(cellState.cIVcycle === 2){
    setElementActive(paths.cytCtocIV, true);
    setElementActive(particles.cIVelec1, true);
    cellState.cytochrome -=1;
    cytCcounter.textContent = cellState.cytochrome;
    cellState.matrixprotons -= 1;
    matrixCounter.textContent = cellState.matrixprotons;
    await delay(100);
    setElementActive(particles.cIVmat3, false);
    await delay(100);
    setElementActive(particles.cIVims3, true);
    cellState.imsprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
    await delay(400);
    setElementActive(paths.cytCtocIV, false);
    setElementActive(particles.cIVprotons, false);
    setElementActive(paths.protonstocIV, true);
     const protonPop = createPopText(particles.cIVprotons, '-1', false, 'left');

         setElementActive(paths.electronstoO2, true);

         setElementActive(particles.cIVelec1, false);
    
    await delay(600);
     protonPop.remove();
    setElementActive(particles.cIVprotons, true);
    setElementActive(paths.protonstocIV, false);
    
         setElementActive(paths.electronstoO2, false);

    setElementActive(paths.waterout, true);
    const waterPop = createPopText(particles.cIVwater, '+1', true, 'left');
    cellState.h2o += 1;
    updateDashboard(svgDoc);
    await delay(500);
    waterPop.remove();
    setElementActive(paths.waterout, false);

    cellState.cIVcycle += 1;
    cytochromehandler();
  }
  else if(cellState.cIVcycle === 3){
    setElementActive(paths.cytCtocIV, true);
    setElementActive(particles.cIVelec1, true);
    cellState.cytochrome -=1;
    cytCcounter.textContent = cellState.cytochrome;
    cellState.matrixprotons -= 1;
    matrixCounter.textContent = cellState.matrixprotons;
    await delay(100);
    setElementActive(particles.cIVmat4, false);
    await delay(100);
    setElementActive(particles.cIVims4, true);
    cellState.imsprotons += 1;
    imsCounter.textContent = cellState.imsprotons;
    await delay(400);
    setElementActive(paths.cytCtocIV, false);
    setElementActive(particles.cIVprotons, false);
    setElementActive(paths.protonstocIV, true);
     const protonPop = createPopText(particles.cIVprotons, '-1', false, 'left');

         setElementActive(paths.electronstoO2, true);

         setElementActive(particles.cIVelec1, false);
    
    await delay(600);
     protonPop.remove();
    setElementActive(particles.cIVprotons, true);
    setElementActive(paths.protonstocIV, false);
    
         setElementActive(paths.electronstoO2, false);

    setElementActive(paths.waterout, true);
    const waterPop = createPopText(particles.cIVwater, '+1', true, 'left');
    cellState.h2o += 1;
    updateDashboard(svgDoc);
    await delay(500);
    waterPop.remove();
    setElementActive(paths.waterout, false);

    cellState.cIVcycle = 0;
    cytochromehandler();

  }

 }
  if(cellState.imsprotons > cellState.matrixprotons){
    setElementActive(complex5Btn, true);
  }
  else{setElementActive(complex5Btn, false);}
}

async function cringhandler(){
  setElementActive(synthase.synthaseims1, false);
  cellState.imsprotons -= 1;
  cellState.matrixprotons += 1;
  imsCounter.textContent = cellState.imsprotons;
  matrixCounter.textContent = cellState.matrixprotons;
  
  if(cellState.imshalfchannel < 8){
    setElementActive(synthase[`cring${cellState.imshalfchannel}`],true);
        isVisible(synthase[`IMSt${cellState.imshalfchannel}`], false);
    isVisible(synthase[`IMSt${cellState.imshalfchannel+1}`], true);
    cellState.imshalfchannel +=1;

  }
  else if (cellState.imshalfchannel === 8){
    setElementActive(synthase.cring8 ,true);
    cellState.imshalfchannel = 1;
    isVisible(synthase.IMSt8, false);
    isVisible(synthase.IMSt1, true);
  }
  await delay(100);

    if(cellState.mathalfchannel < 8){
      setElementActive(synthase[`cring${cellState.mathalfchannel}`],false);
      isVisible(synthase[`MATt${cellState.mathalfchannel}`], false);
    isVisible(synthase[`MATt${cellState.mathalfchannel+1}`], true);
    cellState.mathalfchannel +=1;
  }
  else if (cellState.mathalfchannel === 8){
    setElementActive(synthase.cring8,false);
    cellState.mathalfchannel = 1;
     isVisible(synthase.MATt8, false);
    isVisible(synthase.MATt1, true);
  }
      setElementActive(synthase.synthasemat1, true);
    await delay(400);
    setElementActive(synthase.synthaseims1, true);
    setElementActive(synthase.synthasemat1, false);

}
async function atphandler(){
  const nextBetaState = { 'O:': 'L:', 'L:': 'T:', 'T:': 'O:' };
  const textForBetaState = { 'O:': 'EMPTY', 'L:': 'ADP', 'T:': 'ATP' };
  const popTexts = [];

  for (let i = 1; i <= 3; i++) {
    const betaKey = `beta${i}`;
    const currentState = strings[betaKey];
    const nextState = nextBetaState[currentState] ?? currentState;

    if (currentState === 'O:' && nextState === 'L:') {
      popTexts.push(createPopText(synthase.ADP, '-1', false, 'left'));
    } else if (currentState === 'T:' && nextState === 'O:') {
      popTexts.push(createPopText(synthase.ATP, '+1', true, 'left'));
    }

    strings[betaKey] = nextState;
    synthase[betaKey].textContent = strings[betaKey];

    for (const textState of ['ATP', 'ADP', 'EMPTY']) {
      isVisible(
        synthase[`${betaKey}text${textState}`],
        textState === textForBetaState[nextState],
      );
    }
  }

  if (popTexts.length > 0) {
    await delay(800);
    popTexts.forEach((popText) => popText.remove());
  }
}
async function handleComplex5Click(){
  if(cellState.imsprotons > cellState.matrixprotons){
    if(cellState.synthaserunstate === 0){
    cringhandler();
    strings.rotation = "045";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
   else if(cellState.synthaserunstate === 1){
    cringhandler();
    strings.rotation = "090";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
   else if(cellState.synthaserunstate === 2){
    cringhandler();
    strings.rotation = "120";
    synthase.rotationtext.textContent = strings.rotation;
        atphandler();
    await delay (800);

    strings.rotation = "135";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
  else if(cellState.synthaserunstate === 3){
    cringhandler();
    strings.rotation = "180";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
   else if(cellState.synthaserunstate === 4){
    cringhandler();
    strings.rotation = "225";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
   else if(cellState.synthaserunstate === 5){
    cringhandler();
    strings.rotation = "240";
    synthase.rotationtext.textContent = strings.rotation;
    atphandler();
        await delay (800);

 
    strings.rotation = "270";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
  else if(cellState.synthaserunstate === 6){
    cringhandler();
    strings.rotation = "315";
    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate +=1;    
  }
  else if(cellState.synthaserunstate === 7){
    cringhandler();
    strings.rotation = "000";
    atphandler();

    synthase.rotationtext.textContent = strings.rotation;
    cellState.synthaserunstate = 0;    
  }
}
  if(cellState.imsprotons > cellState.matrixprotons){
    setElementActive(complex5Btn, true);
  }
  else{setElementActive(complex5Btn, false);}

}

  complex1Btn.addEventListener('click', handleComplex1Click);


  complex2Btn.addEventListener('click', handleComplex2Click);


  complex3Btn.addEventListener('click', handleComplex3Click);

  complex4Btn.addEventListener('click', handleComplex4Click);
  
  complex5Btn.addEventListener('click', handleComplex5Click);

}
