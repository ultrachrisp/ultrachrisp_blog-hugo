(function (_defineProperty, _classCallCheck) {
    'use strict';

    _defineProperty = _defineProperty && _defineProperty.hasOwnProperty('default') ? _defineProperty['default'] : _defineProperty;
    _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;

    var Particle = function Particle() {
      _classCallCheck(this, Particle);

      _defineProperty(this, "stuffs", function () {
        console.log('derp');
      });
    };

    var initDashboard = function initDashboard() {
      setCanvasSize({
        anim: anim
      });
      preRender({
        anim: anim
      });
      window.requestAnimationFrame(animateParticles);
    };

    var createObject = function createObject() {
      var _animation;

      // const test = Tester;
      console.log('whats up');
      var animation = (_animation = {
        colours: ['#F0325A', '#FF780F', '#960528'],
        grid: null,
        particles: null,
        offscreenCanvases: [],
        time: 0,
        svgWidth: 75,
        preRenderCanvases: []
      }, _defineProperty(_animation, "grid", []), _defineProperty(_animation, "particles", []), _defineProperty(_animation, "currentTime", 0), _defineProperty(_animation, "start", -1), _defineProperty(_animation, "element", document.getElementById('dashboard')), _defineProperty(_animation, "canvas", document.createElement('canvas')), _animation);
      animation.element.innerHTML = "";
      animation.element.appendChild(animation.canvas);
      animation.context = animation.canvas.getContext('2d');
      animation.element.appendChild(animation.canvas);
      return animation;
    };

    var setCanvasSize = function setCanvasSize(_ref) {
      var anim = _ref.anim;
      var availableWidth = anim.canvas.width = anim.canvas.height = anim.element.getBoundingClientRect().width; // if(availableWidth % anim.svgWidth > 1){

      var space = availableWidth % anim.svgWidth,
          halfTile = anim.svgWidth / 2,
          // temp3 = (space > halfTile)?
      newWidth = tileSizeIncrease({
        width: availableWidth,
        limit: anim.svgWidth,
        num: anim.svgWidth + 1
      }); // temp3 = tileSizeDecrease({
      //     width: availableWidth,
      //     limit: anim.svgWidth,
      //     num: anim.svgWidth-1}) ;
      // console.log(space,' ',halfTile,' ',temp3,' ',availableWidth,' ',anim.svgWidth,' ',availableWidth % anim.svgWidth,' ',availableWidth / temp3);

      anim.svgWidth = newWidth;
      anim.grid = setGrid({
        canvas: anim.canvas,
        svgWidth: anim.svgWidth
      });
      anim.particles = createParticles({
        anim: anim
      });
      return {};
    };

    var createParticles = function createParticles(_ref2) {
      var anim = _ref2.anim;
      var particles = [];
      anim.grid.map(function (row, rIndex) {
        return row.map(function (cell, cIndex) {
          // const obj = Particle({x: rIndex, y:cIndex, anim});
          // anim.grid[rIndex][cIndex] = obj;
          // particles.push(obj);
          // Particle.stuffs();
          var particle = new Particle();
          particle.stuffs();
        });
      });
      return particles;
    };

    var setGrid = function setGrid(_ref3) {
      var canvas = _ref3.canvas,
          svgWidth = _ref3.svgWidth;
      var coloumns = Math.floor(canvas.width / svgWidth),
          rows = Math.floor(canvas.width / svgWidth);
      return new Array(coloumns).fill(0).map(function () {
        return new Array(rows).fill(0);
      });
    };

    var tileSizeIncrease = function tileSizeIncrease(_ref4) {
      var width = _ref4.width,
          limit = _ref4.limit,
          num = _ref4.num;
      // local optima
      return width % num < limit ? tileSizeIncrease({
        width: width,
        limit: limit,
        num: num + 1
      }) : num - 1;
    };

    var preRender = function preRender(_ref5) {
      var anim = _ref5.anim;
      var num = anim.colours.length;

      while (num--) {
        anim.preRenderCanvases.push(preRenderCanvas(anim.colours[num]));
      }
    };

    var preRenderCanvas = function preRenderCanvas(colour) {
      var circle = document.createElement('canvas');
      circle.width = circle.height = anim.svgWidth;
      var circleCxt = circle.getContext('2d'),
          svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115" width="75px" height="75px"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;}.cls-1,.cls-2,.cls-3,.cls-4{stroke:' + colour + ';stroke-miterlimit:10;}.cls-1,.cls-2{stroke-linecap:round;}.cls-2,.cls-3,.cls-4{stroke-width:5px;}.cls-4{fill:#fff;}</style></defs><g><path class="cls-2" d="M33.18,26.1a40,40,0,0,1,54,4.8"/><path class="cls-3" d="M87.15,30.9A40,40,0,0,1,94.23,74"/><circle class="cls-4" cx="94.38" cy="73.73" r="8"/><path class="cls-2" d="M82.38,89.47a40,40,0,0,1-54-4.8"/><path class="cls-3" d="M28.41,84.67a40.09,40.09,0,0,1-7.08-43.15"/><circle class="cls-4" cx="21.18" cy="41.84" r="8"/></g></svg>',
          uri = encodeURIComponent(svg),
          img = new window.Image();

      img.onload = function () {
        circleCxt.drawImage(img, 0, 0, anim.svgWidth, anim.svgWidth);
      };

      img.src = "data:image/svg+xml," + uri;
      return circle;
    };

    var updateParticles = function updateParticles() {
      var i = anim.particles.length;

      while (i--) {
        anim.particles[i].update();
      }
    };

    var renderParticle = function renderParticle() {
      anim.context.clearRect(0, 0, anim.canvas.width, anim.canvas.height); // console.log('testing');

      var i = anim.particles.length;

      while (i--) {
        anim.particles[i].draw();
      }
    };

    var animateParticles = function animateParticles(timestamp) {
      if (anim.start === -1) anim.start = timestamp;
      anim.currentTime = timestamp - anim.start; // randomClick();

      updateParticles();
      renderParticle();
      window.requestAnimationFrame(animateParticles);
    };

    var anim = createObject();
    initDashboard();

}(_defineProperty, _classCallCheck));
