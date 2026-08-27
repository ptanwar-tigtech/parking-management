const totalSlotsElement = document.getElementById("total-slots");

const occupiedSlotsElement = document.getElementById("occupied-slots");

const availableSlotsElement = document.getElementById("available-slots");

const parkingSlotsContainer = document.getElementById("parking-slots");

const vehiclesTable = document.getElementById("vehicles");

const vehicleSection = document.getElementById("vehicle-section");


function showSlots() {

    parkingSlotsContainer.innerHTML = "";

    parkinglot.slots.forEach(slot => {

        const slotElement = document.createElement("div");

        slotElement.textContent = `Slot ${slot.id}`;

        if (slot.isOccupied) {
            slotElement.className = "full";
        } else {
            slotElement.className = "free";
        }

        parkingSlotsContainer.appendChild(slotElement);
    });
}


function updateDashboard() {

    totalSlotsElement.textContent = parkinglot.slots.length;

    occupiedSlotsElement.textContent = parkinglot.getOccupiedSlotCount();

    availableSlotsElement.textContent = parkinglot.getAvailableSlotCount();
}


function showVehicles() {

    vehiclesTable.innerHTML = "";

    const vehicles = [];

    parkinglot.slots.forEach(slot => {

        if (
            slot.vehicle &&
            !vehicles.includes(slot.vehicle)
        ) {
            vehicles.push(slot.vehicle);
        }

    });

    if (vehicles.length === 0) {
        vehicleSection.style.display = "none";
        return;
    }

    vehicleSection.style.display = "block";

    vehicles.forEach(vehicle => {

        const row = document.createElement("tr");

        const number = document.createElement("td");
        number.textContent = vehicle.vehicleNumber;

        const type = document.createElement("td");
        type.textContent = vehicle.constructor.name;

        const slots = document.createElement("td");

        const vehicleSlots =
            parkinglot.findVehicleSlots(
                vehicle.vehicleNumber
            );

        slots.textContent = vehicleSlots
            .map(slot => slot.id)
            .join(", ");

        const action = document.createElement("td");

        const button =
            document.createElement("button");

        button.textContent = "Remove";

        button.addEventListener("click", function () {

            parkinglot.removeVehicle(
                vehicle.vehicleNumber
            );

            showSlots();
            showVehicles();
            updateDashboard();
        });

        action.appendChild(button);

        row.appendChild(number);
        row.appendChild(type);
        row.appendChild(slots);
        row.appendChild(action);

        vehiclesTable.appendChild(row);
    });
}