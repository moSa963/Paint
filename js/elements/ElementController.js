

/**
 * Class used to control an html element to do basic operations like scale and move.
 * @param {HTMLElement} element 
 */
class ElementController{
    /** 
    * @param {HTMLElement} element 
    */
    constructor(element){
        this.element = element;
        this.top = 0;
        this.startPoint = null;
        this.initWidth = element.clientWidth;
        this.width =  element.clientWidth;
        this.scaleRatio = element.clientWidth / element.clientHeight;
    }

    onClick(event){
        this.startPoint = new Point(event.clientX, event.clientY);
    }

    onHold(event){
        if (this.startPoint != null){
            this.move(event.clientX - this.startPoint.x , event.clientY - this.startPoint.y );
        }
    }

    onRelease(event){
        if (this.startPoint != null){
            var left = event.clientX - this.startPoint.x + this.left;
            var top = event.clientY - this.startPoint.y + this.top;
            this.element.style.left = left + "px";
            this.element.style.top = top + "px";
            this.left = left;
            this.top = top;
            this.startPoint = null;
        }
    }

    scale(count){
        this.width += count;

        if (this.width < 200){
            this.width = 200;
        }else if (this.width > 3000){
            this.width = 3000;
        }

        this.element.style.width = this.width + 'px';
        this.element.style.height = (Math.floor(this.width / this.scaleRatio)) + 'px';
    }

    move(countX, countY){
        this.element.style.left = (countX + this.left) + "px";
        this.element.style.top = (countY + this.top) + "px";
    }

    getScaleRatio(){
        return this.width / this.initWidth;
    }

    getWidth(){
        return this.width;
    }

    getHeight(){
        return Math.floor(this.width / this.scaleRatio);
    }
}