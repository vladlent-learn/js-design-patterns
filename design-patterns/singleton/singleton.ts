class Singleton {
  constructor() {
    const inst = this.constructor['instance'];
    if (inst) return inst;

    this.constructor['instance'] = this;
  }
}
const s1 = new Singleton();
const s2 = new Singleton();
console.assert(s1 === s2);

// Monostate
class ChiefExecutiveOfficer {
  private static _age = null;
  private static _name = null;

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(age: number) {
    ChiefExecutiveOfficer._age = age;
  }

  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(name: string) {
    ChiefExecutiveOfficer._name = name;
  }

  constructor() {}

  toString() {
    return `CEO's name is ${this.name} and he is ${this.age} years old`;
  }
}

const ceo = new ChiefExecutiveOfficer();
ceo.name = 'Adam Smith';
ceo.age = 55;

const ceo2 = new ChiefExecutiveOfficer();
ceo.name = 'John Gold';
ceo.age = 66;

console.log(ceo.toString());
console.log(ceo2.toString());
