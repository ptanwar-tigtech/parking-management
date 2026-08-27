class Vehicle {
    constructor(vehicleNumber) {
        this.vehicleNumber = vehicleNumber;
    }
}

class Bike extends Vehicle {
    constructor(vehicleNumber) {
        super(vehicleNumber);
        this.requiredSlots = 1;
    }
}

class Car extends Vehicle {
    constructor(vehicleNumber) {
        super(vehicleNumber);
        this.requiredSlots = 3;
    }
}

class Truck extends Vehicle {
    constructor(vehicleNumber) {
        super(vehicleNumber);
        this.requiredSlots = 5;
    }
}