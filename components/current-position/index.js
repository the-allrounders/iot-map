import React, { Component } from 'react';

class CurrentPositionMarker extends Component {
  state = {};
  ref = null;

  render() {
    const customStyle = {
      markerBackground: {
        borderRadius: '50%',
        width: '60px',
        height: '60px',
        backgroundColor: 'rgba(0, 0, 255, 0.5)',
        marginTop: '-30px',
        marginLeft: '-30px',
      },
      icon: {
        width: '20px',
        height: '20px',
        backgroundColor: 'rgba(0, 0, 255, 1)',
        border: '3px solid #fff',
        borderRadius: '50%',
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    return (
      <span ref={c => this.ref = c}>
        <div style={customStyle.markerBackground}>
          <div style={customStyle.icon} />
        </div>
      </span>
    );
  }
}

export default CurrentPositionMarker;
