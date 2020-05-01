// Tuple example
// Here Drink is an alias
type Drink = [string, boolean, number];

const pepsi: Drink = ['brown', true, 40];
const sprite: Drink = ['clear', true, 40];
const tea: Drink = ['brown', false, 0];

// Objects are more useful though
const drink = {
    color: 'green',
    carbonated: true,
    sugar: 30
};