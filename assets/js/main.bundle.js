'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { Tester } from 'particles.js';

var initDashboard = function initDashboard() {

    setCanvasSize({ anim: anim });
    preRender({ anim: anim });

    window.requestAnimationFrame(animateParticles);
};

var createObject = function createObject() {
    var _animation;

    var animation = (_animation = {
        colours: ['#FF780F', '#960528', '#F0325A'],
        grid: null,
        particles: null,
        offscreenCanvases: [],
        time: 0,
        svgWidth: 75,
        preRenderCanvases: []
    }, _defineProperty(_animation, 'grid', []), _defineProperty(_animation, 'particles', []), _defineProperty(_animation, 'currentTime', 0), _defineProperty(_animation, 'start', -1), _defineProperty(_animation, 'element', document.getElementById('dashboard')), _defineProperty(_animation, 'canvas', document.createElement('canvas')), _animation);

    animation.element.innerHTML = "";
    animation.element.appendChild(animation.canvas);

    animation.context = animation.canvas.getContext('2d');
    animation.element.appendChild(animation.canvas);

    return animation;
};

var setCanvasSize = function setCanvasSize(_ref) {
    var anim = _ref.anim;

    var availableWidth = anim.canvas.width = anim.canvas.height = anim.element.getBoundingClientRect().width;

    // if(availableWidth % anim.svgWidth > 1){
    var space = availableWidth % anim.svgWidth,
        halfTile = anim.svgWidth / 2,

    // temp3 = (space > halfTile)?
    newWidth = tileSizeIncrease({
        width: availableWidth,
        limit: anim.svgWidth,
        num: anim.svgWidth + 1 });
    // temp3 = tileSizeDecrease({
    //     width: availableWidth,
    //     limit: anim.svgWidth,
    //     num: anim.svgWidth-1}) ;
    // console.log(space,' ',halfTile,' ',temp3,' ',availableWidth,' ',anim.svgWidth,' ',availableWidth % anim.svgWidth,' ',availableWidth / temp3);
    anim.svgWidth = newWidth;

    anim.grid = setGrid({ canvas: anim.canvas, svgWidth: anim.svgWidth });
    anim.particles = createParticles({ anim: anim });

    return {};
};

