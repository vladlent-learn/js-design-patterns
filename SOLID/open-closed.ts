// Open for extension, closed for modification

enum Color {
  red = 'red',
  green = 'green',
  blue = 'blue',
}

enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

class Product {
  constructor(public name: string, public color: Color, public size: Size) {}
}

class ProductFilter {
  constructor() {}

  filterByColor(products: Product[], color: Color) {
    return products.filter(p => p.color === color);
  }

  filterBySize(products: Product[], size: Size) {
    return products.filter(p => p.size === size);
  }

  filterBySizeAndColor(products: Product[], size: Size, color: Color) {
    return products.filter(p => p.size === size && p.color === color);
  }
  // ...
  // state space explosion
  // 3 criteria = 7 methods
}

// specification class
abstract class Specification {
  abstract isSatisfied(item: any): boolean;
}

class ColorSpecification extends Specification {
  constructor(public color: Color) {
    super();
  }

  isSatisfied(product: Product) {
    return product.color === this.color;
  }
}

class SizeSpecification extends Specification {
  constructor(public size: Size) {
    super();
  }

  isSatisfied(product: Product) {
    return product.size === this.size;
  }
}

// combinator
class AndSpecification extends Specification {
  specs: Specification[];

  constructor(...specs: Specification[]) {
    super();
    this.specs = specs;
  }

  isSatisfied(item: any): boolean {
    return this.specs.every(spec => spec.isSatisfied(item));
  }
}
class OrSpecification extends Specification {
  specs: Specification[];

  constructor(...specs: Specification[]) {
    super();
    this.specs = specs;
  }

  isSatisfied(item: any): boolean {
    return this.specs.some(spec => spec.isSatisfied(item));
  }
}

class BetterFilter {
  filter(items: any[], spec: Specification) {
    return items.filter(item => spec.isSatisfied(item));
  }
}

const apple = new Product('Apple', Color.green, Size.small);
const tree = new Product('Tree', Color.green, Size.large);
const house = new Product('House', Color.blue, Size.large);

const products = [apple, tree, house];
const pf = new ProductFilter();

console.log(`Green products (old):`);
pf.filterByColor(products, Color.green).forEach(product =>
  console.log(` * ${product.name} is green`),
);

const bf = new BetterFilter();
console.log(`Green products (new):`);
bf.filter(products, new ColorSpecification(Color.green)).forEach(product => {
  console.log(` * ${product.name} is green`);
});
console.log(`Large and green products:`);
const andSpec = new AndSpecification(
  new SizeSpecification(Size.large),
  new ColorSpecification(Color.green),
);
bf.filter(products, andSpec).forEach(product => {
  console.log(` * ${product.name} is green and large`);
});

const orSpec = new OrSpecification(
  new SizeSpecification(Size.small),
  new ColorSpecification(Color.blue),
);
console.log(`Small or blue products:`);
bf.filter(products, orSpec).forEach(product => {
  console.log(` * ${product.name} is ${product.color} and ${product.size}`);
});
