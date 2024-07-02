

class Workplace extends MouseEvents {
    constructor(width, height) {
        const workplace = document.getElementById('workplace');
        super(workplace);

        this.width = width;
        this.height = height;

        this.selectedTool = null;

        this.canvasController = new CanvasController(
            this.createCanvas(),
            this.createCanvas()
        );

        const container = document.createElement('div');

        container.className = 'canvas-container';
        container.style.width = this.width + 'px';
        container.style.height = this.height + 'px';

        container.appendChild(this.canvasController.mainCanvas.canvas);
        container.appendChild(this.canvasController.bufferCanvas.canvas);

        workplace.appendChild(container);
        this.container = new ElementController(container);

        this.cursor = new Cursor(25);
    }

    setSelectedTool(tool) {
        this.selectedTool = tool;
        this.canvasController.setTool(tool);
        const size = this.selectedTool.size * this.container.getScaleRatio();
        this.cursor.setSize(size);
        this.cursor.setType(tool.cursor);
    }

    createCanvas() {
        const canvas = document.createElement('canvas');

        canvas.classList.add('canvas');

        canvas.width = this.width;
        canvas.height = this.height;

        return canvas;
    }

    onMouseDown(e) {
        if (this.button == Button.middle || this.selectedTool.type == 'none') {
            this.container.onClick(e);
        } else if (this.button == Button.left) {
            const point = this.globalToLocal(e.clientX, e.clientY);
            this.canvasController.onClick(point);
        }
    }

    onMouseMove(e) {
        super.onMouseMove(e);

        const p = this.globalToLocal(e.clientX, e.clientY)

        document.getElementById('coordinates').innerText = parseInt(p.x) + '/' + parseInt(p.y);
    }

    onDrag(e) {
        if (this.button == Button.left) {
            const point = this.globalToLocal(e.clientX, e.clientY)

            this.canvasController.onHold(point, e.ctrlKey, e.shiftKey);
        }

        this.container.onHold(e);
    }

    globalToLocal(x, y) {
        const rect = this.canvasController.getRect();

        x = ((x - rect.left) * this.width) / this.container.getWidth();
        y = ((y - rect.top) * this.height) / this.container.getHeight();

        return new Point(x, y);
    }

    onRelease(e) {
        super.onRelease(e);
        this.container.onRelease(e);
        this.canvasController.endDraw();
    }

    onEnter(e) {
        this.cursor.show();
    }

    onLeave(e) {
        this.cursor.hide();
    }

    onWheel(e) {
        const delta = Math.floor(e.deltaY);

        if (!this.selectedTool?.resizable) {
            this.container?.scale(delta);
        }
    }

    onKeyPress(e) {
        if (e.ctrlKey) {
            switch (e.key.toLowerCase()) {
                case 'z':
                    this.canvasController.previous();
                    break;
                case 'y':
                    this.canvasController.next();
                    break;
                default:
                    break;
            }
        }
    }

    reset() {
        this.canvasController.reset();
    }
}