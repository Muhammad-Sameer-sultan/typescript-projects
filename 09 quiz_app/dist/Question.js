class Question {
    constructor(questionText, options, correctOption) {
        this.questionText = questionText;
        this.options = options;
        this.correctOption = correctOption;
    }
    isCorrect(answer) {
        return answer === this.correctOption;
    }
}
export default Question;
