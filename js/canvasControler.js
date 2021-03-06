
const indexToPoint = (index, width)=>{
    return new Point(index % width, parseInt(index / width));
}

const pointToIndex = (point, width)=>{
    return (parseInt(point.y) * width) + parseInt(point.x);
}

const compareColors = (c1, c2)=>{
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
}

//class that control the drawing operation needs two canvas one as buffer and the other is the main
class CanvasControler{
    constructor(mainCanv, bufferCanv){
        this.mainCanv = new Canvas(mainCanv);
        this.bufferCanv = new Canvas(bufferCanv);
        this.startPoint = null;
        this.history = new HistoryQueue(20);
        this.tool = null;
    }

    setData(tool){
        this.tool = tool;
        onToolSizeChange();
        this.mainCanv.setData(tool.color, tool.size);
        this.bufferCanv.setData(tool.color, tool.size);
    }

    onClick(point, isCtrlHold, isShiftHold){
        if (this.tool.type == "mesh"){
            this.startPoint = point;
            this.bufferCanv.drawLine(point, new Point(point.x + 1, point.y+1));
        }else if (this.tool.type == 'fill'){
            this.fill(point);
        }else {
            this.startPoint = point;
        }
    }

    onHold(point, isCtrlHold, isShiftHold){
        if (this.startPoint != null){
            if (this.tool.type == "mesh"){
                this.drawMesh(point);
            }else if (this.tool.type == "rect"){
                this.drawRect(point, isShiftHold, isCtrlHold);
            }else if (this.tool.type == "triangle"){
                this.drawTriangle(point);
            }else if (this.tool.type == "line"){
                this.drawLine(point, isShiftHold, isCtrlHold);
            }else if (this.tool.type == "ellipse"){
                this.drawEllipse(point, isShiftHold, isCtrlHold);
            }else{
                this.startPoint = null;
            }
        }
    }

    onRelese(event){    
        canvasControler.endDraw();
    }

    drawMesh(point){
        this.mainCanv.drawLine(this.startPoint, point);
        this.startPoint = point;
    }

    drawRect(point, isSquare, isCentered){
        var sp = new Point(this.startPoint.x, this.startPoint.y);
        this.bufferCanv.clear();
        this.rectPointTrans(sp,point, isSquare, isCentered);
        this.bufferCanv.drawRect(sp, point);
    }

    drawTriangle(point){
        this.bufferCanv.clear();
        this.bufferCanv.drawTriangle(this.startPoint, point);
    }
    
    drawLine(point, isPerfect, isCentered){
        var sp = new Point(this.startPoint.x, this.startPoint.y);
        this.bufferCanv.clear();
        this.linePointTrans(sp,point, isPerfect, isCentered);
        this.bufferCanv.drawLine(sp, point);
    }

    drawEllipse(point, isPerfect, isCentered){
        this.bufferCanv.clear();
        var sp = new Point(this.startPoint.x, this.startPoint.y);
        var center;

        this.rectPointTrans(sp, point, isPerfect, false);

        if (isCentered){
            center = sp;
        }else{
            center = new Point(sp.x + (point.x - sp.x) / 2, sp.y + (point.y - sp.y) / 2);
        }

        this.bufferCanv.drawEllipse(center, (point.x - sp.x) /  2, (point.y - sp.y) /2);
    }

    fill(point){
        const colorString = this.tool.color;

        const color = [
            parseInt('0x' + colorString.charAt(1) + colorString.charAt(2)), 
            parseInt('0x' + colorString.charAt(3) + colorString.charAt(4)), 
            parseInt('0x' + colorString.charAt(5) + colorString.charAt(6)), 
            255,
        ];

        const imgData = this.mainCanv.getImageData();
        const data = imgData.data;
        const queue = new Array();
        const index = pointToIndex(point, this.mainCanv.getWidth()) * 4;

        var currentColor = [data[index], data[index + 1], data[index + 2], data[index + 3]];

        if (compareColors([data[index], data[index + 1], data[index + 2], data[index + 3]], color)) return;

        queue.push(point);

        while(queue.length > 0){
            const p = queue.pop();
            const index = pointToIndex(p, this.mainCanv.getWidth()) * 4;
            const indexColor = [data[index], data[index + 1], data[index + 2], data[index + 3]];

            data[index]     = color[0];
            data[index + 1] = color[1];
            data[index + 2] = color[2];
            data[index + 3] = color[3];

            if (p.x >= 0 && p.x < this.mainCanv.getWidth() && p.y >= 0 && p.y < this.mainCanv.getHeight() && compareColors(indexColor, currentColor)){
                queue.push(new Point(p.x + 1, p.y));
                queue.push(new Point(p.x - 1, p.y));
                queue.push(new Point(p.x, p.y + 1));
                queue.push(new Point(p.x, p.y - 1));
            }
        }

        this.mainCanv.putImageData(imgData);
        this.bufferCanv.clear();
        this.history.add(this.mainCanv.newBackup());
    }

    endDraw(){
        if (this.startPoint != null){
            this.mainCanv.drawImage(this.bufferCanv.canvas, 0, 0);
            this.bufferCanv.clear();
            this.history.add(this.mainCanv.newBackup());
        }

        this.startPoint = null;
    }


    rectPointTrans(point1, point2, isSquare, isCentered){
        var width = point2.x - point1.x;
        var height = point2.y - point1.y;

        if (isSquare){
            if (width > height){
                point2.x = point1.x + height;
            }else{
                point2.y = point1.y +  width;
            }
        }

        if (isCentered){
            point1.x -= width / 2;
            point1.y -= height / 2;
            point2.x = point1.x + width;
            point2.y = point1.y + height;
        }
    }

    linePointTrans(point1, point2, isPerfect, isCentered){
        var y = point2.y - point1.y;
        var x = point2.x - point1.x;
        
        if (isPerfect){
            if (Math.abs(y) > Math.abs(x)){
                point2.x = point1.x;
            }else{
                point2.y = point1.y;
            }
        }
    }
    
    
    back(){
        var backup = this.history.getBack();

        if (backup != null){
            this.mainCanv.clear();
            this.mainCanv.drawImage(backup, 0, 0);
        }
    }


    front(){
        var backup = this.history.getFront();

        if (backup != null){
            this.mainCanv.clear();
            this.mainCanv.drawImage(backup, 0, 0);
        }
    }

    getRect(){
        return this.bufferCanv.canvas.getBoundingClientRect();
    }

    reset(){
        this.mainCanv.clear();
        this.bufferCanv.clear();
    }

    getImg(){
        return this.mainCanv.canvas.toDataURL("image/png");
    }

}