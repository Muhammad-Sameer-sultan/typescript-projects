class Student {
    constructor(name, quiz) {
        this.name = name;
        this.quiz = quiz;
    }
    takeQuiz() {
        console.log(`Welcome, ${this.name}! Let's start the quiz.\n`);
        this.quiz.startQuiz();
    }
}
export default Student;
