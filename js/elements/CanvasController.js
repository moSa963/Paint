
class CanvasController {
    constructor(mainCanvas, bufferCanvas) {
        this.mainCanvas = new Canvas(mainCanvas);
        this.bufferCanvas = new Canvas(bufferCanvas);
        this.startPoint = null;
        this.history = new HistoryQueue(100);
        this.tool = null;

        this.history.add(this.mainCanvas.newBackup());
    }

    setTool(tool) {
        this.tool = tool;
        this.mainCanvas.setData(tool.color, tool.size);
        this.bufferCanvas.setData(tool.color, tool.size);
    }

    onClick(point) {
        if (this.tool.type == 'fill') {
            this.fill(point);
            return;
        }

        this.startPoint = point;

        if (this.tool.type == "mesh") {
            this.bufferCanvas.drawLine(point, new Point(point.x + 1, point.y + 1));
        }
    }

    onHold(point, ctrlKey, shiftKey) {
        if (this.startPoint == null) {
            return;
        }

        switch (this.tool.type) {
            case "mesh":
                this.drawMesh(point);
                break;
            case "rect":
                this.drawRect(point, shiftKey, ctrlKey);
                break;
            case "triangle":
                this.drawTriangle(point);
                break;
            case "line":
                this.drawLine(point, shiftKey, ctrlKey);
                break;
            case "ellipse":
                this.drawEllipse(point, shiftKey, ctrlKey);
                break;
            default:
                this.startPoint = null;
                break;
        }
    }

    drawMesh(point) {
        this.mainCanvas.drawLine(this.startPoint, point);
        this.startPoint = point;
    }

    drawRect(point, square, centered) {
        this.bufferCanvas.clear();
        this.bufferCanvas.drawRect(this.startPoint, point);
    }

    drawTriangle(point) {
        this.bufferCanvas.clear();
        this.bufferCanvas.drawTriangle(this.startPoint, point);
    }

    drawLine(point, perfect, centered) {
        this.bufferCanvas.clear();
        this.bufferCanvas.drawLine(this.startPoint, point);
    }

    drawEllipse(point, circle, centered) {
        this.bufferCanvas.clear();
        var center = this.startPoint;

        if (!centered) {
            center = new Point(this.startPoint.x + (point.x - this.startPoint.x) / 2,
                this.startPoint.y + (point.y - this.startPoint.y) / 2);
        }

        this.bufferCanvas.drawEllipse(center, (point.x - this.startPoint.x) / 2, (point.y - this.startPoint.y) / 2);
    }

    fill(point) {
        const color = new Color(
            parseInt(this.tool.color.slice(1, 3), 16),
            parseInt(this.tool.color.slice(3, 5), 16),
            parseInt(this.tool.color.slice(5, 7), 16),
            255
        );

        const imgData = new CanvasImageData(this.mainCanvas.getImageData(true));
        const queue = new Array();

        const oldColor = imgData.getColor(point);
        if (oldColor.compare(color)) return;

        queue.push(point);

        while (queue.length > 0) {
            const p = queue.pop();
            const currentColor = imgData.getColor(p);

            if (!oldColor.compare(currentColor)) continue;

            imgData.setColor(p, color);

            if (p.x + 1 < imgData.getWidth()) queue.push(new Point(p.x + 1, p.y));
            if (p.x - 1 >= 0) queue.push(new Point(p.x - 1, p.y));
            if (p.y + 1 < imgData.getHeight()) queue.push(new Point(p.x, p.y + 1));
            if (p.y - 1 >= 0) queue.push(new Point(p.x, p.y - 1));
        }

        this.mainCanvas.putImageData(imgData.source);
        this.bufferCanvas.clear();
        this.history.add(this.mainCanvas.newBackup());
    }

    endDraw() {
        if (this.startPoint == null) {
            return;
        }

        this.mainCanvas.drawImage(this.bufferCanvas.canvas, 0, 0);
        this.bufferCanvas.clear();
        this.history.add(this.mainCanvas.newBackup());
        this.startPoint = null;
    }

    previous() {
        this.drawImage(this.history.previous());
    }

    next() {
        this.drawImage(this.history.next());
    }

    drawImage(source) {
        if (source == null) {
            return;
        }

        this.mainCanvas.clear();
        this.mainCanvas.drawImage(source, 0, 0);
    }

    getRect() {
        return this.bufferCanvas.canvas.getBoundingClientRect();
    }

    reset() {
        this.mainCanvas.clear();
        this.bufferCanvas.clear();
    }

    getImg() {
        return this.mainCanvas.canvas.toDataURL("image/png");
    }

}