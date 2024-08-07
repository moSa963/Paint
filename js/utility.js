class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    compare(point) {
        return point.x === this.x
            && point.y === this.y;
    }
}

const getIcon = (name) => {
    const icon = document.createElement('div');
    icon.className = "icon";

    icon.style.backgroundImage = `url(./res/${name}Icon.svg)`;
    return icon;
}