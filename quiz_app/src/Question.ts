class Question {
    constructor(public questionText: string, public options: string[], public correctOption: number) {}
  
    isCorrect(answer: number): boolean {
      return answer === this.correctOption;
    }
  }
  export default Question