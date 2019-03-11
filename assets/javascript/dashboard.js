// Boilderplate from: https://github.com/villedieumorgan/npm-es6-build-boilerplate/blob/master/package.json

//import anime from 'animejs';

const init = () => {
    window.ftue = globalObject();
    setCanvasSize();
    preRenderer();

    window.requestAnimationFrame(animateParticles);
    window.addEventListener('resize', setCanvasSize, false);
};

const globalObject = () => {
    const ftue = {};
    // ftue.centerX = window.innerWidth / 2;
    // ftue.centerY = window.innerHeight / 2;
    ftue.pointerX = 0;
    ftue.pointerY = 0;
    // ftue.colours = ['#500A28', '#640032', '#AF144B', '#FA551E', '#F0325A', '#FF780F', '#960528'];
    ftue.colours = ['#F0325A', '#FF780F', '#960528'];
    ftue.iconW = 75;
    ftue.grid = null;
    ftue.particles = null;
    ftue.preRenderCanvases = [];
    ftue.currentTime = 0;

    ftue.testCount = 0;

    
    ftue.canvas = document.getElementById("ftue");
    // ftue.canvas.style.position = 'absolute';
    // ftue.canvas.style.top = '0px';
    // ftue.canvas.style.left = '0px';
    ftue.canvas.style.backgroundColor = 'transparent';
    ftue.context = ftue.canvas.getContext('2d');
    ftue.tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';

    ftue.canvas.addEventListener(ftue.tap, (evt) => {
        updateCoords(evt);
        
        const obj = findParticle(window);
        if(obj.state === 'spin' || obj.state === 'hover'){
            obj.state = 'click';
        } else if(obj.state === 'special'){
            setTimeout(createSpecialParticle, 2000);
            
            let i = ftue.particles.length;
            while(i--){
                ftue.particles[i].delay = ftue.currentTime;
                ftue.particles[i].state = 'wave';
    }
        }
    }, false);
    
    ftue.canvas.addEventListener('mousemove', (evt) => {
        updateCoords(evt);
        
        const obj = findParticle(window);
        if(obj.state !== 'fadeIn' && obj.state !== 'fadeOut' && obj.state !== 'hover' && obj.state !== 'special' && obj.state !== 'wave'){
            obj.state = 'hover';
        }
    }, false);
    
    return ftue;
};

const preRenderer = () => {
    let num = ftue.colours.length;

    while(num--){
        ftue.preRenderCanvases.push( preRenderCanvas(ftue.colours[num]) );
    }
};

const preRenderCanvas = (colour) => {
    const circle = document.createElement('canvas');
    circle.width = ftue.iconW;
    circle.height = ftue.iconW;
    
    const circleCxt = circle.getContext('2d'),
          svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 115" width="75px" height="75px"><defs><style>.cls-1,.cls-2,.cls-3{fill:none;}.cls-1,.cls-2,.cls-3,.cls-4{stroke:'+colour+';stroke-miterlimit:10;}.cls-1,.cls-2{stroke-linecap:round;}.cls-2,.cls-3,.cls-4{stroke-width:5px;}.cls-4{fill:#fff;}</style></defs><g><path class="cls-2" d="M33.18,26.1a40,40,0,0,1,54,4.8"/><path class="cls-3" d="M87.15,30.9A40,40,0,0,1,94.23,74"/><circle class="cls-4" cx="94.38" cy="73.73" r="8"/><path class="cls-2" d="M82.38,89.47a40,40,0,0,1-54-4.8"/><path class="cls-3" d="M28.41,84.67a40.09,40.09,0,0,1-7.08-43.15"/><circle class="cls-4" cx="21.18" cy="41.84" r="8"/></g></svg>',
        uri = encodeURIComponent(svg),

          
        img = new window.Image();
    img.onload = () => {
        circleCxt.drawImage(img, 0, 0, ftue.iconW, ftue.iconW);
    };
    img.src = "data:image/svg+xml,"+uri;

    return circle;
};

