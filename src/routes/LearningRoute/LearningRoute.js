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
    const {word}=this.state;

    return (<WordCard word={word} />)
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
    console.log(myGuess, 'goodguess')
    const formatted=myGuess.toLocaleLowerCase();
    LanguageService.submitGuess(formatted)
      .then(res => {
        res.totalScore>this.state.word.totalScore? this.setState({result: "correct", newWord: res, answered: true}):this.setState({result: "incorrect", newWord: res, answered: true})
      }
      )
  }

  render() {

    return (
      <section className="font-mono flex-col-wrap flex-1 justify text-green text-shadow pt-1 width-full">
        <ErrorBoundary>

          <div className="flex-col flex-1 justify m-4">

            {this.state.result!==''&&<div className="flex-1 tracking-wide font-xl text-center">That was: {this.state.result.toLocaleUpperCase()}</div>}
            {this.state.result!==''&&<div className="flex-1 font-xl">Last Answer was: {this.state.newWord.answer.toLocaleUpperCase()}</div>}

            <div className="flex-1 flex-row font-xl">{this.renderWord()}</div> {this.state.answered&&<div className="flex-row-nowrap center flex-2 font-xl max-fit text-dec-none transition"><button className="flex-2 font-xl text-white font-xl font-mono hover box-shadow hoverbutt border-none" onClick={this.handleNextWord} >Next Word</button></div>}
            {!this.state.answered&&
              <div className="flex-row flex-2 max-fit focus font-xl box-shadow transition rounded text-dec-none ">
                <input className="font-xl flex-1 border-none focus px-2 rounded-tl-bl outline-none bg-invis center" type="text" id="guess_input" name="guess_input" onChange={this.handleUpdateGuess}>
                </input>
                <button className="outline-none flex-1  font-xl focus rounded-tr-br text-white font-mono hoverbutt border-none" onClick={this.handleSubmitGuess} >
                  Submit Guess
                  </button>
              </div>}

          </div>
        </ErrorBoundary>
      </section>
    );
  }
}
