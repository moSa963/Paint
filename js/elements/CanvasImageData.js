
class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /** 
* @param {Color} color 
*/
    compare(color) {
        return this.r == color.r
            && this.g == color.g
            && this.b == color.b
            && this.a == color.a;

    }
}


class CanvasImageData {
    /** 
    * @param {ImageData} source 
    */
    constructor(source) {
        this.source = source;
    }

    pointToIndex(point) {
        return (Math.floor(point.y) * this.source.width) + Math.floor(point.x);
    }

    getColor(point) {
        const i = this.pointToIndex(point, this.source.width) * 4;
        return new Color(
            this.source.data[i],
            this.source.data[i + 1],
            this.source.data[i + 2],
            this.source.data[i + 3],
        );
    }

    setColor(point, color) {
        const i = this.pointToIndex(point, this.source.width) * 4;
        this.source.data[i] = color.r;
        this.source.data[i + 1] = color.g;
        this.source.data[i + 2] = color.b;
        this.source.data[i + 3] = color.a;
    }

    getHeight() {
        return this.source.height;
    }

    getWidth() {
        return this.source.width;
    }
}