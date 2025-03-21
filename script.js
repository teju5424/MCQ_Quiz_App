class Question {
    constructor(text, options, correctAnswer) {
        this.text = text;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
}
class Quiz {
    constructor(questions) {
        this.questions = questions;
        this.currentIndex = 0;
        this.score = 0;
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex];
    }

    checkAnswer(selectedOption) {
        const currentQuestion = this.getCurrentQuestion();
        if (selectedOption === currentQuestion.correctAnswer) {
            this.score++;
        }
        this.currentIndex++;
        this.loadQuestion();
    }

    loadQuestion() {
        const questionContainer = document.getElementById('question');
        const optionsContainer = document.getElementById('options');
        const scoreContainer = document.getElementById('score');

        if (this.currentIndex < this.questions.length) {
            const current = this.getCurrentQuestion();
            questionContainer.innerText = current.text;
            optionsContainer.innerHTML = '';

            current.options.forEach(option => {
                const button = document.createElement('button');
                button.innerText = option;
                button.onclick = () => this.checkAnswer(option);
                optionsContainer.appendChild(button);
            });
        } else {
            questionContainer.innerText = "Quiz Completed!";
            optionsContainer.innerHTML = '';
            scoreContainer.innerText = `Your Score: ${this.score} / ${this.questions.length}`;

            if (this.score === this.questions.length) {
                scoreContainer.innerText += "\nExcellent!";
            } else if (this.score >= this.questions.length / 2) {
                scoreContainer.innerText += "\nGood job!";
            } else {
                scoreContainer.innerText += "\nTry again!";
            }
        }
    }
}
const questions = [
    new Question("Choose the correct HTML element to define importatn text?", ["<i>", "<strong>", "<b>", "<important>"], "<strong>"),
    new Question("Which is a programming language?", ["HTML", "CSS", "JavaScript", "Photoshop"], "JavaScript"),
    new Question("Which HTML tag is used to create a hyperlink?", ["<link>", "<a>", "<href>", "<hyperlink>"], "<a>"),
];
const quiz = new Quiz(questions);
quiz.loadQuestion();