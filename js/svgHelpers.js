export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Apply the active or gray visual state to an SVG element or group.
export function setElementActive(el, isActive) {
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

export function isVisible(el, isActive) {
  if (!el) return;
  const targets = el.tagName?.toLowerCase() === 'g'
    ? Array.from(el.querySelectorAll('path, circle, rect, text, tspan'))
    : [el];

  targets.forEach((target) => {
    target.style.opacity = isActive ? '1' : '0';
  });
}

// Create a temporary SVG label positioned relative to an animated particle.
// Needs svgDoc, so it is built by makeUI(svgDoc) below.
function makeCreatePopText(svgDoc) {
  return function createPopText(targetEl, text, isPositive, position = 'bottom') {
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
  };
}

// Bundle of UI helpers passed around on the context object.
export function makeUI(svgDoc) {
  return {
    delay,
    setElementActive,
    isVisible,
    createPopText: makeCreatePopText(svgDoc),
  };
}
