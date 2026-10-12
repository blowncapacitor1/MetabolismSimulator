// Looks up every SVG element the ETC model touches, once, and groups them.
export function getETCElements(svgDoc) {
  const buttons = {
    I: svgDoc.getElementById('btnI'),
    II: svgDoc.getElementById('btnII'),
    III: svgDoc.getElementById('btnIII'),
    IV: svgDoc.getElementById('btnIV'),
    V: svgDoc.getElementById('synthaseBtn'),
  };

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
    cring: svgDoc.getElementById('cring'),
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
  };

  // Captured once at load so resets and rotations always start from the SVG's original transform.
  const cringBaseTransform = synthase.cring.getAttribute('transform');

  const particles = {
    cIIprotons: svgDoc.getElementById('cIIprotons'),
    cIprotons: svgDoc.getElementById('cIprotons'),
    c1NADH: svgDoc.getElementById('cINADH'),
    c1NAD: svgDoc.getElementById('cINAD'),
    c2Succinate: svgDoc.getElementById('cIISuccinate'),
    c2Fumarate: svgDoc.getElementById('cIIFumarate'),
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
    cIinput: svgDoc.getElementById('cIinput'),
    //stuff for cytochrome c oxidase
    cIVprotonsInside1: svgDoc.getElementById('cIVprotonsInside1'),
    cIVprotonsInside2: svgDoc.getElementById('cIVprotonsInside2'),
    cIVhydroxyInside1: svgDoc.getElementById('cIVhydroxyInside1'),
    cIVhydroxyInside2: svgDoc.getElementById('cIVhydroxyInside2'),
    cIVdioxygenInside: svgDoc.getElementById('cIVdioxygenInside'),
    cIVoxygenInside1: svgDoc.getElementById('cIVoxygenInside1'),
    cIVoxygenInside2: svgDoc.getElementById('cIVoxygenInside2'),
    cIVelec1: svgDoc.getElementById('cIVelec1'),
    cIVelec2: svgDoc.getElementById('cIVelec2'),
    
  };

  const paths = {
    protontocI: svgDoc.getElementById('protontocI'),
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

  const counters = {
    ims: svgDoc.getElementById('imsCount'),
    matrix: svgDoc.getElementById('matrixCount'),
    QH2: svgDoc.getElementById('QH2counter'),
    cytC: svgDoc.getElementById('cytCcounter'),
  };

  return { buttons, synthase, particles, paths, counters, cringBaseTransform };
}
