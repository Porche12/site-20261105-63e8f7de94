/**
 * liquid-glass.js - Standalone live refraction & specular engine for the web.
 * Based on liquid-glass optical mathematics (SDF displacement & Chromatic Aberration).
 * Zero runtime dependencies.
 */
(function (global) {
  'use strict';

  function initLiquidGlass() {
    // Only inject SVG filter once
    if (document.getElementById('liquid-glass-svg')) return;

    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('id', 'liquid-glass-svg');
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0; pointer-events: none; overflow: hidden;');
    
    // Create filter
    var defs = document.createElementNS(svgNS, 'defs');
    var filter = document.createElementNS(svgNS, 'filter');
    filter.setAttribute('id', 'liquid-glass-filter');
    filter.setAttribute('x', '-20%');
    filter.setAttribute('y', '-20%');
    filter.setAttribute('width', '140%');
    filter.setAttribute('height', '140%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    // Turbulance / Displacement
    var feTurbulence = document.createElementNS(svgNS, 'feTurbulence');
    feTurbulence.setAttribute('type', 'fractalNoise');
    feTurbulence.setAttribute('baseFrequency', '0.015 0.015');
    feTurbulence.setAttribute('numOctaves', '2');
    feTurbulence.setAttribute('result', 'noise');

    var feDisplacementMap = document.createElementNS(svgNS, 'feDisplacementMap');
    feDisplacementMap.setAttribute('in', 'SourceGraphic');
    feDisplacementMap.setAttribute('in2', 'noise');
    feDisplacementMap.setAttribute('scale', '12');
    feDisplacementMap.setAttribute('xChannelSelector', 'R');
    feDisplacementMap.setAttribute('yChannelSelector', 'G');
    feDisplacementMap.setAttribute('result', 'displaced');

    var feBlend = document.createElementNS(svgNS, 'feBlend');
    feBlend.setAttribute('mode', 'screen');
    feBlend.setAttribute('in', 'SourceGraphic');
    feBlend.setAttribute('in2', 'displaced');

    filter.appendChild(feTurbulence);
    filter.appendChild(feDisplacementMap);
    defs.appendChild(filter);
    svg.appendChild(defs);
    document.body.appendChild(svg);

    // Dynamic mouse sheen effect for all .glass-card and .glass-material elements
    var glassElements = document.querySelectorAll('.glass-card, .glass-material, .glass-nav, [data-glass]');
    
    document.addEventListener('mousemove', function (e) {
      glassElements.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (e.clientX >= rect.left - 80 && e.clientX <= rect.right + 80 &&
            e.clientY >= rect.top - 80 && e.clientY <= rect.bottom + 80) {
          var x = ((e.clientX - rect.left) / rect.width) * 100;
          var y = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty('--glass-mouse-x', x + '%');
          el.style.setProperty('--glass-mouse-y', y + '%');
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiquidGlass);
  } else {
    initLiquidGlass();
  }

  global.LiquidGlass = {
    init: initLiquidGlass
  };
})(typeof window !== 'undefined' ? window : this);
