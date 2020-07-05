enum Relationship {
  parent,
  child,
  sibling,
}

class Person {
  constructor(public name: string) {}
}

// LOW-LEVEL MODULE
abstract class RelationshipBrowser {
  abstract findAllChildrenOf(name: string): Person[];
}

class Relationships extends RelationshipBrowser {
  private data = [];

  constructor() {
    super();
  }

  addParentAndChild(parent: Person, child: Person) {
    this.data.push({ from: parent, type: Relationship.parent, to: child });
  }

  findAllChildrenOf(name: string): Person[] {
    return this.data.filter(r => r.from.name && r.type === Relationship.parent).map(r => r.to);
  }
}
// HIGH-LEVEL MODULE
class Research {
  // abstract classes/interfaces
  // Wrong
  // constructor(relationships: Relationships) {
  //   const relations = relationships.data;
  //   relations
  //     .filter(r => r.from.name === 'John' && r.type === Relationship.parent)
  //     .forEach(rel => {
  //       console.log(`John has a child named ${rel.to.name}`);
  //     });
  // }
  constructor(browser: RelationshipBrowser) {
    browser.findAllChildrenOf('John').forEach(p => {
      console.log(`John has a child named ${p.name}`);
    });
  }
}

const parent = new Person('John');
const child1 = new Person('Chris');
const child2 = new Person('Matt');
const rels = new Relationships();

rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
