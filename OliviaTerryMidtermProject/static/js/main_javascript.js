// logging DOM to console 
function block1() {
    const dom = document;
    console.log(dom);
} 

// Car Class
class Car {
    constructor(carType, availableColors, carDescription, basicPrice) {
        this.carType = carType;
        this.availableColors = availableColors;
        this.carDescription = carDescription;
        this.basicPrice = basicPrice;
    }
}

// calls Car constructor & creates 3 cars
function carBuilder () {

    ferrari = new Car("Ferrari", ["Red", "White", "Yellow"], "Born of the spirit of racing, Ferrari epitomises the power of a lifelong passion and the beauty of limitless human achievement, creating timeless icons for a changing world.", 500000);
    lamborghini = new Car("Lamborghini", ["Blue", "Green", "Yellow"], "Revolutionary thinking is at the heart of every idea from Automobili Lamborghini. Whether it is aerospace-inspired design or technologies applied to the naturally aspirated V12 engine or carbon-fiber structure, going beyond accepted limits is part of our philosophy.", 250000);
    mustang = new Car("Mustang", ["Black", "Silver", "White"], "The 2024 Ford Mustang® GT Fastback features a Gen IV 5.0L Coyote™ V8 engine with up to 468 horsepower when configured with Active Valve Dual Exhaust.", 50000);

}

// update color dropdown, car image, and description
function reflectChanges (selectedCar) {

    resetColorDropdown(selectedCar);
    updateImageAndDescription(selectedCar, selectedCar.availableColors[0]);

}

function main_driver() {

    // log DOM to console
    block1(); 

    // create ferrari, lamborghini, and mustang
    carBuilder();

    // set default values (pre-selected upon page load)
    let selectedCar = ferrari; 
    let defaultColor = selectedCar.availableColors[0];
    hasInsurance = true;
    resetColorDropdown(selectedCar);
    updateImageAndDescription(selectedCar, defaultColor);

    // event listener for Car Type dropdown
    const carSelector = document.getElementById("cars");
    carSelector.addEventListener("change", () => {

        if(carSelector.value==="Ferrari"){
            selectedCar = ferrari;
        }else if(carSelector.value==="Lamborghini"){
            selectedCar = lamborghini;
        }else {
            selectedCar = mustang;
        }
        // update car details based on selection
        reflectChanges(selectedCar);
    });

    // event listener for Car Color dropdown
    const colorSelector = document.getElementById("colors");
    colorSelector.addEventListener("change", () => {

        // update car details based on selection
        updateImageAndDescription(selectedCar, colorSelector.value)

    })

    // event listener for turning down insurance
    const insuranceRejector = document.getElementById('uninsured');
    insuranceRejector.addEventListener("change", () => {
        hasInsurance = false;
        updateImageAndDescription(selectedCar, colorSelector.value);
    });

    // event listener for accepting insurance
    const insuranceSelector = document.getElementById('insured');
    insuranceSelector.addEventListener("change", () => {
        hasInsurance = true;
        updateImageAndDescription(selectedCar, colorSelector.value);
    });

}

// update color dropdown options based on current car
function resetColorDropdown(selectedCar) {

    // get selector
    const colorDropdown = document.getElementById("colors");
    // clear text
    colorDropdown.innerHTML = "";

    // loop through color options, adding each to dropdown
    selectedCar.availableColors.forEach((color) => {
        const option = document.createElement("option");
        option.value = color;
        option.innerText = color;
        colorDropdown.appendChild(option);
    });

    // default to first color in list
    colorDropdown.selectedIndex = "0";

}

// when new car, car color, or insurance plan is selected
function updateImageAndDescription (selectedCar, newColor) {
    
    // update insurance cost
    var insuranceCost;
    if (hasInsurance!==null && hasInsurance) {
        insuranceCost = selectedCar.basicPrice * 0.3;
    }else {
        insuranceCost = 0;
    }

    // update image
    let imgElement = document.getElementById("car-photo");
    imgElement.src = getImageURL(selectedCar.carType, newColor);

    // update description
    let desc = document.getElementById("car-description");
    
    desc.value = "Car: " + selectedCar.carType + "\n"
    + "Description: " + selectedCar.carDescription + "\n"
    + "Selected Color: " + newColor + "\n"
    + "Basic Price: $" + selectedCar.basicPrice.toLocaleString() + "\n"
    + "Insurance Cost: $" + insuranceCost.toLocaleString();
    
}

// stores src for all car photos
function getImageURL(carType, color){
    const imageURLs = {
        "Ferrari": {
            "Red": "https://supercarrides.com.au/wp-content/uploads/2021/05/Ferrari-488.png",
            "White": "https://pngimg.com/d/ferrari_PNG10676.png",
            "Yellow": "https://i.pinimg.com/originals/5b/34/b5/5b34b5ed064a641a7cf009ec226c8849.png",
        },
        "Lamborghini": {
            "Blue": "https://purepng.com/public/uploads/large/purepng.com-blue-lamborghini-aventador-carcarvehicletransportlamborghini-961524657644ldrr1.png",
            "Green": "https://i.pinimg.com/originals/93/2e/00/932e0070ec709fe960a1bb4dd8791b1b.png",
            "Yellow": "https://i.pinimg.com/originals/b9/66/a5/b966a5c2532ef37a1c03b463b6286279.png",
        },
        "Mustang": {
            "Black": "https://static.tcimg.net/vehicles/primary/e5ca8031e0c255ff/2022-Ford-Mustang-black-full_color-driver_side_front_quarter.png",
            "Silver": "https://di-uploads-pod41.dealerinspire.com/depaulaford/uploads/2021/06/2021-Ford-Mustang-2021-Ford-Mustang-Ecoboost-Premium-Model-Left.jpeg",
            "White": "https://i.pinimg.com/originals/6c/f0/93/6cf093413eae800c88cc00cdd00f1a09.png",
        },
    };
    return imageURLs[carType][color];
}