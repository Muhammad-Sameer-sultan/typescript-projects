import Quiz from "./Quiz.js"
class Student {
    private name: string;
    private quiz: Quiz;
  
    constructor(name: string, quiz: Quiz) {
      this.name = name;
      this.quiz = quiz;
    }
  
    takeQuiz(): void {
      console.log(`Welcome, ${this.name}! Let's start the quiz.\n`);
      this.quiz.startQuiz();
    }
  }

  export default Student
  