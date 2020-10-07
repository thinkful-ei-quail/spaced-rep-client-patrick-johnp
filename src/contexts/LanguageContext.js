
import React from 'react'

const LanguageContext=React.createContext({
  language: {},
  words: [],
  langError: null,
  setLangError: () => {},
  clearLangError: () => {},
  setLanguage: () => {},
  setWords: () => {},
  getWordByID: () => {},

})
export default LanguageContext;


export class LanguageProvider extends React.Component {
  constructor(props) {
    super(props)
    const state={
      language: {},
      words: [],
      langError: null,
    }
    this.state=state;
  }

  componentDidMount() {
    // LanguageService.getLanguageWords()
    //   .then(res => {
    //     this.setLanguage(res.language)
    //     this.setWords(res.words)
    //   })
  }


  setLangError=(error) => {
    console.error(error)
    this.setState({error})
  }

  clearLangError=() => {
    this.setState({error: null})
  }

  setLanguage=(lang) => {
    this.setState({language: lang})
  }

  setWords=(wordlist) => {
    this.setState({words: wordlist})
  }

  setWordCorrect=(wordId) => {
    this.setState({words: [...this.state.words, this.state.words[wordId-1].correct_count+1]})
  }

  setWordIncorrect=(wordId) => {
    this.setState({words: [...this.state.words, this.state.words[wordId-1].incorrect_count+1]})
  }

  getWordByID=(id) => {
    return this.state.words.find(word => {return word.id===id})
  }


  render() {
    const value={
      language: this.state.language,
      words: this.state.words,
      getWordByID: this.getWordByID,
      setLangError: this.setLangError,
      clearError: this.clearLangError,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setWordCorrect: this.setWordCorrect,
      setWordIncorrect: this.setWordIncorrect
    }
    return (
      <LanguageContext.Provider value={value}>
        {this.props.children}
      </LanguageContext.Provider>
    )
  }
}
