import React, { Component } from 'react';
import StackGrid from 'react-stack-grid';
import PinsIndexItem from '../pins/pins_index_item';
import './pins.css';

class PinsIndex extends Component {
  componentDidMount() {
    this.props.fetchPins();
    this.props.fetchUserBoards(this.props.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId !== prevProps.userId) {
      this.props.fetchUserBoards(this.props.userId);
    }
  }

  render() {
    const { pins, openModal } = this.props;
    if (!this.props.pins) return null;

    const pinItems = pins.map(pin => {
      return (
        <div>
          <PinsIndexItem key={pin._id} pin={pin} />
        </div>
      );
    });

    return (
      <StackGrid
        columnWidth={260}
        monitorImagesLoaded={true}
        duration={0}>
          { pinItems }
      </StackGrid>

      // <div className="pins-index">
      //   { pinItems }
      // </div>

    );
  }
}

export default PinsIndex;
