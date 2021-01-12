import React from 'react';
import CreateEvent from './CreateEvent';

class HolderCreateEvent extends React.Component {
  render() {
    return <CreateEvent input={<input />} 
        onClose={() => {}}/>
  }
}
export default HolderCreateEvent