const setCanvasSize = () => {
    const { canvas } = window.ftue;
    canvas.width = canvas.height = canvas.parentElement.getBoundingClientRect().width;
    // console.log(canvas.parentElement.getBoundingClientRect().width);
    // = canvas.parentElement.offsetWidth;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.getContext('2d');

    ftue.grid = setGrid();
    ftue.particles = createParticles();

    createSpecialParticle();

    let widthCheck = document.getElementById("checker");
    console.log('temp',widthCheck.offsetWidth);
};

const findParticle = ({ftue}) => {
    const x = Math.floor(ftue.pointerX / ftue.iconW),
          y = Math.floor(ftue.pointerY / ftue.iconW);
    
    return (ftue.grid && ftue.grid[x] && ftue.grid[x][y])? ftue.grid[x][y]: {};
};

const setGrid = () => {
    const { canvas } = window.ftue,
          gridW = Math.floor(canvas.width / ftue.iconW),
          gridH = Math.floor(canvas.width / ftue.iconW);

    // ugly, thanks IE11
    const multiArray = new Array(gridW);
    for (var i = 0; i < gridW; i++) {
        multiArray[i] = new Array(gridH);
        for(var j = 0; j < gridH; j++){
            multiArray[i][j] = 0;
        }
    }
    return multiArray;
};

const createParticles = () => {
    const particles = [];

    ftue.grid.map((row, rIndex) => {
        return row.map((cell, cIndex) => {
            const obj = createParticule(rIndex, cIndex);
            ftue.grid[rIndex][cIndex] = obj;
            particles.push(obj);
        });
    });

    return particles;
};

const updateCoords = (evt) => {
  ftue.pointerX = evt.clientX || evt.touches[0].clientX;
  ftue.pointerY = evt.clientY || evt.touches[0].clientY;
};

const recursive = (val, length) => {
    return (val >= length)? recursive((val-length), length) : val;
};

const getColour = (x, y) => {
    const length = ftue.colours.length,
          xOut = recursive(x, length),
          yOut = recursive(y, length),
          sum = recursive( (xOut+yOut) ,length);

    return sum;
};

const getHoverColour = (p) => {
    if(!p.colourChange) return p.colour;
    p.colourChange = false;
    
    return ((p.colour + 1) >= ftue.colours.length)? 0 : (p.colour + 1);
};

const getWaveColour = (p) => {
    if(!p.colourChange) return p.colour;
    p.colourChange = false;
    
    return 0;
};

