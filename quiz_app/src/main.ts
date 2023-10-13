import  Question  from "./Question.js";
import Quiz from "./Quiz.js";
import Student from "./Student.js";
const question1 = new Question('What is the capital of France?', ['Berlin', 'Paris', 'Madrid'], 2);
const question2 = new Question('Which programming language is this quiz written in?', ['JavaScript', 'Python', 'TypeScript'], 3);

const quiz = new Quiz();
quiz.addQuestion(question1);
quiz.addQuestion(question2);

const student = new Student('John', quiz);
student.takeQuiz();
