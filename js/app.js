const parkinglot = new parkingLot(100);


const numberInput = document.getElementById("number");

const typeInput = document.getElementById("type");

const parkButton = document.getElementById("park");

const message = document.getElementById("message");


showSlots();
showVehicles();
updateDashboard();


parkButton.addEventListener("click", function () {

    const number = numberInput.value;
    const type = typeInput.value;

    let vehicle;

    if (type === "bike") {
        vehicle = new Bike(number);
    }
    else if (type === "car") {
        vehicle = new Car(number);
    }
    else {
        vehicle = new Truck(number);
    }


    const slots = parkinglot.parkVehicle(vehicle);


    if (!slots) {
        alert("Parking failed: vechile number already exist");
        return;
    }


    showSlots();
    showVehicles();
    updateDashboard();

    alert("Vehicle parked");

    numberInput.value = "";
});