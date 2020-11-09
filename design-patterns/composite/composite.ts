class Connectable extends Array {
  in = [];
  out = [];

  constructor() {
    super();
  }

  connectTo(other: Connectable) {
    for (const from of this) {
      for (const to of other) {
        from.out.push(to);
        to.in.push(from);
      }
    }
  }
}

class Neuron extends Connectable {
  in: Neuron[] = [];
  out: Neuron[] = [];

  constructor() {
    super();
  }

  // connectTo(neuron: Neuron) {
  //   this.out.push(neuron);
  //   neuron.in.push(this);
  // }

  toString() {
    return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`;
  }
}

class NeuronLayer extends Connectable {
  in: Neuron[] = [];
  out: Neuron[] = [];

  constructor(count: number) {
    super();
    while (count > 0) {
      this.push(new Neuron());
    }
  }

  toString(): string {
    return `A layer with ${this.length} neurons`;
  }
}

const neuron1 = new Neuron();
const neuron2 = new Neuron();
// const layer1 = new NeuronLayer(3);
// const layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
// neuron1.connectTo(layer2);
// layer2.connectTo(neuron1);
// layer1.connectTo(neuron2);

console.log(neuron1.toString());
console.log(neuron2.toString());
