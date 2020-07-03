class Document {}

abstract class Machine {
  abstract print(doc: Document);
  abstract fax(doc: Document);
  abstract scan(doc: Document);
}

class MultiFunctionPrinter extends Machine {
  fax(doc: Document) {}

  print(doc: Document) {}

  scan(doc: Document) {}
}

// Bad
class OldFashionedPrinter extends Machine {
  print(doc: Document) {}

  scan(doc: Document) {
    // do nothing
    // Violates Principle of least surprise
    throw new Error('not implemented');
  }

  fax(doc: Document) {
    // do nothing
  }
}

// ISP = Segregate (split up)
abstract class Printer {
  abstract print(doc: Document);
}

abstract class Scanner {
  abstract scan(doc: Document);
}

//Good
class Photocopier implements Printer, Scanner {
  print(doc: Document) {}

  scan(doc: Document) {}
}

const document = new Document();
const printer = new OldFashionedPrinter();
printer.scan(document);
