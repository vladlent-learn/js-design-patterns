export class Person {
  // address
  streetAddress = '';
  postcode = '';
  city = '';

  // employment
  companyName = '';
  position = '';
  annualIncome = 0;

  constructor() {}

  toString() {
    return `Person lives at ${this.streetAddress}, ${this.city}, ${this.postcode}
      and works at ${this.companyName} as a ${this.position} earning ${this.annualIncome} per year`;
  }
}

class PersonBuilder {
  get lives() {
    return new PersonAddressBuilder(this.person);
  }

  get works() {
    return new PersonJobBuilder(this.person);
  }

  constructor(protected person = new Person()) {}

  build() {
    return this.person;
  }
}

class PersonAddressBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(streetAddress: string) {
    this.person.streetAddress = streetAddress;
    return this;
  }

  withPostcode(postcode: string) {
    this.person.postcode = postcode;
    return this;
  }

  in(city: string) {
    this.person.city = city;
    return this;
  }
}

class PersonJobBuilder extends PersonBuilder {
  constructor(person) {
    super(person);
  }

  at(companyName: string) {
    this.person.companyName = companyName;
    return this;
  }

  asA(position: string) {
    this.person.position = position;
    return this;
  }

  earning(annualIncome: number) {
    this.person.annualIncome = annualIncome;
    return this;
  }
}

const personBuilder = new PersonBuilder();
const person = personBuilder.lives
  .at('123 London Road')
  .in('London')
  .withPostcode('SW12BC')
  .works.at('Fabrikam')
  .asA('Engineer')
  .earning(123000)
  .build();
console.log(person.toString());
