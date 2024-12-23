const homePage = document.getElementById('home-page');
const quizPage = document.getElementById('quiz-page');
const resultsPage = document.getElementById('results-page');
const categories = document.getElementById('categories');
const progressBar = document.getElementById('progress-bar');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const retakeButton = document.getElementById('retake-button');
const homeButton = document.getElementById('home-button');

let currentCategory = null;
let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const quizData = {
    general: [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Paris", "Madrid", "Rome"],
            answer: "Paris"
        },
        {
            question: "What is 2 + 2?",
            options: ["3", "4", "5", "6"],
            answer: "4"
        }
    ],
    science: [
        {
            question: "What is the chemical symbol for water?",
            options: ["H2O", "CO2", "O2", "NaCl"],
            answer: "H2O"
        },
        {
            question: "What is the speed of light?",
            options: ["300,000 km/s", "150,000 km/s", "100,000 km/s", "500,000 km/s"],
            answer: "300,000 km/s"
        }
    ],
    history: [
        {
            question: "In which year did World War II end?",
            options: ["1943", "1945", "1947", "1949"],
            answer: "1945"
        },
        {
            question: "Who was the first president of the United States?",
             options: ["Thomas Jefferson", "George Washington", "John Adams", "Abraham Lincoln"],
             answer: "George Washington"
        }
    ]
};

function loadQuestions() {
    questions = quizData[currentCategory];
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
    updateProgressBar();
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        score++;
    }
    currentQuestionIndex++;
    showQuestion();
}

function updateProgressBar() {
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.innerHTML = `<div style="width: ${progress}%"></div>`;
}

function showResults() {
    quizPage.style.display = 'none';
    resultsPage.style.display = 'block';
    scoreElement.textContent = `Your score: ${score} / ${questions.length}`;
}

function startQuiz(category) {
    currentCategory = category;
    homePage.style.display = 'none';
    quizPage.style.display = 'block';
    resultsPage.style.display = 'none';
    loadQuestions();
}

categories.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        startQuiz(event.target.dataset.category);
    }
});

retakeButton.addEventListener('click', () => {
    startQuiz(currentCategory);
});

homeButton.addEventListener('click', () => {
    homePage.style.display = 'block';
    quizPage.style.display = 'none';
    resultsPage.style.display = 'none';
});
