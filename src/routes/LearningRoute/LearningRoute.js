import React, {Component} from 'react'
import ErrorBoundary from '../../components/ErrorBoundary';
import LanguageContext from '../../contexts/LanguageContext';
import LanguageService from '../../services/language-service';
import WordCard from './WordCard';
import '../../components/App/App.css'

export default class LearningRoute extends Component {
  static contextType=LanguageContext;
  constructor(context) {
    super(context)
    const state={
      result: '',
      word: {},
      newWord: {},
      answered: false,
      lastGuess: '',
      myGuess: '',
      translation: "",
      correctCount: 0,
      incorrectCount: 0,
    }
    this.state=state;
  }


  componentDidMount() {
    LanguageService.getHeadWord()
      .then(
        headword =>
          this.setState({word: headword}))
  }

  renderWord=() => {
    const {word, answered}=this.state;

    return (<WordCard word={word} answered={answered} />)
  }

  handleUpdateGuess=(e) => {
    this.setState({myGuess: e.target.value})
  }

  handleNextWord=() => {
    this.setState({word: this.state.newWord, answered: false})
  }

  handleSubmitGuess=(e) => {
    e.preventDefault();
    const {myGuess}=this.state;
    const formatted=myGuess.toLocaleLowerCase();
    LanguageService.submitGuess(formatted)
      .then(res => {
        res.isCorrect? this.setState({result: "correct", newWord: res, answered: true, lastGuess: this.state.myGuess, myGuess: ''}):this.setState({result: "incorrect", newWord: res, answered: true, lastGuess: this.state.myGuess, myGuess: ''})
      }
      )
  }

  render() {
    const {lastGuess}=this.state
    return (
      <>< div className="DisplayScore width-0"><p className="width-0">Your total score is: {this.state.newWord.totalScore}</p></div>
        {this.state.result==='correct'&&this.state.answered&&<div className="width-0"><h2 className="width-0">You were correct! :D</h2></div>}
        {this.state.result==='incorrect'&&this.state.answered&&<div className="width-0"><h2 className="width-0">Good try, but not quite right :(</h2></div>}
        <div className="DisplayFeedback width-0"><p className="width-0">
          The correct translation for {this.state.newWord.nextWord} was {this.state.newWord.answer} and you chose {lastGuess}!</p></div>

        <section
          className="font-mono flex-col-wrap flex-1 justify text-green text-shadow pt-1 width-full">
          {this.state.result==='correct'&&this.state.answered&&<div
            className="flex-1 tracking-wide font-xl text-center">That was: {this.state.result.toLocaleUpperCase()}</div>}
          {this.state.result==='incorrect'&&this.state.answered&&<div
            className="flex-1 tracking-wide font-xl text-red text-center">That was: {this.state.result.toLocaleUpperCase()}</div>}
          {this.state.result!==''&&this.state.answered&&<div
            className="flex-1 font-xl">Last Answer was: {this.state.newWord.answer.toLocaleUpperCase()}</div>}

          <ErrorBoundary>
            <div
              className="flex-col flex-1 center justify m-1">

              <div
                className="flex-1 flex-col-wrap justify">{this.renderWord()}</div>
              {this.state.answered&&
                <div
                  className="flex-row flex-2 anim-plus mx-2">
                  <button
                    className="outline-none flex-1 mx-4 text-white font-mono hoverbutt border-none
                focus font-xl box-shadow-xl transition rounded text-dec-none" onClick={this.handleNextWord} >
                    Try another word!
                  </button>
                </div>}
              {!this.state.answered&&
                <form onSubmit={this.handleSubmitGuess}
                  className="flex-col-wrap flex-2 anim-plus justify focus font-xl
                 box-shadow-xl transition rounded text-dec-none ">
                  <label className="width-0" htmlFor="learn-guess-input">
                    What's the translation for this word?</label>
                  <input
                    className="font-xl flex-1 border-none focus p-4 rounded
                   outline-none bg-invis center"
                    type="text"
                    id="learn-guess-input"
                    name="guess_input"
                    required
                    onChange={this.handleUpdateGuess}>
                  </input>
                  <button type="submit"
                    className="outline-none flex-1 py-2 mx-4 font-xl focus rounded
                    text-white font-mono hoverbutt border-none"  >
                    Submit your answer
                  </button>
                </form>}
            </div>
          </ErrorBoundary>
        </section>
      </>
    );
  }
}