var createParticles = function createParticles(_ref2) {
    var anim = _ref2.anim;

    var particles = [];

    anim.grid.map(function (row, rIndex) {
        return row.map(function (cell, cIndex) {
            var obj = createParticule({ x: rIndex, y: cIndex, anim: anim });
            anim.grid[rIndex][cIndex] = obj;
            particles.push(obj);
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
    return width % num < limit ? tileSizeIncrease({ width: width, limit: limit, num: num + 1 }) : num - 1;
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

var createParticule = function createParticule(_ref6) {
    var x = _ref6.x,
        y = _ref6.y,
        anim = _ref6.anim;

    var p = {};
    p.xArr = x;
    p.yArr = y;
    p.distanceFromSpecial = 0;
    p.xPos = x * anim.svgWidth;
    p.yPos = y * anim.svgWidth;
    p.width = anim.svgWidth;
    p.centre = p.width / 2;
    p.halfW = p.width / 2;
    p.alpha = 0;
    p.delay = 0;
    p.fadingStart = p.xPos * 0.5 + p.yPos * 0.5;
    // p.colour = getColour(p.xPos/ftue.iconW, p.yPos/ftue.iconW);
    p.colour = 0;
    p.outroStart = 0;

    // flags
    p.state = 'fadeIn';

    p.remove = false;
    p.bigger = false;
    p.colourChange = false;
    // p.tweening = false;

    p.speed = 1;

    p.angle = 0;
    p.radians = Math.PI / 180;

    p.fadeIn = function () {
        if (p.fadingStart + p.delay <= anim.currentTime) {
            p.alpha += 0.1;

            if (p.alpha >= 1) {
                p.state = 'spin';
            }
        }
    };

    p.fadeOut = function () {
        if (p.fadingStart + p.delay <= anim.currentTime) {
            p.alpha -= 0.2;

            if (p.alpha < 0.1) {
                p.remove = true;
            }
        }
    };

    p.pulse = function () {
        if (!p.bigger) {
            p.width = p.width * 0.98;
            if (p.width < 20) {
                p.bigger = true;
                p.colour = anim.colours.length - 1;
            }
        } else if (p.bigger) {
            p.width = p.width * 1.05;
            p.colour = getHoverColour(p);

            if (p.width >= ftue.iconW) {
                p.width = ftue.iconW;
                p.bigger = false;
            }
        }

        p.halfW = p.width / 2;
    };

    p.hover = function () {
        if (!p.bigger) {
            p.width = p.width * 0.9;
            if (p.width < 20) {
                p.bigger = true;
                p.colourChange = true;
            }
        } else if (p.bigger) {
            p.width = p.width * 1.1;
            p.colour = getHoverColour(p);

            if (p.width >= anim.svgWidth) {
                p.width = anim.svgWidth;
                p.bigger = false;
                p.state = 'spin';
            }
        }

        p.halfW = p.width / 2;
    };

    p.wave = function () {
        if (p.distanceFromSpecial + p.delay <= anim.currentTime) {
            if (!p.bigger) {
                p.width = p.width * 0.9;
                if (p.width < 20) {
                    p.bigger = true;
                    p.colourChange = true;
                }
            } else if (p.bigger) {
                p.width = p.width * 1.1;
                p.colour = getWaveColour(p);

                if (p.width >= anim.svgWidth) {
                    p.width = anim.svgWidth;
                    p.bigger = false;
                    p.state = 'spin';
                }
            }

            p.halfW = p.width / 2;
        }
    };

    p.click = function () {
        p.width = p.width * 0.85;
        p.halfW = p.width / 2;
        if (p.width < 5) {
            p.remove = true;
        }
    };

    p.update = function () {
        p.angle = p.angle > 360 ? 0 : p.angle + p.speed;
        p.rAngle = p.angle * p.radians;

        switch (p.state) {
            case 'special':
                p.pulse();break;
            case 'wave':
                p.wave();break;
            case 'fadeIn':
                p.fadeIn();break;
            case 'fadeOut':
                p.fadeOut();break;
            case 'hover':
                p.hover();break;
            case 'click':
                p.click();break;
            default:
                p.state = 'spin';
        }
    };

    p.draw = function () {
        if (p.state === 'fadeIn' || p.state === 'fadeOut') {
            anim.context.globalAlpha = p.alpha;
        }
        // console.log(anim.preRenderCanvases, p.colour);
        if (!p.remove) {
            anim.context.save();
            anim.context.translate(p.xPos + p.centre, p.yPos + p.centre);
            anim.context.rotate(p.rAngle);
            anim.context.drawImage(anim.preRenderCanvases[p.colour], -p.halfW, -p.halfW, p.width, p.width);
            anim.context.restore();
        }

        if (p.state === 'fadeOut') {
            anim.context.globalAlpha = 1;
        }
    };

    return p;
};

var updateParticles = function updateParticles() {
    var i = anim.particles.length;
    while (i--) {
        anim.particles[i].update();
    }
};

var renderParticle = function renderParticle() {
    anim.context.clearRect(0, 0, anim.canvas.width, anim.canvas.height);
    // console.log('testing');
    var i = anim.particles.length;
    while (i--) {
        anim.particles[i].draw();
    }
};

var animateParticles = function animateParticles(timestamp) {
    if (anim.start === -1) anim.start = timestamp;
    anim.currentTime = timestamp - anim.start;
    // randomClick();
    updateParticles();
    renderParticle();
    window.requestAnimationFrame(animateParticles);
};

var anim = createObject();
initDashboard();
