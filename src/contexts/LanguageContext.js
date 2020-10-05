import react from 'react';
import React, {Component} from 'react'

const LanguageContext=React.createContext({
  language: {},
  words: [],
  langError: null,
  setLangError: () => {},
  clearLangError: () => {},
  setLanguage: () => {},
  setWords: () => {},

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
  }
  setLangError=error => {
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



  render() {
    const value={
      language: this.state.language,
      words: this.state.words,
      setLangError: this.setLangError,
      clearError: this.clearLangError,
      setLanguage: this.setLanguage,
      setWords: this.setWords,
      setWordCorrect: this.setWordCorrect
    }
    return (<LanguageContext.Provider value={value}>
      {this.props.children}
    </LanguageContext.Provider>)
  }
}