const createParticule = (x,y) => {
    const p = {};
    p.xArr = x;
    p.yArr = y;
    p.distanceFromSpecial = 0;
    p.xPos = x * ftue.iconW;
    p.yPos = y * ftue.iconW;
    p.width = ftue.iconW;
    p.centre = p.width / 2;
    p.halfW = p.width / 2;
    p.alpha = 0;
    p.delay = 0;
    p.fadingStart = (p.xPos * 0.5) + (p.yPos * 0.5);
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
    p.radians = Math.PI/180;

    p.fadeIn = () => {
        if((p.fadingStart + p.delay) <= ftue.currentTime){
            p.alpha += 0.1;
            
            if(p.alpha >= 1){
                p.state = 'spin';
            }
        }
    };

    p.fadeOut = () => {
        if((p.fadingStart + p.delay) <= ftue.currentTime){
            p.alpha -= 0.2;

            if(p.alpha < 0.1){
                p.remove = true;
            }
        }
    };

    p.pulse = () => {
        if(!p.bigger){
            p.width = p.width * 0.98;
            if(p.width < 20){
                p.bigger = true;
                p.colour = ftue.colours.length-1;
            }
        } else if(p.bigger){
            p.width = p.width * 1.05;
            p.colour = getHoverColour(p);
            
            if(p.width >= ftue.iconW){
                p.width = ftue.iconW;
                p.bigger = false;
            }
        }
        
        p.halfW = p.width / 2;
    };

    p.hover = () => {
        if(!p.bigger){
            p.width = p.width * 0.9;
            if(p.width < 20){
                p.bigger = true;
                p.colourChange = true;
            }
        } else if(p.bigger){
            p.width = p.width * 1.1;
            p.colour = getHoverColour(p);
            
            if(p.width >= ftue.iconW){
                p.width = ftue.iconW;
                p.bigger = false;
                p.state = 'spin';
            }
        }
        
        p.halfW = p.width / 2;
    };

    p.wave = () => {
        if((p.distanceFromSpecial + p.delay) <= ftue.currentTime){
            if(!p.bigger){
                p.width = p.width * 0.9;
                if(p.width < 20){
                    p.bigger = true;
                    p.colourChange = true;
                }
            } else if(p.bigger){
                p.width = p.width * 1.1;
                p.colour = getWaveColour(p);
                
                if(p.width >= ftue.iconW){
                    p.width = ftue.iconW;
                    p.bigger = false;
                    p.state = 'spin';
                }
            }
        
            p.halfW = p.width / 2;
        }
    };

    p.click = () => {
        p.width = p.width * 0.85;
        p.halfW = p.width / 2;
        if(p.width < 5){ p.remove = true; }
    };
    
    p.update = () => {
        p.angle = (p.angle > 360)? 0 : p.angle + p.speed;
        p.rAngle = p.angle * p.radians;

        switch(p.state){
        case 'special': p.pulse(); break;
        case 'wave': p.wave(); break;
        case 'fadeIn': p.fadeIn(); break;
        case 'fadeOut': p.fadeOut(); break;
        case 'hover':  p.hover(); break;
        case 'click':  p.click(); break;
        default: p.state = 'spin';
        }
    };

    p.draw = () => {
        if(p.state === 'fadeIn' || p.state === 'fadeOut'){
            ftue.context.globalAlpha = p.alpha;
        }
        
        if(!p.remove){
            ftue.context.save(); 
	        ftue.context.translate(p.xPos + p.centre, p.yPos + p.centre);
	        ftue.context.rotate(p.rAngle);
            ftue.context.drawImage(ftue.preRenderCanvases[p.colour], -p.halfW, -p.halfW, p.width, p.width);
	        ftue.context.restore();
        }

        if(p.state === 'fadeOut'){
            ftue.context.globalAlpha = 1;
        }
    };
    
  return p;
};

const createSpecialParticle = () => {
    const random = Math.floor(Math.random() * ftue.particles.length);
    ftue.particles[random].state = 'special';

    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].distanceFromSpecial = (Math.abs(ftue.particles[random].xArr - ftue.particles[i].xArr) + Math.abs(ftue.particles[random].yArr - ftue.particles[i].yArr)) * 50;
    }
};

const randomClick = () => {
    if(Math.random() < 0.95) return;
    
    const random = Math.floor(Math.random() * ftue.particles.length + 1);

    if(ftue.particles[random] && ftue.particles[random].state !== 'fadeIn' && ftue.particles[random].state !== 'fadeOut' && ftue.particles[random].state !== 'special' && ftue.particles[random].state !== 'wave'){
        ftue.particles[random].state = 'hover';
    }
};

const updateParticles = () => {
    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].update();
    }
};

const renderParticle = () => {
    ftue.context.clearRect(0, 0, ftue.canvas.width, ftue.canvas.height);

    let i = ftue.particles.length;
    while(i--){
        ftue.particles[i].draw();
    }
};

const animateParticles = (timestamp) => {
    if(!ftue.start) ftue.start = timestamp;
    ftue.currentTime = timestamp - ftue.start;
    randomClick();
    updateParticles();
    renderParticle();
    window.requestAnimationFrame(animateParticles);
};

init();
