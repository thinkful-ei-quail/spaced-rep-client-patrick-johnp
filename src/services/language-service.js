import config from '../config'
import Tokenservice from '../services/token-service'
const LanguageService={
  getLanguageWords() {
    return fetch(`${config.API_ENDPOINT}/language`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${Tokenservice.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },
  getHeadWord() {
    return fetch(`${config.API_ENDPOINT}/language/head`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${Tokenservice.getAuthToken()}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  },


  submitGuess(guess) {

    return fetch(`${config.API_ENDPOINT}/language/guess`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${Tokenservice.getAuthToken()}`,
      },
      body: JSON.stringify({'guess': `${guess}`}),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          :res.json()
      )
  }
}


export default LanguageService;
