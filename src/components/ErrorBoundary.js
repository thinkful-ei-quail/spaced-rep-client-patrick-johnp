import React from 'react'



export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state={hasError: false};
  }

  static getDerivedStateFromError(error) {

    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    this.context.setError(error)

  }

  render() {
    if(this.state.hasError) {
      return <h1 color='text-red'>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
