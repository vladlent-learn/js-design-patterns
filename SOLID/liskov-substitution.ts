class Rectangle {
  get area() {
    return this._width * this._height;
  }

  get width() {
    return this._width;
  }
  set width(value: number) {
    this._width = value;
  }
  get height() {
    return this._height;
  }
  set height(value: number) {
    this._height = value;
  }

  constructor(protected _width: number, protected _height: number) {}

  toString() {
    return `${this._width}x${this._height}`;
  }
}

class Square extends Rectangle {
  get width() {
    return this._width;
  }

  set width(value: number) {
    this._width = this._height = value;
  }

  set height(value: number) {
    this._width = this._height = value;
  }

  constructor(size: number) {
    super(size, size);
  }
}

const useIt = (rectangle: Rectangle) => {
  const width = rectangle.width;
  rectangle.height = 10;
  console.log(`
  Expected area of ${10 * width},
  got ${rectangle.area}
  `);
};

const rectangle = new Rectangle(2, 3);
useIt(rectangle);

const square = new Square(5);
useIt(square);
