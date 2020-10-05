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

}


export default LanguageService;
