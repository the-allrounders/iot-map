import React, { Component } from 'react';
import styled from 'styled-components';
import Button from 'react-toolbox/lib/button/Button';
import Input from 'react-toolbox/lib/input/Input';
import DataEntry from '../data-entry';

const Wrapper = styled.div`
  padding: 0 20px 20px 20px;
`;

const EmptyText = styled.p`
  padding: 0 16px;
`;

class DevicePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actuator: props.device ? props.device.actuator : '',
    };
  }

  handleChange(value = '') {
    this.setState({ actuator: value });
  };

  actuator() {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch(`${process.env.SERVER_ADDR || 'https://iot-open-server.herokuapp.com'}/actuator/${this.props.device._id}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(this.state),
    })
      .then(res => res.json())
      .then((json) => {
        this.setState({ actuator: '' });
      })
    .catch(console.error);
  }

  render() {
    const { device } = this.props;

    if(!device) {
      return (
        <div>
          <EmptyText>Please first select a marker on the map to show its info.</EmptyText>
        </div>
      );
    }

    const data = device.data.map(entry => <DataEntry entry={entry} key={entry.key} />);

    return (
      <Wrapper>
        <h2>{device.name}</h2>
        <ul>
          {data}
        </ul>
        <div>
          <Input type='text' label='Actuator' name='actuator' value={this.state.actuator} onChange={(value) => this.handleChange(value)} />
          <Button icon='play_circle_outline' label='Trigger actuator' onClick={(e) => this.actuator(e)} flat />
        </div>
      </Wrapper>
    );
  };
}

export default DevicePanel;
