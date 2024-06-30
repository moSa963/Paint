

/**
 * Class used to control an html element to do basic operations like scale and move.
 * @param {HTMLElement} element 
 */
class ElementController {
    /** 
    * @param {HTMLElement} element 
    */
    constructor(element) {
        this.element = element;
        this.top = 0;
        this.left = 0;
        this.startPoint = null;
        this.initWidth = element.clientWidth;
        this.width = element.clientWidth;
        this.scaleRatio = element.clientWidth / element.clientHeight;
    }

    onClick(event) {
        this.startPoint = new Point(event.clientX, event.clientY);
    }

    onHold(event) {
        if (this.startPoint != null) {
            this.move(event.clientX - this.startPoint.x, event.clientY - this.startPoint.y);
        }
    }

    onRelease(e) {
        if (this.startPoint != null) {
            this.left = e.clientX - this.startPoint.x + this.left;
            this.top = e.clientY - this.startPoint.y + this.top;
            this.element.style.left = this.left + "px";
            this.element.style.top = this.top + "px";
            this.startPoint = null;
        }
    }

    scale(count, min = 200, max = 3000) {
        this.width += count;

        if (this.width < min) {
            this.width = min;
        } else if (this.width > max) {
            this.width = max;
        }

        this.element.style.width = this.width + 'px';
        this.element.style.height = (Math.floor(this.width / this.scaleRatio)) + 'px';
    }

    move(x, y) {
        this.element.style.left = (x + this.left) + "px";
        this.element.style.top = (y + this.top) + "px";
    }

    getScaleRatio() {
        return this.width / this.initWidth;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return Math.floor(this.width / this.scaleRatio);
    }
}