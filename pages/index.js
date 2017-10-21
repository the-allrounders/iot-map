import fetch from 'fetch-everywhere';
import React, { Component } from 'react';
import NoSSR from 'react-no-ssr'
import NavDrawer from 'react-toolbox/lib/layout/NavDrawer';
import Layout from 'react-toolbox/lib/layout/Layout';
import Panel from 'react-toolbox/lib/layout/Panel';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import Button from 'react-toolbox/lib/button/Button';
import styled from 'styled-components';
import Head from '../components/head/head';
import Marker from '../components/marker';
import DevicePanel from '../components/device-panel';
import themeCss from '../static/theme.css';
import theme from '../static/theme.js';

const Wrapper = styled.section`
  width: 100vw;
  height: 100vh;

  .leaflet-container {
      width: 100%;
      height: 100vh;
  }
`;

const StyledButton = styled(Button)`
  position: absolute !important;
  top: 1em;
  transform: translateX(50%);
  transition-property: box-shadow, background-color, color, left !important;
  left: 0;

  ${p => p.open && 'left: 250px'}
`;

const StyledNavDrawer = styled(NavDrawer)`
  overflow: visible !important;
`;

class MapPage extends Component {
  state = {
    currentPosition: {
      lat: 51.9172979,
      lng: 4.4844551,
    },
    loaded: false,
    devices: [],
    drawerActive: false,
    activeDevice: null,
  };

  componentDidMount() {
    this.mounted = true;
    this.lastFetch = Date.now();
    this.fetchData();
    requestAnimationFrame(() => this.interval());
    this.Leaflet = require('react-leaflet');
    this.Leaflet.MarkerLayer = require('react-leaflet-marker-layer').default;
    this.setState({ loaded: true });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  onMarkerSelect(id) {
    this.setState({
      activeDevice: id,
      drawerActive: true,
    });
  }

  fetchData() {
    fetch(`${process.env.SERVER_ADDR || 'https://iot-open-server.herokuapp.com'}/data${this.lastFetch ? `?timestamp=${this.lastFetch}` : ''}`)
      .then(res => res.json())
      .then((json) => {
        const filteredDevices = json.devices.filter(device => device.location);
        this.setState({
          devices: filteredDevices,
        });
        if(json.timestamp) {
          this.lastFetch = json.timestamp;
        }
      })
      .catch(console.error);
  }

  interval() {
    if(!this.mounted) {
      return;
    }

    if(this.lastFetch + 1000 < Date.now()) { // Fetch every second
      this.fetchData();
      this.lastFetch = Date.now();
    }

    requestAnimationFrame(() => this.interval());
  }

  render() {
    if(!this.state.loaded) {
      return <span>Loading map...</span>;
    }
    const { Map, TileLayer, MarkerLayer, ZoomControl } = this.Leaflet;
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Head title="Home" />
          <NoSSR onSSR={<span>Loading map...</span>}>
            <Wrapper>
              <style global jsx>{themeCss}</style>
              <Layout>
                <Panel>
                  <Map
                    center={this.state.currentPosition}
                    zoom={10}
                    ref={c => this.map = c}
                    zoomControl={false}
                    onClick={() => this.setState({ drawerActive: false })}
                  >
                    <ZoomControl position='bottomright' />
                    <MarkerLayer
                      markers={this.state.devices}
                      latitudeExtractor={e => e.location.latitude}
                      longitudeExtractor={e => e.location.longitude}
                      markerComponent={Marker}
                      propsForMarkers={{
                        onMarkerSelect: id => this.onMarkerSelect(id),
                      }}
                    />
                    {/*<MarkerLayer*/}
                    {/*markers={[this.state.currentPosition]}*/}
                    {/*latitudeExtractor={l => l.lat}*/}
                    {/*longitudeExtractor={l => l.lng}*/}
                    {/*markerComponent={CurrentPosition}*/}
                    {/*/>*/}
                    <TileLayer
                      url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                    />
                  </Map>
                  <StyledButton
                    icon={this.state.drawerActive ? 'close' : 'keyboard_arrow_right'}
                    floating
                    accent
                    mini
                    onMouseUp={() => this.setState({ drawerActive: !this.state.drawerActive })}
                    open={this.state.drawerActive}
                  />
                </Panel>
                <StyledNavDrawer
                  active={false}
                  pinned={this.state.drawerActive}
                  permanentAt='xxxl'
                  right
                  width={100}
                >
                  <DevicePanel device={this.state.devices.find(device => device._id === this.state.activeDevice)} />
                </StyledNavDrawer>
              </Layout>
            </Wrapper>
          </NoSSR>
        </div>
      </ThemeProvider>
    )
  }
}

export default MapPage;
