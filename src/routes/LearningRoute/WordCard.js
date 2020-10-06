import React from 'react';
import '../../components/App/App.css'

export default function WordCard(props) {


  const {word}=props
  const url={
    pronounce: `https://www.teanglann.ie/en/fuaim/${word.nextWord}`
  }
  return (
    <div className="flex-row-wrap flex-1 max-max text-left justify">
      <div className="flex-1 width-20">Rights: {word.wordCorrectCount}</div>
      <div className="flex-1 width-20 text-red">Wrongs: {word.wordIncorrectCount}</div>
      <div className="flex-1 width-20 text-bold">Totals: {word.totalScore}</div>
      <h2 className="flex-2 p-4 focus min anim">
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
