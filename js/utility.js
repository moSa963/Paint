
//object contains the tools and its properties
var tools = {
    "select" :{
        size : 0,
        type : "none",
        color :  "#000000",
        sizeSelect : false, //if user can change size or not
        colorSelect : false,//if user can change color or not
        cursor: 'move',
    },
    "pencil" :{
        size : 5,
        type : "mesh",
        color :  "#000000",
        sizeSelect : false,
        colorSelect : false,
        cursor: 'draw',
    },
    "brush" :{
        size : 10,
        type : "mesh",
        color :  "#000000",
        sizeSelect : true,
        colorSelect : true,
        cursor: 'draw',
    },
    "eraser" :{
        size : 10,
        type : "mesh",
        color :  "none",
        sizeSelect : true,
        colorSelect : false,
        cursor: 'draw',
    },
    "rectangle" :{
        size : 1,
        type : "rect",
        color :  "#000000",
        sizeSelect : true,
        colorSelect : true,
        cursor: 'draw',
    },
    "line" :{
        size : 10,
        type : "line",
        color :  "#000000",
        sizeSelect : true,
        colorSelect : true,
        cursor: 'draw',
    },
    "ellipse" :{
        size : 1,
        type : "ellipse",
        color :  "#000000",
        sizeSelect : true,
        colorSelect : true,
        cursor: 'draw',
    },
    "triangle" :{
        size : 1,
        type : "triangle",
        color :  "#000000",
        sizeSelect : true,
        colorSelect : true,
        cursor: 'draw',
    },
    "fill" :{
        size : 1,
        type : "fill",
        color :  "#000000",
        sizeSelect : false,
        colorSelect : true,
        cursor: 'crosshair',
    },
};





class Point{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}




//class create a queue that if you add an element and it overflow it will overwrite the oldest element
class HistoryQueue{
    constructor(size){
        this.queue = new Array(size + 3);
        this.start = 0;
        this.last = 0;
        this.on = 0;
    }

    add(element){
        this.on++;
        this.on %= this.queue.length;
        this.last = (this.on + 1) % this.queue.length;
        if(this.last == this.start) this.start = (this.last + 1) % this.queue.length;
        this.queue[this.on] = element;
    }
    
    //get the next element after this.on
    getFront(){
        if (this.mod(this.on + 1, this.queue.length) != this.last){
            this.on = this.mod(this.on + 1, this.queue.length);

            return this.queue[this.on];
        }
        return null;
    }

    //get the element before this.on
    getBack(){
        if (this.mod(this.on - 1, this.queue.length) != this.start){
            this.on = this.mod(this.on - 1, this.queue.length);

            return this.queue[this.on];
        }
        return null;
    }

    mod(x, y){
        return ((x % y) + y) % y;
    }
}


class ElementControler{
    constructor(element){
        this.element = element;
        this.left = 0;
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

    onRelese(event){
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
        // this.left -= count / 2;
        // this.top -= count / 2;
        // this.element.style.left = this.left + "px";
        // this.element.style.top = this.top + "px";
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