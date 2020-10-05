import React, {Component} from 'react'
import LanguageService from '../../services/language-service'
class DashboardRoute extends Component {
  state={
    language: {},
    words: []
  };
  componentDidMount() {
    LanguageService.getLanguageWords().then(res => this.setState({language: res.language, words: res.words}));
  }



  render() {
    return (
      <section>
        implement and style me
      </section>
    );
  }
}

export default DashboardRoute
