//import { initGlycolysis } from './glycolysis.js';
//import { initPCR } from './pcr.js';
import { cellState, updateDashboard } from './state.js';
//import { initTCA } from './tca.js';
import { initETC } from './electrontransportchain.js';
let dashboardResizeObserver;

window.addEventListener('DOMContentLoaded', () => {
  const svgObject = document.getElementById('svg-object');

  svgObject.addEventListener('load', () => {
    const svgDoc = svgObject.contentDocument;

    if (svgDoc) {
      const svgRoot = svgDoc.querySelector('svg');
      const tableTemplate = document.getElementById('molecule-dashboard-template');

      if (!svgRoot || !tableTemplate) {
        console.error('Could not initialize the molecule dashboard');
        return;
      }

      const viewBox = svgRoot.viewBox.baseVal;
      const viewBoxX = viewBox.x;
      const viewBoxY = viewBox.y;
      const viewBoxWidth = viewBox.width;
      const viewBoxHeight = viewBox.height;
      const dashboardWidth = viewBoxWidth * 0.46;
      const dashboardHeight = viewBoxHeight * 0.45;

      const getBoundsInSvg = (element) => {
        const bounds = element.getBBox();
        const rootInverse = svgRoot.getScreenCTM().inverse();
        const elementToRoot = rootInverse.multiply(element.getScreenCTM());
        const corners = [
          [bounds.x, bounds.y],
          [bounds.x + bounds.width, bounds.y],
          [bounds.x, bounds.y + bounds.height],
          [bounds.x + bounds.width, bounds.y + bounds.height],
        ].map(([x, y]) => {
          const point = svgRoot.createSVGPoint();
          point.x = x;
          point.y = y;
          return point.matrixTransform(elementToRoot);
        });
        const xValues = corners.map((point) => point.x);
        const yValues = corners.map((point) => point.y);
        const left = Math.min(...xValues);
        const top = Math.min(...yValues);

        return {
          x: left,
          y: top,
          width: Math.max(...xValues) - left,
          height: Math.max(...yValues) - top,
        };
      };

      const outerRedBox = Array.from(svgRoot.querySelectorAll('rect'))
        .filter((rect) => svgDoc.defaultView.getComputedStyle(rect).stroke === 'rgb(235, 64, 11)')
        .map((rect) => getBoundsInSvg(rect))
        .sort((a, b) => b.width * b.height - a.width * a.height)[0];
      const title = Array.from(svgRoot.querySelectorAll('text'))
        .find((element) => element.textContent.includes('Semi-Interactive'));
      const titleBounds = title ? getBoundsInSvg(title) : null;
      const dashboardGap = viewBoxWidth * 0.012;
      const dashboardX = outerRedBox
        ? outerRedBox.x + outerRedBox.width + dashboardGap
        : viewBoxX + viewBoxWidth + dashboardGap;
      const dashboardY = titleBounds
        ? titleBounds.y
        : viewBoxY + (viewBoxHeight - dashboardHeight) / 2;
      const expandedRight = Math.max(viewBoxX + viewBoxWidth, dashboardX + dashboardWidth);
      const expandedViewBoxWidth = expandedRight - viewBoxX;

      const styleEl = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'style');
      styleEl.textContent = `
        .molecule-dashboard,
        .molecule-dashboard * {
          box-sizing: border-box;
        }
        .molecule-dashboard .dashboard-content {
          display: flex;
          flex-direction: column;
          gap: ${viewBoxWidth * 0.012}px;
          width: 100%;
          height: auto;
          color: #000000;
          font-family: Arial, sans-serif;
        }
        .molecule-dashboard .table-wrapper {
          flex: 0 0 auto;
          width: 100%;
          overflow: hidden;
          border: 1px solid #000000;
          border-radius: 4px;
        }
        .molecule-dashboard table {
          width: 100%;
          height: auto;
          table-layout: fixed;
          border-collapse: collapse;
          border-radius: 0;
          overflow: hidden;
          background-color: #fff2a8;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent ${viewBoxWidth * 0.028}px,
            rgba(143, 124, 36, 0.11) ${viewBoxWidth * 0.028}px,
            rgba(143, 124, 36, 0.11) ${viewBoxWidth * 0.029}px
          );
        }
        .molecule-dashboard th,
        .molecule-dashboard td {
          padding: ${viewBoxWidth * 0.009}px ${viewBoxWidth * 0.008}px;
          font-size: ${viewBoxWidth * 0.02}px;
          white-space: nowrap;
          text-align: center;
        }
        .molecule-dashboard th:nth-child(1),
        .molecule-dashboard td:nth-child(1) {
          width: 25%;
          text-align: left;
        }
        .molecule-dashboard th:nth-child(2),
        .molecule-dashboard td:nth-child(2),
        .molecule-dashboard th:nth-child(4),
        .molecule-dashboard td:nth-child(4) {
          width: 20%;
        }
        .molecule-dashboard th:nth-child(3),
        .molecule-dashboard td:nth-child(3) {
          width: 35%;
          text-align: left;
          border-left: 2px solid #373839;
        }
        .molecule-dashboard .info-text-block {
          flex: 0 0 auto;
          width: 100%;
          padding: ${viewBoxWidth * 0.008}px 0 0;
          border: 1px solid #000000;
          border-radius: 4px;
          background-color: #fff2a8;
          background-image: repeating-linear-gradient(
            to bottom,
            transparent 0,
            transparent ${viewBoxWidth * 0.028}px,
            rgba(143, 124, 36, 0.11) ${viewBoxWidth * 0.028}px,
            rgba(143, 124, 36, 0.11) ${viewBoxWidth * 0.029}px
          );
          color: #241f0c;
        }
        .molecule-dashboard .info-text-block h3 {
          margin: 0;
          font-size: ${viewBoxWidth * 0.02}px;
          padding: 0 ${viewBoxWidth * 0.01}px;
        }
        .molecule-dashboard .info-text-block p {
          font-size: ${viewBoxWidth * 0.016}px;
          overflow-wrap: anywhere;
        }
        .molecule-dashboard .references-image-frame {
          padding: 0 ${viewBoxWidth * 0.012}px ${viewBoxWidth * 0.012}px;
        }
        .molecule-dashboard .references-image {
          display: block;
          width: 100%;
          height: auto;
        }
        .molecule-dashboard .reference-group {
          padding: ${viewBoxWidth * 0.006}px ${viewBoxWidth * 0.01}px;
        }
        .molecule-dashboard .reference-group h4 {
          margin: 0 0 ${viewBoxWidth * 0.004}px;
          font-size: ${viewBoxWidth * 0.018}px;
        }
        .molecule-dashboard .reference-citation {
          margin: 0 0 ${viewBoxWidth * 0.005}px;
          font-size: ${viewBoxWidth * 0.014}px;
          line-height: 1.35;
        }
      `;
      svgRoot.appendChild(styleEl);

      const dashboard = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
      dashboard.setAttribute('class', 'molecule-dashboard');
      dashboard.setAttribute('x', dashboardX);
      dashboard.setAttribute('y', dashboardY);
      dashboard.setAttribute('width', dashboardWidth);
      dashboard.setAttribute('height', dashboardHeight);
      dashboard.appendChild(svgDoc.importNode(tableTemplate.content, true));
      svgRoot.appendChild(dashboard);
      const referencesImage = dashboard.querySelector('.references-image');
      referencesImage.src = new URL(referencesImage.dataset.src, document.baseURI).href;

      svgRoot.setAttribute(
        'viewBox',
        `${viewBoxX} ${viewBoxY} ${expandedViewBoxWidth} ${viewBoxHeight}`,
      );
      const svgWrapper = document.querySelector('.svg-wrapper');
      const viewportWrapper = document.querySelector('.viewport-wrapper');
      const dashboardContent = dashboard.querySelector('.dashboard-content');
      const referenceImage = dashboard.querySelector('.references-image');
      const portraitQuery = window.matchMedia('(orientation: portrait)');
      let expandedViewBoxHeight = viewBoxHeight;
      const updatePortraitLayout = (centerArtwork = false) => {
        if (!portraitQuery.matches) {
          svgWrapper.style.width = '';
          svgWrapper.style.height = '';
          return;
        }

        const availableHeight = Math.max(1, viewportWrapper.clientHeight - 40);
        const scale = availableHeight / viewBoxHeight;
        const previousScrollLeft = viewportWrapper.scrollLeft;

        svgWrapper.style.width = `${expandedViewBoxWidth * scale}px`;
        svgWrapper.style.height = `${expandedViewBoxHeight * scale}px`;
        requestAnimationFrame(() => {
          viewportWrapper.scrollLeft = centerArtwork
            ? Math.max(0, (viewBoxWidth * scale - viewportWrapper.clientWidth) / 2)
            : previousScrollLeft;
        });
      };
      const updateDashboardSize = () => {
        let contentHeight = Math.ceil(dashboardContent.scrollHeight);
        const availableDashboardHeight = viewBoxY + viewBoxHeight - dashboardY;

        if (contentHeight > availableDashboardHeight && referenceImage.complete) {
          const overflow = contentHeight - availableDashboardHeight;
          const currentImageHeight = referenceImage.offsetHeight;
          const maxImageHeight = Math.max(0, currentImageHeight - overflow);
          referenceImage.style.maxHeight = `${maxImageHeight}px`;
          contentHeight = Math.ceil(dashboardContent.scrollHeight);
        }

        expandedViewBoxHeight = viewBoxHeight;
        contentHeight = Math.min(contentHeight, availableDashboardHeight);

        dashboard.setAttribute('height', contentHeight);
        svgRoot.setAttribute(
          'viewBox',
          `${viewBoxX} ${viewBoxY} ${expandedViewBoxWidth} ${viewBoxHeight}`,
        );
        svgWrapper.style.aspectRatio =
          `${expandedViewBoxWidth} / ${expandedViewBoxHeight}`;
        updatePortraitLayout();
      };

      window.addEventListener('resize', () => updatePortraitLayout(true));
      portraitQuery.addEventListener('change', () => updatePortraitLayout(true));
      updateDashboardSize();
      updatePortraitLayout(true);
      dashboardResizeObserver?.disconnect();
      dashboardResizeObserver = new svgDoc.defaultView.ResizeObserver(updateDashboardSize);
      dashboardResizeObserver.observe(dashboardContent);

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