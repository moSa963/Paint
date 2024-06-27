

class MouseEvents {
    /** 
    * @param {HTMLCanvasElement} element 
    */
    constructor(element) {
        this.element = element;
        this.holding = false;
        this.button = null;

        this.element.onmousedown = (e) => {
            this.holding = true;
            this.button = e.button;
            this.onMouseDown(e);
        }

        this.element.onmousemove = (e) => {
            this.onMouseMove(e);
            if (this.holding) {
                this.onDrag(e);
            }
        }

        this.element.onmouseenter = (e) => {
            this.onEnter(e);
        };;

        this.element.onmouseleave = (e) => {
            this.onLeave(e);
        };

        this.element.onwheel = (e) => {
            this.onWheel(e);
        };

        this.onRelease = this.onRelease.bind(this)
        window.addEventListener('mouseup', this.onRelease);
    }

    onMouseDown(e) { }

    onMouseMove(e) { }

    onDrag(e) { }

    onRelease(e) {
        this.holding = false;
    }

    onEnter(e) { }
    onLeave(e) { }
    onWheel(e) { }
}

const Button = {
    left: 0,
    middle: 1,
    right: 2,
}