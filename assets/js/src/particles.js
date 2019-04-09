export class Particle {
  //   const p = {};
  //   p.xArr = x;
  //   p.yArr = y;
  //   p.distanceFromSpecial = 0;
  //   p.xPos = x * anim.svgWidth;
  //   p.yPos = y * anim.svgWidth;
  //   p.width = anim.svgWidth;
  //   p.centre = p.width / 2;
  //   p.halfW = p.width / 2;
  //   p.alpha = 0;
  //   p.delay = 0;
  //   p.fadingStart = (p.xPos * 0.5) + (p.yPos * 0.5);
  //   // p.colour = getColour(p.xPos/ftue.iconW, p.yPos/ftue.iconW);
  //   p.colour = 0;
  //   p.outroStart = 0;

  //   // flags
  //   p.state = 'fadeIn';
    
  //   p.remove = false;
  //   p.bigger = false;
  //   p.colourChange = false;
  //   // p.tweening = false;

  //   p.speed = 1;
    
  //   p.angle = 0;
  //   p.radians = Math.PI/180;

  //   p.fadeIn = () => {
  //       if((p.fadingStart + p.delay) <= anim.currentTime){
  //           p.alpha += 0.1;
            
  //           if(p.alpha >= 1){
  //               p.state = 'spin';
  //           }
  //       }
  //   };

  //   p.fadeOut = () => {
  //       if((p.fadingStart + p.delay) <= anim.currentTime){
  //           p.alpha -= 0.2;

  //           if(p.alpha < 0.1){
  //               p.remove = true;
  //           }
  //       }
  //   };

  //   p.pulse = () => {
  //       if(!p.bigger){
  //           p.width = p.width * 0.98;
  //           if(p.width < 20){
  //               p.bigger = true;
  //               p.colour = anim.colours.length-1;
  //           }
  //       } else if(p.bigger){
  //           p.width = p.width * 1.05;
  //           p.colour = getHoverColour(p);
            
  //           if(p.width >= ftue.iconW){
  //               p.width = ftue.iconW;
  //               p.bigger = false;
  //           }
  //       }
        
  //       p.halfW = p.width / 2;
  //   };

  //   p.hover = () => {
  //       if(!p.bigger){
  //           p.width = p.width * 0.9;
  //           if(p.width < 20){
  //               p.bigger = true;
  //               p.colourChange = true;
  //           }
  //       } else if(p.bigger){
  //           p.width = p.width * 1.1;
  //           p.colour = getHoverColour(p);
            
  //           if(p.width >= anim.svgWidth){
  //               p.width = anim.svgWidth;
  //               p.bigger = false;
  //               p.state = 'spin';
  //           }
  //       }
        
  //       p.halfW = p.width / 2;
  //   };

  //   p.wave = () => {
  //       if((p.distanceFromSpecial + p.delay) <= anim.currentTime){
  //           if(!p.bigger){
  //               p.width = p.width * 0.9;
  //               if(p.width < 20){
  //                   p.bigger = true;
  //                   p.colourChange = true;
  //               }
  //           } else if(p.bigger){
  //               p.width = p.width * 1.1;
  //               p.colour = getWaveColour(p);
                
  //               if(p.width >= anim.svgWidth){
  //                   p.width = anim.svgWidth;
  //                   p.bigger = false;
  //                   p.state = 'spin';
  //               }
  //           }
        
  //           p.halfW = p.width / 2;
  //       }
  //   };

  //   p.click = () => {
  //       p.width = p.width * 0.85;
  //       p.halfW = p.width / 2;
  //       if(p.width < 5){ p.remove = true; }
  //   };
    
  //   p.update = () => {
  //       p.angle = (p.angle > 360)? 0 : p.angle + p.speed;
  //       p.rAngle = p.angle * p.radians;

  //       switch(p.state){
  //       case 'special': p.pulse(); break;
  //       case 'wave': p.wave(); break;
  //       case 'fadeIn': p.fadeIn(); break;
  //       case 'fadeOut': p.fadeOut(); break;
  //       case 'hover':  p.hover(); break;
  //       case 'click':  p.click(); break;
  //       default: p.state = 'spin';
  //       }
  //   };

  //   p.draw = () => {
  //       if(p.state === 'fadeIn' || p.state === 'fadeOut'){
  //           anim.context.globalAlpha = p.alpha;
  //       }
  //       // console.log(anim.preRenderCanvases, p.colour);
  //       if(!p.remove){
  //           anim.context.save(); 
  //           anim.context.translate(p.xPos + p.centre, p.yPos + p.centre);
  //           anim.context.rotate(p.rAngle);
  //           anim.context.drawImage(anim.preRenderCanvases[p.colour], -p.halfW, -p.halfW, p.width, p.width);
  //           anim.context.restore();
  //       }

  //       if(p.state === 'fadeOut'){
  //           anim.context.globalAlpha = 1;
  //       }
  //   };
    
  // return p;
};


