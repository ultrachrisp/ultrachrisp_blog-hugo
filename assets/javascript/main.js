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

    // console.log(availableWidth,' ',availableWidth / anim.svgWidth,' ',availableWidth % anim.svgWidth);
    if(availableWidth % anim.svgWidth > 1){
        let temp1 = (availableWidth) % (anim.svgWidth + 1);
        let temp2 = (availableWidth) % (anim.svgWidth - 1);
        console.log(temp1,' ',temp2);
    }
};

initDashboard();
