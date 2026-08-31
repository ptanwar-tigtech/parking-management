function showSlots() {

    const parkingSlotsContainer = document.getElementById("parking-slots")

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

    const totalSlotsElement = document.getElementById("total-slots");
    const occupiedSlotsElement = document.getElementById("occupied-slots");
    const availableSlotsElement = document.getElementById("available-slots");

    totalSlotsElement.textContent = parkinglot.slots.length;

    occupiedSlotsElement.textContent = parkinglot.getOccupiedSlotCount();

    availableSlotsElement.textContent = parkinglot.getAvailableSlotCount();
}


function showVehicles() {

    const vehicleSection = document.getElementById("vehicle-section")

    vehicleSection.innerHTML = "";

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

    const heading = document.createElement("h2");
    heading.textContent = "Parked Vehicles";

    vehicleSection.appendChild(heading);


    const table = document.createElement("table");

    vehicleSection.appendChild(table);


    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    const numberHeader = document.createElement("th");
    numberHeader.textContent = "Vehicle Number";

    const typeHeader = document.createElement("th");
    typeHeader.textContent = "Type";

    const slotsHeader = document.createElement("th");
    slotsHeader.textContent = "Slots";

    const actionHeader = document.createElement("th");
    actionHeader.textContent = "Action";


    headerRow.appendChild(numberHeader);
    headerRow.appendChild(typeHeader);
    headerRow.appendChild(slotsHeader);
    headerRow.appendChild(actionHeader);

    thead.appendChild(headerRow);

    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    table.appendChild(tbody);


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

        const button = document.createElement("button");

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

        tbody.appendChild(row);
    });
}