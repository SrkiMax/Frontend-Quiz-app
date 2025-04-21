


const toggleCheckbox = document.querySelector("#check");
const body = document.body;

const headerLeft = document.querySelector(".header-left");
const headerColorBox = document.querySelectorAll(".header-img");
const headerImg = document.querySelectorAll(".header-img img");
const headerText = document.querySelectorAll(".header-text p");


const sunImg = document.querySelector(".toggle-sun-div img");
const moonImg = document.querySelector(".toggle-moon-div img")
const slider = document.querySelector(".slider");

const homePage = document.querySelector(".card1");
const questionsCard = document.querySelector(".card2");
const scorecard = document.querySelector(".scorecard-page");


const questionElement = document.querySelector(".question");
const optionElements = document.querySelectorAll(".option");



const submitBtn = document.querySelector(".submit-button");
const errorMessageDiv = document.querySelector(".error-message-div");
const playAgainBtn = document.querySelector(".play-again-button");

const questionNumberText = document.querySelector(".number-span");

const quizButtons = document.querySelectorAll(".element");
let isSubmitted = false;
let selectedQuiz = null;
let currentQuestionIndex = 0;
let selectedOption = null;
let score = 0;







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



// Dark mode
toggleCheckbox.addEventListener("change", () => {
    if (toggleCheckbox.checked) {
        body.classList.add("dark-mode");

        sunImg.src = "starter-code/assets/images/icon-sun-light.svg";
        moonImg.src = "starter-code/assets/images/icon-moon-light.svg"

    } else {
        body.classList.remove("dark-mode");

        sunImg.src = "starter-code/assets/images/icon-sun-dark.svg";
        moonImg.src = "starter-code/assets/images/icon-moon-dark.svg"
    }

    updateSlider();
});


/*Fetching data from my JSON file*/
async function fetchLiveData() {
    try {
        const response = await fetch('./data.json');
        const body = await response.json();
        console.log("Fetching Live Data", body);
        return body;
    } catch (error) {
        console.error("Error fetching data: ", error);
    }

};



/*Sumbit button */

submitBtn.addEventListener("click", () => {

    if (!isSubmitted) {
        // SUBMIT mode
        if (!selectedOption) {
            errorMessageDiv.classList.add("show-error");

        } else {
            errorMessageDiv.classList.remove("show-error");

            // Get current question and correct answer
            const currentQuestion = selectedQuiz.questions[currentQuestionIndex];
            const correctAnswer = currentQuestion.answer;

            optionElements.forEach((optionEl) => {
                const answerText = optionEl.querySelector(".option-text").textContent;
                const imgDiv = optionEl.querySelector(".img-div");
                const letter = optionEl.querySelector(".option-letter");
                const checkIcon = optionEl.querySelector("img");


                // Hide all checkmarks initially
                checkIcon.style.display = "none";

                // Highlight the correct answer
                if (answerText === correctAnswer) {
                    if (optionEl === selectedOption) {
                        // Correct and selected
                        optionEl.classList.add("correct");
                        imgDiv.classList.add("correct");
                        letter.style.color = "white";
                        checkIcon.style.display = "inline";
                        score++; // Correct answer, add to score
                    } else {
                        // Correct but NOT selected — show checkmark only
                        checkIcon.style.display = "inline";
                    }

                } else {
                    if (optionEl === selectedOption) {
                        // Wrong selected
                        optionEl.classList.add("incorrect");
                        imgDiv.classList.add("incorrect");
                        checkIcon.setAttribute("src", "starter-code/assets/images/icon-incorrect.svg");
                        checkIcon.style.display = "inline";
                        letter.style.color = "white";
                    }
                }

            })

            // Disable further clicks
            optionElements.forEach((opt) => {
                opt.style.pointerEvents = "none";
            });

            submitBtn.textContent = "Next Question";
            errorMessageDiv.classList.remove("show-error");
            isSubmitted = true;
        }
    } else {
        handleNextQuestion();
    }
});
//Adding a keyboard eventListener
submitBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        submitBtn.click();
    }
});



const handleNextQuestion = () => {
    // NEXT QUESTION mode
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuiz.questions.length) {
        showQuestions();
        resetOptions();
        selectedOption = null;
        submitBtn.textContent = "Submit Answer";
        isSubmitted = false;
        slider.value = currentQuestionIndex + 1;
        updateSlider();
    } else {
        showScorecard();

    }
}


