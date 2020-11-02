class CodeBlock {
  constructor(prefix, body) {
    this.prefix = prefix;
    this.body = body;
  }

  getString() {
    return `${this.prefix} {
      ${this.body}
    }`;
  }

  toString() {
    return this.getString();
  }
}

class MethodBuilder {
  constructor(name, args, body) {
    this.name = name;
    this.args = args;
    this.body = body;
  }

  getArgsString() {
    const args = this.args.join(', ');
    return `(${args})`;
  }

  build() {
    return new CodeBlock(this.name + this.getArgsString(), this.body);
  }

  toString() {
    return this.build();
  }
}

class ClassBuilder {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  addField(fieldName) {
    this.fields.push(fieldName);
    return this;
  }

  build() {
    const body = this.fields
      .map((arg, i) => {
        const str = `this.${arg} = ${arg};`;
        const indent = '  ';

        return i === 0 ? str : indent + str;
      })
      .join('\n');

    const constructor = new MethodBuilder('constructor', this.fields, body).build().getString();
    console.log(body);
    console.log(constructor);
    return new CodeBlock(`class ${this.name}`, constructor).getString();
  }
}

class CodeBuilder {
  constructor(className) {
    this.root = new ClassBuilder(className);
  }

  addField(fieldName) {
    this.root.fields.push(fieldName);
    return this;
  }

  build() {
    return this.root.build();
  }

  toString() {
    return this.build().toString();
  }
}

const cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
