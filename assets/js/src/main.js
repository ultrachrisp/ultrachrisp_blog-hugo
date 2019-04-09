import { Particle } from './particles';

const initDashboard = () => {

    setCanvasSize({anim});
    preRender({anim});

    window.requestAnimationFrame(animateParticles);
};

const createObject = () => {
    const animation = {
        colours: ['#F0325A', '#FF780F', '#960528'],
        grid: null,
        particles: null,
        offscreenCanvases: [],
        time: 0,
        svgWidth: 75,
        preRenderCanvases: [],
        grid: [],
        particles: [],
        currentTime: 0,
        start: -1,

        element: document.getElementById('dashboard'),
        canvas: document.createElement('canvas'),
    };

    animation.element.innerHTML = "";
    animation.element.appendChild(animation.canvas);

    animation.context = animation.canvas.getContext('2d');
    animation.element.appendChild(animation.canvas);

    return animation;
};

const setCanvasSize = ({anim}) => {
    const availableWidth = anim.canvas.width = anim.canvas.height = anim.element.getBoundingClientRect().width;

    // if(availableWidth % anim.svgWidth > 1){
    const space = availableWidth % anim.svgWidth,
          halfTile = anim.svgWidth / 2,
          // temp3 = (space > halfTile)?
          newWidth = tileSizeIncrease({
              width: availableWidth,
              limit: anim.svgWidth,
              num: anim.svgWidth+1 });
          // temp3 = tileSizeDecrease({
          //     width: availableWidth,
          //     limit: anim.svgWidth,
          //     num: anim.svgWidth-1}) ;
     // console.log(space,' ',halfTile,' ',temp3,' ',availableWidth,' ',anim.svgWidth,' ',availableWidth % anim.svgWidth,' ',availableWidth / temp3);
    anim.svgWidth = newWidth;

    anim.grid = setGrid({canvas:anim.canvas, svgWidth:anim.svgWidth});
    anim.particles = createParticles({anim});

    return {};
};

const createParticles = ({anim}) => {
    const particles = [];

    anim.grid.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
            const obj = new Particle({x: rIndex, y:cIndex, anim});
            // const obj = Particle({x: rIndex, y:cIndex, anim});
            anim.grid[rIndex][cIndex] = obj;
            particles.push(obj);
            Particle.stuffs();
        });
    });

    return particles;
};

const setGrid = ({canvas, svgWidth}) => {
    const coloumns = Math.floor(canvas.width / svgWidth),
          rows = Math.floor(canvas.width / svgWidth);

    return (new Array(coloumns).fill(0).map( () => new Array(rows).fill(0)) );
};

const tileSizeIncrease = ({width, limit, num}) => {
    // local optima
    return (width % num < limit)? tileSizeIncrease({width, limit, num: num+1}) : num-1;
};

const preRender = ({anim}) => {

    let num = anim.colours.length;

    while(num--){
        anim.preRenderCanvases.push(preRenderCanvas(anim.colours[num]) );
    }
};

const preRenderCanvas = (colour) => {
    const circle = document.createElement('canvas');
    circle.width =  circle.height = anim.svgWidth;
    
    const circleCxt = circle.getContext('2d'),
          svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115" width="75px" height="75px"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;}.cls-1,.cls-2,.cls-3,.cls-4{stroke:'+colour+';stroke-miterlimit:10;}.cls-1,.cls-2{stroke-linecap:round;}.cls-2,.cls-3,.cls-4{stroke-width:5px;}.cls-4{fill:#fff;}</style></defs><g><path class="cls-2" d="M33.18,26.1a40,40,0,0,1,54,4.8"/><path class="cls-3" d="M87.15,30.9A40,40,0,0,1,94.23,74"/><circle class="cls-4" cx="94.38" cy="73.73" r="8"/><path class="cls-2" d="M82.38,89.47a40,40,0,0,1-54-4.8"/><path class="cls-3" d="M28.41,84.67a40.09,40.09,0,0,1-7.08-43.15"/><circle class="cls-4" cx="21.18" cy="41.84" r="8"/></g></svg>',
        uri = encodeURIComponent(svg),

          
        img = new window.Image();
    img.onload = () => {
        circleCxt.drawImage(img, 0, 0, anim.svgWidth, anim.svgWidth);
    };
    img.src = "data:image/svg+xml,"+uri;

    return circle;
};

const updateParticles = () => {
    let i = anim.particles.length;
    while(i--){
        anim.particles[i].update();
    }
};

const renderParticle = () => {
    anim.context.clearRect(0, 0, anim.canvas.width, anim.canvas.height);
    let i = anim.particles.length;
    while(i--){
        anim.particles[i].draw();
    }
};

const animateParticles = (timestamp) => {
    if(anim.start === -1) anim.start = timestamp;
    anim.currentTime = timestamp - anim.start;
    // randomClick();
    updateParticles();
    renderParticle();
    window.requestAnimationFrame(animateParticles);
};

const anim = createObject();
initDashboard();
