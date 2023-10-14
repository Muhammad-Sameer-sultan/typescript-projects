import inquirer from "inquirer";
class Quiz {
    constructor() {
        this.questions = [];
        this.startQuiz = async () => {
            let score = 0;
            for (let index = 0; index < this.questions.length; index++) {
                const question = this.questions[index];
                console.log(`Question ${index + 1}: ${question.questionText}`);
                question.options.forEach((option, i) => console.log(`${i + 1}. ${option}`));
                const { userAnswer } = await inquirer.prompt({
                    type: 'number',
                    name: 'userAnswer',
                    message: 'Your answer:',
                });
                if (question.isCorrect(userAnswer)) {
                    console.log('Correct!\n');
                    score++;
                }
                else {
                    console.log(`Incorrect. The correct answer is ${question.correctOption}\n`);
                }
            }
            console.log(`Quiz completed. Your score: ${score}/${this.questions.length}`);
        };
    }
    addQuestion(question) {
        this.questions.push(question);
    }
}
export default Quiz;
