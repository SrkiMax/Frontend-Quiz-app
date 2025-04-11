
const toggleCheckbox = document.querySelector("#check");
const body = document.body;

const sunImg = document.querySelector(".toggle-sun-div img");
const moonImg = document.querySelector(".toggle-moon-div img")
const slider = document.querySelector(".slider");
const sliderDigit = document.querySelector(".char-length-digit");



// Update the slider value and slider background
const updateDigit = () => {
    sliderDigit.textContent = slider.value;
}

// Update the slider background
const updateSlider = () => {

    if (toggleCheckbox.checked) {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--Purple-600) ${value}%, var(--Blue-850) ${value}%)`;
    } else {
        const value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
        slider.style.background = `linear-gradient(to right, var(--Purple-600) ${value}%, white ${value}%)`;
    }

}



// Event listener for slider input
slider.addEventListener("input", () => {
    updateSlider();
    updateDigit();

});

// Dark mode
toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
        body.classList.add("dark-mode");

        sunImg.src = "starter-code/assets/images/icon-sun-light.svg";
        moonImg.src = " starter-code/assets/images/icon-moon-light.svg"

    } else {
        body.classList.remove("dark-mode");

        sunImg.src = "starter-code/assets/images/icon-sun-dark.svg";
        moonImg.src = " starter-code/assets/images/icon-moon-dark.svg"
    }

    updateSlider();
});