const parkinglot = new parkingLot(100);


showSlots();
showVehicles();
updateDashboard();


function parkVehicle() {

    const numberInput =
        document.getElementById("number");

    const typeInput =
        document.getElementById("type");

    const number = numberInput.value;

    const type = typeInput.value;

    let vehicle;


    if (type === "bike") {

        vehicle = new Bike(number);

    } else if (type === "car") {

        vehicle = new Car(number);

    } else {

        vehicle = new Truck(number);
    }


    const slots =
        parkinglot.parkVehicle(vehicle);


    if (!slots) {

        alert("Parking failed: vehicle number already exists");

        return;
    }


    showSlots();

    showVehicles();

    updateDashboard();


    alert("Vehicle parked");

    numberInput.value = "";
}


document.getElementById("park").addEventListener("click", parkVehicle);