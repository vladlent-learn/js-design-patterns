class Point {
  constructor(public x: number, public y: number) {}

  // Factory Methods
  static newCartesianPoint(x: number, y: number) {
    return new Point(x, y);
  }

  static newPolarPoint(rho: number, theta: number) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const p1 = Point.newCartesianPoint(4, 5);
const p2 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p1);
console.log(p2);

class PointFactory {
  constructor() {}

  static newCartesianPoint(x: number, y: number) {
    return new Point(x, y);
  }

  static newPolarPoint(rho: number, theta: number) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

const pf1 = PointFactory.newCartesianPoint(4, 5);
const pf2 = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log(pf1);
console.log(pf2);
