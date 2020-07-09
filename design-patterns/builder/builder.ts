const HELLO = 'hello';
let html = [];

html.push('<p>');
html.push(HELLO);
html.push('</p>');
console.log(html.join(''));

const WORDS = ['hello', 'world'];
html = [];
html.push('<ul>\n');
WORDS.forEach(word => html.push(`  <li>${word}</li>\n`));
html.push('</ul>');
console.log(html.join(''));

class Tag {
  static get indentSize() {
    return 2;
  }

  static create(name: string) {
    return new HtmlBuilder(name);
  }

  children: Tag[] = [];

  constructor(public name = '', public text = '') {}

  toStringImpl(indent = Tag.indentSize) {
    const html = [];
    const i = ' '.repeat(indent);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(' '.repeat(indent * 2));
      html.push(this.text);
      html.push('\n');
    }
    this.children.forEach(child => html.push(child.toStringImpl(indent * 2)));
    html.push(`${i}</${this.name}>\n`);
    return html.join('');
  }

  toString() {
    return this.toStringImpl();
  }
}

class HtmlBuilder {
  private root: Tag;
  rootName: string;

  constructor(rootName: string) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName: string, childText?: string) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName: string, childText?: string) {
    const child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

// Introduces tight coupling
//const builder = Tag.create('ul');
const htmlBuilder = new HtmlBuilder('ul');
WORDS.forEach(word => htmlBuilder.addChild('li', word));
console.log(htmlBuilder.build().toString());
htmlBuilder.clear();
htmlBuilder.addChildFluent('li', 'foo').addChildFluent('li', 'bar').addChildFluent('li', 'baz');
console.log(htmlBuilder.build().toString());
