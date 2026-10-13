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

  const cringBaseTransform = synthase.cring.getAttribute('transform');

  const particles = {
    cIIprotons: svgDoc.getElementById('cIIprotons'),
    cIprotons: svgDoc.getElementById('cIprotons'),
    c1NADH: svgDoc.getElementById('cINADH'),
    c1NAD: svgDoc.getElementById('cINAD'),
    c2Succinate: svgDoc.getElementById('cIISuccinate'),
    c2Fumarate: svgDoc.getElementById('cIIFumarate'),
    cIVwater: svgDoc.getElementById('cIVwater'),
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
    oxygentocIV: svgDoc.getElementById('oxygentocIV'),
  };

  const cmplx4 = {
        cIVprotons: svgDoc.getElementById('cIVprotons'),
    waterout: svgDoc.getElementById('waterout'),

    cIVmat1: svgDoc.getElementById('cIVmat1'),
    cIVmat2: svgDoc.getElementById('cIVmat2'),
    cIVmat3: svgDoc.getElementById('cIVmat3'),
    cIVmat4: svgDoc.getElementById('cIVmat4'),
    cIVims1: svgDoc.getElementById('cIVims1'),
    cIVims2: svgDoc.getElementById('cIVims2'),
    cIVims3: svgDoc.getElementById('cIVims3'),
    cIVims4: svgDoc.getElementById('cIVims4'),
    iron_dioxygen: svgDoc.getElementById('iron_dioxygen'),
    iron_oxygen2minus: svgDoc.getElementById('iron_oxygen2-'),
    iron_water: svgDoc.getElementById('iron_water'),
    iron_hydroxide: svgDoc.getElementById('iron_hydroxide'),
    Y_OH: svgDoc.getElementById('Y_OH'),
    Y_Ominus: svgDoc.getElementById('Y_O-'),
    Y_Oradical: svgDoc.getElementById('Y_Oradical'),
    copper_hydroxide: svgDoc.getElementById('copper_hydroxide'),
    copper_water: svgDoc.getElementById('copper_water'),
    YtoFe: svgDoc.getElementById('YtoFe'),
    YtoCu: svgDoc.getElementById('YtoCu'),
    O2in: svgDoc.getElementById('O2in'),
    protonstocIV: svgDoc.getElementById('protonstocIV'),
    cIVoxygen: svgDoc.getElementById('cIVoxygen'),
    h2o_out: svgDoc.getElementById('h2o_out'),
    iron_h2o_out: svgDoc.getElementById('iron_h2o_out'),
    copper_h2o_out: svgDoc.getElementById('copper_h2o_out'),
    scission: svgDoc.getElementById('scission'),

    STATE_R: svgDoc.getElementById('STATE_R'),
    STATE_A: svgDoc.getElementById('STATE_A'),
    STATE_Pm: svgDoc.getElementById('STATE_Pm'),
    STATE_Pr: svgDoc.getElementById('STATE_Pr'),
    STATE_F: svgDoc.getElementById('STATE_F'),
    STATE_Oh: svgDoc.getElementById('STATE_Oh'),
    STATE_Eh: svgDoc.getElementById('STATE_Eh'),
  };

  const counters = {
    ims: svgDoc.getElementById('imsCount'),
    matrix: svgDoc.getElementById('matrixCount'),
    QH2: svgDoc.getElementById('QH2counter'),
    cytC: svgDoc.getElementById('cytCcounter'),
  };

  return { buttons, synthase, particles, paths, cmplx4, counters, cringBaseTransform };
}