


class Cursor {
    constructor(type, size) {
        const element = document.createElement('div');
        element.style.display = "none";
        element.style.pointerEvents = "none";
        element.className = "cursor";

        this.type = type;

        document.querySelector('body').appendChild(element);
        this.element = element;

        this.size = size;
        this.pos = new Point(0, 0);

        window.addEventListener('mousemove', (e) => {
            this.moveTo(e.clientX, e.clientY);
        });
    }

    setType(type) {
        this.type = type;
    }

    setSize(size) {
        this.size = size;
        this.element.style.width = size + 'px';
        this.element.style.height = size + 'px';
        this.moveTo(this.pos.x, this.pos.y);
    }

    moveTo(x, y) {
        this.pos = new Point(x, y);
        this.element.style.top = (y - this.size / 2) + 'px';
        this.element.style.left = (x - this.size / 2) + 'px';
    }

    show() {
        if (this.type != "draw") {
            this.element.style.display = 'none';
            document.querySelector('body').style.cursor = this.type;
            return;
        }

        this.element.style.display = 'block';
        document.querySelector('body').style.cursor = 'none';
    }

    hide() {
        this.element.style.display = 'none';
        document.querySelector('body').style.cursor = 'auto';
    }
}