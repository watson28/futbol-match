import React from 'react'
import PropTypes from 'prop-types'
import LoadingIndicator from '../presentationals/LoadingIndicator';

export default class WaitFor extends React.Component {
  state = { resolved: false, result: null }

  static propTypes = {
    operation: PropTypes.instanceOf(Promise)
  }

  static defaultProps = {
    operation: Promise.resolve(),
    fallback: <LoadingIndicator />
  }

  componentDidMount () {
    this.updateStateAfterOperation()
  }

  componentDidUpdate (prevProps) {
    if (this.props.operation !== prevProps.operation) {
      this.setState({ resolved: false })
      this.updateStateAfterOperation()
    }
  }

  updateStateAfterOperation () {
    this.props.operation.then(result => {
      this.setState({ resolved: true, result })
    })
  }

  render () {
    if (!this.state.resolved) return this.props.fallback
    if (typeof this.props.children === 'function') return this.props.children(this.state.result)
    return this.props.children
  }
}
