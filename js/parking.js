class parkingSlot {
    constructor(id) {
        this.id = id;
        this.isOccupied = false;
        this.vehicle = null;
    }

    occupy(vehicle) {
        this.isOccupied = true;
        this.vehicle = vehicle;
    }

    release() {
        this.isOccupied = false;
        this.vehicle = null;
    }
}


class parkingLot {
    constructor(totalSlots) {
        this.slots = [];

        for (let i = 1; i <= totalSlots; i++) {
            this.slots.push(new parkingSlot(i));
        }
    }

    findAvailableSlots(requiredSlots) {
        let availableSlots = [];

        for (const slot of this.slots) {

            if (!slot.isOccupied) {
                availableSlots.push(slot);

                if (availableSlots.length === requiredSlots) {
                    return availableSlots;
                }
            } else {
                availableSlots = [];
            }
        }

        return null;
    }

    parkVehicle(vehicle) {

        if (this.isVehicleParked(vehicle.vehicleNumber)) {
            return false;
        }

        const slots = this.findAvailableSlots(
            vehicle.requiredSlots
        );

        if (!slots) {
            return false;
        }

        slots.forEach(slot => {
            slot.occupy(vehicle);
        });

        return slots;
    }

    findVehicleSlots(vehicleNumber) {
        const vehicleSlots = [];

        for (const slot of this.slots) {

            if (
                slot.vehicle &&
                slot.vehicle.vehicleNumber === vehicleNumber
            ) {
                vehicleSlots.push(slot);
            }

        }

        return vehicleSlots;
    }

    isVehicleParked(vehicleNumber) {
        return this.findVehicleSlots(vehicleNumber).length > 0;
    }

    removeVehicle(vehicleNumber) {

        const vehicleSlots = this.findVehicleSlots(vehicleNumber);

        if (vehicleSlots.length === 0) {
            return false;
        }

        vehicleSlots.forEach(slot => {
            slot.release();
        });

        return true;
    }

    getAvailableSlotCount() {

        let count = 0;

        for (const slot of this.slots) {
            if (!slot.isOccupied) {
                count++;
            }
        }

        return count;
    }

    getOccupiedSlotCount() {

        let count = 0;

        for (const slot of this.slots) {
            if (slot.isOccupied) {
                count++;
            }
        }

        return count;
    }
}