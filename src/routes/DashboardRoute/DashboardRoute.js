import React, {Component} from 'react'
import LanguageContext from '../../contexts/LanguageContext';
import LanguageService from '../../services/language-service'
import '../../components/App/App.css'
import {Link} from 'react-router-dom';
class DashboardRoute extends Component {
  static contextType=LanguageContext;
  constructor(context) {
    super(context)
    const state={
      words: [],
      language: {}

    }
    this.state=state;
  }

  componentDidMount() {
    LanguageService.getLanguageWords()
      .then(res => {
        this.context.setLanguage(res.language)
        this.context.setWords(res.words)
        this.setState({words: this.context.words, language: this.context.language})

      }
      )
  }

  renderWordScores() {
    const {words}=this.state;
    return (
      words.map(word =>
        <div className="flex-row-wrap background-lightgrey box-shadow-dark center m-1 max-fit transition font-xl
        px-4 shadow rounded-light hover" key={word.id}>
          <h3 className="font-mono flex-1">{word.original}</h3>
          <p className="flex-1 font-xl">Correct: {word.correct_count}</p>
          <p className="text-red flex-1 font-xl">Incorrect: {word.incorrect_count}</p>
        </div>)
    )
  }

  render() {
    const {language}=this.state;
    return (
      <section className="font-mono flex-row-wrap text-green px-2 justify max-h-full max-fit pb-10 mb-10">
        <div className="flex-2 font-xl">You're Learning: {language.name}</div>
        <div className="flex-2 font-xl ">Total Score: {language.total_score}</div>
        <div>
          <button className="text-white font-xl font-mono py-2 m-1 hover rounded flex-1 box-shadow hoverbutt text-dec-none transition border-none">
            <Link to="/learn" className="text-white font-xl font-mono py-2 m-1  rounded-top text-dec-none">
              Learning</Link></button></div>
        <div className=" flex-row flex-2 max-h-50 justify p-4">{this.renderWordScores()}</div>
      </section>
    );
  }
}

export default DashboardRoute
