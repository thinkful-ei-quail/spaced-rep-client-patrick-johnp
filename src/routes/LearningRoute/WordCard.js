import React from 'react';
import '../../components/App/App.css'

export default function WordCard(props) {


  const {word, answered}=props
  const url={
    pronounce: `https://www.teanglann.ie/en/fuaim/${word.nextWord}`
  }
  return (
    <div className="flex-col flex-1 font-xl max-fit center justify">
      <div className="flex-1">You have answered this word correctly {word.wordCorrectCount} times.</div>
      <div className="flex-1 text-red">You have answered this word incorrectly {word.wordIncorrectCount} times.</div>
      <p className="flex-1 text-bold text-black">Totals {word.totalScore}</p>
      <span className="width-0 text-white">{word.nextWord}</span>
      {!answered&&<h2 className="width-0 text-white">Translate the word:</h2>}
      <h4 className="flex-2 p-4 focus anim">
        <a target="blank" className="input text-green font-xxl text-dec-none" href={url.pronounce}>
          {word.nextWord}
        </a>
      </h4>
    </div>
  )
}


WordCard.defaultProps={
  word: {
    nextWord: '',
    totalScore: null,
    wordCorrectCount: null,
    wordIncorrectCount: null
  }
}
