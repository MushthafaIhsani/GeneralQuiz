const quizData = [
    {
        question: "What is the square root of 144?",
        options: ["12", "10", "8", "6"],
        answer: "12"
    },
    {
        question: "Which planet is known as the 'Morning Star' and 'Evening Star'?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        answer: "Venus"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Hg"],
        answer: "Au"
    },
    {
        question: "Who wrote 'The Adventures of Tom Sawyer'?",
        options: ["Mark Twain", "Charles Dickens", "J.K. Rowling", "Ernest Hemingway"],
        answer: "Mark Twain"
    },
    {
        question: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        answer: "Nile"
    },
    {
        question: "Which country is the largest by land area?",
        options: ["Russia", "Canada", "China", "United States"],
        answer: "Russia"
    },
    {
        question: "Who discovered penicillin?",
        options: ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Albert Einstein"],
        answer: "Alexander Fleming"
    },
    {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "How many bones are there in the human body?",
        options: ["206", "214", "198", "220"],
        answer: "206"
    },
    {
        question: "Who painted the ceiling of the Sistine Chapel?",
        options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
        answer: "Michelangelo"
    }
];

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const result = document.getElementById('result');
const progressBar = document.getElementById('progress-bar');
const timerElement = document.getElementById('timer');

let currentQuestion = 0;
let score = 0;
let timer;
const timePerQuestion = 10; // 10 seconds per question

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionContainer.innerText = currentQuizData.question;

    optionsContainer.innerHTML = '';
    currentQuizData.options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(button, option));
        optionsContainer.appendChild(button);
    });

    submitBtn.style.display = 'none';
    startTimer(timePerQuestion);
    updateProgressBar();
}

function checkAnswer(button, answer) {
    clearInterval(timer);
    const correct = answer === quizData[currentQuestion].answer;
    button.classList.add(correct ? 'correct' : 'wrong');

    if (correct) {
        score++;
    }

    Array.from(optionsContainer.children).forEach(btn => {
        btn.disabled = true;
        if (btn.innerText === quizData[currentQuestion].answer) {
            btn.classList.add('correct');
        }
    });

    submitBtn.style.display = 'block';
    currentQuestion++;
}

function showResult() {
    questionContainer.innerText = '';
    optionsContainer.innerHTML = '';
    submitBtn.style.display = 'none';
    progressBar.style.display = 'none';
    timerElement.style.display = 'none';
    result.innerHTML = `Your Score: ${score} out of ${quizData.length}<br>${score >= quizData.length / 2 ? 'Great job!' : 'Better luck next time!'}`;
}

function updateProgressBar() {
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function startTimer(seconds) {
    let timeLeft = seconds;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null, ''); // force next question
        }
    }, 1000);
}

submitBtn.addEventListener('click', () => {
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

loadQuestion();
