import React from 'react';
import FirebaseEventListener from '../../libs/FirebaseEventListener';
import WaitFor from './WaitFor';
import isFunction from 'lodash/isFunction';
import withNotification from './withNotification';

export default servicesCall => Component => {
  class WithFirebaseData extends React.Component {
    constructor(props) {
      super(props);
      const propsServiceCallsMap = isFunction(servicesCall) ? servicesCall(props) : servicesCall;
      this.propsEventListenersMap = Object.keys(propsServiceCallsMap).reduce(
        (acc, propName) => ({ ...acc, [propName]: new FirebaseEventListener(propsServiceCallsMap[propName]) }),
        {}
      );
      this.dataFetchPromise = Promise.all(
        Object.values(this.propsEventListenersMap).map(eventListener => eventListener.getInitialEventPromise())
      );
    }

    componentDidMount() {
      Object.entries(this.propsEventListenersMap).forEach(([propName, eventListener]) => {
        eventListener.onEvent(data => this.setState({ [propName]: data }));
        eventListener.onError(error => {
          if (process.env.NODE_ENV !== 'prod') console.error(error);
          const message = 'An error has occurred while performing the requested operation';
          this.props.notifications.addNotification(message, 'error');
        });
      });
    }

    componentWillUnmount() {
      Object.values(this.propsEventListenersMap).forEach(eventListener => eventListener.unsubscribe());
    }

    render() {
      return (
        <WaitFor operation={this.dataFetchPromise}>
          <Component {...this.state} {...this.props} />
        </WaitFor>
      )
    }
  }

  return withNotification(WithFirebaseData);
}