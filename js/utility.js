



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