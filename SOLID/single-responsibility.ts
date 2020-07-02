class Journal {
  static count = 0;

  entries = {};

  constructor() {}

  addEntry(text: string) {
    const count = ++Journal.count;
    this.entries[count] = `${count}: ${text}`;
    return count;
  }

  removeEntry(index: number) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join('\n');
  }

  // All methods below add second responsibility to a class
  // They should be moved to their own class e.g PersistenceManager
  save(filename: string) {}

  load(filename: string) {}

  loadFromUrl(url: string) {}
}

abstract class PersistenceManager {
  abstract saveToFile(journal, filename);
  abstract loadFromFile(filename);
  abstract preprocess(journal);
}

const journal = new Journal();
journal.addEntry('Started Design Patterns Course');
journal.addEntry('Looks interesting');
console.log(journal.toString());
