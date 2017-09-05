import React, { Component } from 'react';
import NoSSR from 'react-no-ssr'
import fetch from 'fetch-everywhere';
import styled from 'styled-components';
import Head from '../components/head/head';
import Marker from '../components/marker';
import CurrentPosition from '../components/current-position';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;
  
  .leaflet-container {
      width: 100vw;
      height: 100vh;
  }
`;

class MapPage extends Component {
  state = {
    currentPosition: {
      lat: 51.9172979,
      lng: 4.4844551,
    },
    loaded: false,
    devices: [],
  };

  componentDidMount() {
    this.mounted = true;
    this.fetchData();
    requestAnimationFrame(() => this.interval());
    this.Leaflet = require('react-leaflet');
    this.Leaflet.MarkerLayer = require('react-leaflet-marker-layer').default;
    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  fetchData() {
    fetch(`${process.env.SERVER_ADDR}/data?timestamp=${this.lastFetch || Date.now()}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({
          devices: json.devices,
        });
        this.lastFetch = json.timestamp;
      })
      .catch(console.error);
  }

  interval() {
    if(!this.mounted) {
      return;
    }

    if(this.lastFetch + 5000 < Date.now()) { // Fetch every second
      this.fetchData();
    }

    requestAnimationFrame(() => this.interval());
  }

  render() {
    if(!this.state.loaded) {
      return <span>Loading map...</span>;
    }
    const { Map, TileLayer, MarkerLayer } = this.Leaflet;
    return (
      <div>
        <Head title="Home" />
        <Wrapper>
          <NoSSR onSSR={<span>Loading map...</span>}>
            <Map
              center={this.state.currentPosition}
              zoom={10}
              ref={c => this.map = c}
            >
              <MarkerLayer
                markers={this.state.devices}
                latitudeExtractor={e => e.location.latitude}
                longitudeExtractor={e => e.location.longitude}
                markerComponent={Marker}
              />
              <MarkerLayer
                markers={[this.state.currentPosition]}
                latitudeExtractor={l => l.lat}
                longitudeExtractor={l => l.lng}
                markerComponent={CurrentPosition}
              />
              <TileLayer
                url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
              />
            </Map>
          </NoSSR>
        </Wrapper>
      </div>
    )
  }
}

export default MapPage;