const showScorecard = () => {
    // QUIZ COMPLETED — Show scorecard
    questionsCard.classList.remove("active");
    scorecard.classList.add("active");


    //Show the score
    document.querySelector(".score-number").textContent = score;

    document.querySelector(".text-under-number").textContent = `out of ${selectedQuiz.questions.length}`;
}


// Reset the clicked options
const resetOptions = () => {
    optionElements.forEach((option) => {
        // Remove option state classes
        option.classList.remove("clicked", "correct", "incorrect");
        option.style.pointerEvents = "auto";

        // Reset img-div
        const imgDiv = option.querySelector(".img-div");
        imgDiv.classList.remove("clicked", "correct", "incorrect");

        // Reset letter color
        const letter = option.querySelector(".option-letter");
        letter.style.color = ""; // back to default (inherited or stylesheet)

        // Reset icon
        const icon = option.querySelector("img");
        icon.style.display = "none";
        icon.setAttribute("src", "starter-code/assets/images/icon-correct.svg");

    });
    selectedOption = null;
};


optionElements.forEach((option) => {
    option.addEventListener("click", () => {

        resetOptions(); // removes .clicked, .correct, .incorrect

        option.classList.add("clicked");
        const imgDiv = option.querySelector(".img-div");
        imgDiv.classList.add("clicked");
        option.querySelector(".option-letter").style.color = "white";
        selectedOption = option;

    });
    //Adding a keyboard eventListener
    option.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            option.click();
        }
    });

});


playAgainBtn.addEventListener("click", () => {
    // Reset quiz state
    currentQuestionIndex = 0;
    selectedOption = null;
    score = 0;
    isSubmitted = false;
    slider.value = 1;

    // Update the slider
    updateSlider();

    // Hide scorecard, show home page
    scorecard.classList.remove("active");
    homePage.classList.remove("not-active");

    // Hide header-left section
    headerLeft.style.display = "none";

    // Reset submit button text
    submitBtn.textContent = "Submit Answer";

    resetOptions();


})



/*Show the questions and offered answers for each subject*/
const showQuestions = () => {
    const currentQuestion = selectedQuiz.questions[currentQuestionIndex];

    console.log("Current Question Data is: ", currentQuestion);

    questionElement.textContent = currentQuestion.question;
    questionNumberText.textContent = currentQuestionIndex + 1;

    optionElements.forEach((optionEl, index) => {
        const answerText = currentQuestion.options[index];

        optionEl.querySelector(".option-text").textContent = answerText;
    });

}

/*Choosing which quiz subject the user wants to take*/
quizButtons.forEach((quizbtn, index) => {
    quizbtn.addEventListener("click", async () => {
        const data = await fetchLiveData();
        selectedQuiz = data.quizzes[index]; //Taking the data from JSON file for the selected quiz
        console.log("The option chosen is:", selectedQuiz);

        headerLeft.style.display = "flex";

        //This will dynamically show a different image and title in the header based on the quiz selected
        const headerImageSource = `starter-code/${selectedQuiz.icon.slice(2)}`;
        console.log("Header image source is now: ", headerImageSource);
        headerImg.forEach((image) => {
            image.src = headerImageSource;
        })
        headerText.forEach((text) => {
            text.textContent = selectedQuiz.title;
        })


        const title = selectedQuiz.title;
        headerColorBox.forEach((box) => {
            if (title === "HTML") {
                box.style.backgroundColor = "#FFF5ED";
            } else if (title === "CSS") {
                box.style.backgroundColor = "#E0FDEF";
            } else if (title === "JavaScript") {
                box.style.backgroundColor = "#EBF0FF";
            } else if (title === "Accessibility") {
                box.style.backgroundColor = "#F6E7FF";
            }
        })

        //Hide the home page and show the questionCard
        questionsCard.classList.add("active");
        // When the user enters the quiz, focus will loop within .card2.

        homePage.classList.add("not-active");

        showQuestions();
        slider.value = currentQuestionIndex + 1;

    });
    //Adding a keyboard eventListener
    quizbtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            quizbtn.click();
        }
    });

});


