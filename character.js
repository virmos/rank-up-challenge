export default class Character {
    constructor(x, y, width, height, name) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.name = name;
    }
    loadImage(frames) {
        this.frames = frames;
    }

};