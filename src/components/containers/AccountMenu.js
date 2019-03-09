import React from 'react';
import AccountMenuPresentational from '../presentationals/AccountMenu';

export default class AccountMenu extends React.Component {
  state = { anchorEl: null }

  render () {
    return (
      <AccountMenuPresentational
        anchorEl={this.state.anchorEl}
        onOpen={event => this.setState({ anchorEl: event.currentTarget })}
        onClose={() => this.setState({ anchorEl: null })}
      />
    )
  }
}