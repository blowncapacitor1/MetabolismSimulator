async function handleComplex1Click() {
    // Complex I transfers electrons from NADH and pumps four matrix protons.
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
    //cellState.matrixprotons -= 1;
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
    //setElementActive(particles.protonfeeder, false);
    //cellState.matrixprotons -= 2;
    //matrixCounter.textContent = cellState.matrixprotons;
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