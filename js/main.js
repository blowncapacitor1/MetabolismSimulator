//import { initGlycolysis } from './glycolysis.js';
//import { initPCR } from './pcr.js';
import { cellState, updateDashboard } from 'state.js';
//import { initTCA } from './tca.js';
import { initETC } from './electrontransportchain.js';
window.addEventListener('DOMContentLoaded', () => {
  const svgObject = document.getElementById('svg-object');

  svgObject.addEventListener('load', () => {
    const svgDoc = svgObject.contentDocument;

    if (svgDoc) {
      // Inject global container styles
      const styleEl = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = `
        .molecule-dashboard {
          background-color: #ffffff !important;
          color: #000000 !important;
        }
      `;
      svgDoc.querySelector('svg').appendChild(styleEl);

      // Initialize UI with baseline values
      updateDashboard(svgDoc);

      // Initialize pathway handlers with shared state
      //initGlycolysis(svgDoc, cellState);
      //initPCR(svgDoc, cellState);
      //initTCA(svgDoc, cellState);
      initETC(svgDoc, cellState);
    } else {
      console.error('Could not access SVG document');
    }
  });
});
