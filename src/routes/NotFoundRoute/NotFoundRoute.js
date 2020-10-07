import React, {Component} from 'react'

class NotFoundRoute extends Component {
  render() {
    return (
      <section className="flex flex-1 font-xl justify">
        <h2 className="flex-1 font-bold text-red">404 - Page not found</h2>
        <p className="flex-1">Try going back to your previous page.</p>
      </section>
    );
  }
}

export default NotFoundRoute
