
var tools = {
    "select" :{
        size : 0,
        type : "none",
        color :  "#000000",
        sizeSelect : false, 
        colorSelect : false,
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


