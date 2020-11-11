function ColoredShape(value: string) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      color = value;
    };
  };
}

class Shape {}

@ColoredShape('blue')
class Circle extends Shape {
  /** A workaround to be able to use circle.color or otherwise it will show an error
   * "Property 'color' does not exist on Type 'Circle'"
   */
  color: string;

  constructor(public radius = 0) {
    super();
  }

  resize(factor: number) {
    this.radius *= factor;
  }

  toString() {
    return `A circle with radius ${this.radius}`;
  }
}

const circle = new Circle(5);
console.log(circle.color);
