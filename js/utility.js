class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

const getIcon = (name) => {
    const icon = document.createElement('div');
    icon.className = "icon";

    icon.style.maskImage = `url(../res/${name})`;
    icon.style.mask
    return icon;
}

const indexToPoint = (index, width) => {
    return new Point(index % width, parseInt(index / width));
}

const pointToIndex = (point, width) => {
    return (parseInt(point.y) * width) + parseInt(point.x);
}

const compareColors = (c1, c2) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2] && c1[3] === c2[3];
}