import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

enum DrinkType {
  Tea = 'tea',
  Coffee = 'coffee',
}

abstract class HotDrink {
  abstract consume();
}

class Tea extends HotDrink {
  consume() {
    console.log('This tea is nice with lemon!');
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log('This coffee is delicious!');
  }
}

abstract class HotDrinkFactory {
  abstract prepare(amount: number);
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount: number) {
    console.log(`Put in tea bag, boil water, pour ${amount}ml`);
    return new Tea();
  }
}

class CoffeeFactory extends HotDrinkFactory {
  prepare(amount: number) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee();
  }
}

const AvailableDrink = Object.freeze({
  coffee: CoffeeFactory,
  tea: TeaFactory,
});

class HotDrinkMachine {
  factories: Record<DrinkType, HotDrinkFactory> | {} = {};

  constructor() {
    Object.entries(AvailableDrink).forEach(([drink, Factory]) => {
      this.factories[drink] = new Factory();
    });
  }

  interact(consumer) {
    rl.question('Please specify drink and amount (e.g., tea 50): ', answer => {
      const parts = answer.split(' ');
      const name = parts[0];
      const amount = parseInt(parts[1]);

      const drink = this.factories[name].prepare(amount);
      rl.close();
      consumer(drink);
    });
  }
}

const machine = new HotDrinkMachine();
machine.interact(drink => {
  drink.consume();
});
