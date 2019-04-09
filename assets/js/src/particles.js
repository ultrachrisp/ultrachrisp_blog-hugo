export class Particle {
    constructor({x, y, anim}){
        this.xArr = x;
        this.yArr = y;
        this.anim = anim;
        this.distanceFromSpecial = 0;
        this.xPos = x * anim.svgWidth;
        this.yPos = y * anim.svgWidth;
        this.width = anim.svgWidth;
        this.centre = this.width / 2;
        this.halfW = this.width / 2;
        this.alpha = 1;
        this.delay = 0;
        this.fadingStart = (this.xPos * 0.5) + (this.yPos * 0.5);
        // p.colour = getColour(p.xPos/ftue.iconW, p.yPos/ftue.iconW);
        this.colour = 0;
        this.outroStart = 0;
        
        // flags
        this.state = 'fadeIn';
        
        this.remove = false;
        this.bigger = false;
        this.colourChange = false;
    // p.tweening = false;

        this.speed = 1;
        
        this.angle = 0;
        this.radians = Math.PI/180;
    }


    fadeIn(){
        if((this.fadingStart + this.delay) <= this.currentTime){
            this.alpha += 0.1;
            
            if(this.alpha >= 1){
                this.state = 'spin';
            }
        }
    };

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
    
    update() {
        this.angle = (this.angle > 360)? 0 : this.angle + this.speed;
        this.rAngle = this.angle * this.radians;

        switch(this.state){
        case 'special': this.pulse(); break;
        case 'wave': this.wave(); break;
        case 'fadeIn': this.fadeIn(); break;
        case 'fadeOut': this.fadeOut(); break;
        case 'hover':  this.hover(); break;
        case 'click':  this.click(); break;
        default: this.state = 'spin';
        }
    };

    draw() {
        if(this.state === 'fadeIn' || this.state === 'fadeOut'){
            this.anim.context.globalAlpha = this.alpha;
        }
        // console.log(anim.preRenderCanvases, p.colour);
        if(!this.remove){
            this.anim.context.save(); 
            this.anim.context.translate(this.xPos + this.centre, this.yPos + this.centre);
            this.anim.context.rotate(this.rAngle);
            this.anim.context.drawImage(this.anim.preRenderCanvases[this.colour], -this.halfW, -this.halfW, this.width, this.width);
            this.anim.context.restore();
        }

        if(this.state === 'fadeOut'){
            this.anim.context.globalAlpha = 1;
        }
    };
};


