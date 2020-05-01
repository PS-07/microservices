class Vehicle {
    /*color: string = 'red';
    constructor(color: string) {
        this.color = color;
    }*/
    // The commented code can be replaced by 
    constructor(public color: string) { }
    protected honk(): void {
        console.log('beep beep');
    }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super(color);
    }
    private drive(): void {
        console.log('vroom');
    }
    startDriving(): void {
        this.drive();
        this.honk();
    }
}

const car = new Car(4, 'red');
car.startDriving();