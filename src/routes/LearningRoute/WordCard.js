import React from 'react';
import '../../components/App/App.css'

export default function WordCard(props) {


  const {word}=props
  const url={
    pronounce: `https://www.teanglann.ie/en/fuaim/${word.nextWord}`
  }
  return (
    <div className="flex-col flex-1 font-xl max-fit center justify">
      <div className="flex-1">Rights: {word.wordCorrectCount}</div>
      <div className="flex-1 text-red">Wrongs: {word.wordIncorrectCount}</div>
      <div className="flex-1 text-bold text-black">Totals: {word.totalScore}</div>
      <h2 className="flex-2 p-4 focus anim">
        <a target="blank" className="input text-green font-xxl text-dec-none" href={url.pronounce}>
          {word.nextWord}
        </a>
      </h2>
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
