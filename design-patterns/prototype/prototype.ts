class Address {
  constructor(public street: string, public city: string, public country: string) {}

  toString() {
    return `
      Country: ${this.country}
      City: ${this.city}
      Street: ${this.street}
    `;
  }
}

export class Person {
  constructor(public name: string, public address: Address) {}

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I live at 
      ${this.address.toString()}`,
    );
  }
}

class Serializer {
  constructor(public readonly types: any[]) {}

  markRecursive(obj: {}) {
    const idx = this.types.findIndex(t => t.name === obj.constructor.name);

    if (idx !== -1) {
      obj['typeIndex'] = idx;
    }

    Object.values(val => this.markRecursive(val));
  }

  reconstructRecursive(obj: {}) {
    if (obj.hasOwnProperty('typeIndex')) {
      const type = this.types[obj['typeIndex']];
      const newInstance = new type();

      Object.keys(newInstance).forEach(key => {
        if (obj[key] !== null) newInstance[key] = this.reconstructRecursive(obj[key]);
      });
      delete newInstance['typeIndex'];
      return newInstance;
    }
    return obj;
  }

  clone(obj: {}) {
    this.markRecursive(obj);
    const copy = JSON.parse(JSON.stringify(obj));
    return this.reconstructRecursive(copy);
  }
}

const s = new Serializer([Person, Address]);

const john = new Person('John', new Address('123 London Road', 'London', 'UK'));
const jane = s.clone(john);

jane.name = 'Jane';
jane.address.street = '312 Angel St';

john.greet();
jane.greet();
