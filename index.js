var blessed = require('blessed');

class TGL {
    constructor(title, render) {
        this.screen = blessed.screen({
            // smartCSR: true,
            // fullUnicode: true,
            // resizeTimeout: 10,
            title
        });

        this.screen.key(['escape', 'q', 'C-c'], function(ch, key) {
            return process.exit(0);
        });

        setInterval(()=>{
            this.width = this.screen.width;
            this.height = this.screen.height;
            this.fill();
            render();
            this.screen.render();
        }, 100);
    }

    fill(char, style) {
        this.rect(0, 0, this.screen.width, this.screen.height, char, style);
    }

    set(x, y, char, style) {
        this.rect(x, y, 1, 1, char, style); 
    }

    rect(xStart, yStart, width, height, char=' ', style={}) {
        let x = Math.round(xStart);
        let y = Math.round(yStart);
        let fg = style.fg || 'white';
        let bg = style.bg || 'black';
        let stylePayload = {
            bold: style.bold || false,
            underline: style.underline || false,
            blink: style.blink || false,
            inverse: style.inverse || false,
            invisible: style.invisible || false,
        }
        
        x = x % this.screen.width;
        y = y % this.screen.height;
        this.screen.fillRegion(blessed.Element.prototype.sattr(stylePayload, fg, bg), char, x, x+width, y, y+height);
    }
}

module.exports = exports = TGL;
