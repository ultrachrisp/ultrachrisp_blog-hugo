const initDashboard = () => {
    const anim = createObject();
    setCanvasSize({anim});
};

const createObject = () => {
    const animation = {
        colours: ['#F0325A', '#FF780F', '#960528'],
        grid: null,
        particles: null,
        offscreenCanvases: [],
        time: 0,
        svgWidth: 75,

        element: document.getElementById('dashboard'),
        canvas: document.createElement('canvas'),
    };

    animation.element.innerHTML = "";

    animation.context = animation.canvas.getContext('2d');
    animation.element.appendChild(animation.canvas);

    return animation;
};

const setCanvasSize = ({anim}) => {
    const availableWidth = anim.canvas.width = anim.canvas.height = anim.element.getBoundingClientRect().width;

    // if(availableWidth % anim.svgWidth > 1){
    const space = availableWidth % anim.svgWidth,
          halfTile = anim.svgWidth / 2,
          temp3 = (space > halfTile)?
          tileSizeIncrease({
              width: availableWidth,
              limit: anim.svgWidth,
              num: anim.svgWidth+1 }):
          tileSizeDecrease({
              width: availableWidth,
              limit: anim.svgWidth,
              num: anim.svgWidth-1}) ;
    console.log(space,' ',halfTile,' ',temp3,' ',availableWidth,' ',anim.svgWidth,' ',availableWidth % anim.svgWidth,' ',availableWidth / temp3);
    anim.svgWidth = temp3;

    console.log(anim.svgWidth);
        return ;
    // }
};

const tileSizeDecrease = ({width, num}) => {
    // ensure we are still reducing
    return (width % num > num)? tileSizeDecrease({width, num: num-1}) : num;
};

const tileSizeIncrease = ({width, limit, num}) => {
    // local optima
    return (width % num < limit)? tileSizeIncrease({width, limit, num: num+1}) : num-1;
};

initDashboard();
