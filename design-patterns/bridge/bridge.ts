interface Renderer {
  renderCircle(radius: number);
}

class VectorRenderer implements Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing a circle of radius ${radius}`);
  }
}

class RasterRenderer implements Renderer {
  renderCircle(radius: number) {
    console.log(`Drawing pixels for a circle of radius ${radius}`);
  }
}

class Shape {
  constructor(public renderer: Renderer) {}
}

class Circle extends Shape {
  constructor(renderer: Renderer, public radius: number) {
    super(renderer);
  }

  draw() {
    this.renderer.renderCircle(this.radius);
  }

  resize(factor: number) {
    this.radius *= factor;
  }
}

export class Square {}

// Shape - Square, Circle, Triangle...
// Renderer - Raster, Vector...

const raster = new RasterRenderer();
const vector = new VectorRenderer();
const circle = new Circle(raster, 5);

circle.draw();
circle.resize(2);
circle.draw();
