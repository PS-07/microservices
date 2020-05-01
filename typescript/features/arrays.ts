const carMakers = ['ford', 'toyota', 'chevy'];
const dates = [new Date(), new Date()];

// 2D arrays
const carsByMake: string[][] = [];
const carsByMaker = [['f150'], ['corolla'], ['camaro']];

// Help with inference while extracting values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
//carMakers.push(100); --> error

// Help with 'map'
carMakers.map((car: string): string => {
    return car.toUpperCase();
});

// Flexible types
const importantDates: (Date | string)[] = [];
importantDates.push('2020-04-30');
importantDates.push(new Date());