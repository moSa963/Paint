
class Canvas {
    /** 
    * @param {HTMLCanvasElement} canvas 
    */
    constructor(canvas) {
        this.canvas = canvas;
        this.setData("transparent", 10);
    }

    setData(color, size) {
        var context = this.canvas.getContext("2d");
        context.lineWidth = size;
        context.lineCap = 'round';
        context.lineJoin = 'round';

        if (color === 'none') {
            context.globalCompositeOperation = 'destination-out';
            return;
        }

        context.globalCompositeOperation = 'source-over';
        context.strokeStyle = color;
        context.fillStyle = color;
    }

    drawEllipse(point, r1, r2) {
        var context = this.canvas.getContext("2d");
        context.beginPath();
        context.ellipse(point.x, point.y, Math.abs(r1), Math.abs(r2), Math.PI * 2, 0, Math.PI * 2);
        context.stroke();
    }

    drawRect(point1, point2) {
        var context = this.canvas.getContext("2d");
        context.beginPath();
        context.rect(point1.x, point1.y, point2.x - point1.x, point2.y - point1.y);
        context.stroke();
    }

    drawLine(point1, point2) {
        var context = this.canvas.getContext("2d");
        context.beginPath();
        context.moveTo(point1.x, point1.y);
        context.lineTo(point2.x, point2.y);
        context.stroke();
    }

    drawTriangle(point1, point2) {
        var context = this.canvas.getContext("2d");
        context.beginPath();
        context.moveTo(point1.x, point2.y);
        context.lineTo(point2.x, point2.y);
        context.lineTo((point1.x + (point2.x - point1.x) / 2), point1.y);
        context.closePath();
        context.stroke();
    }

    drawImage(source, x, y) {
        var context = this.canvas.getContext("2d");
        context.drawImage(source, x, y);
    }

    newBackup() {
        const backup = document.createElement('canvas');
        backup.width = this.canvas.width;
        backup.height = this.canvas.height;
        const context = backup.getContext("2d");
        context.drawImage(this.canvas, 0, 0);
        return backup;
    }

    getImageData(willReadFrequently) {
        const ctx = this.canvas.getContext("2d", {
            willReadFrequently: Boolean(willReadFrequently)
        })

        return ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    getWidth() {
        return this.canvas.width;
    }

    getHeight() {
        return this.canvas.height;
    }

    putImageData(imgData) {
        this.canvas.getContext("2d").putImageData(imgData, 0, 0);
    }

    clear() {
        var context = this.canvas.getContext("2d");
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}