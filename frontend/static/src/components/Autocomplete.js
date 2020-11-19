// Autocomplete.js
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  text-align:center;
`;

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLocation: null,
    }
    this.clearSearchBox = this.clearSearchBox.bind(this);
    }

    static getDerivedStateFromProps(props, state) {
      // Any time the current user changes,
      // Reset any parts of state that are tied to that user.
      // In this simple example, that's just the email.
      if (props.selectedLocation !== state.selectedLocation) {
        return {
          selectedLocation: props.selectedLocation,
        };
      }
      return null;
    }

  componentDidMount({ map, mapApi } = this.props) {
    const options = {
      // restrict your search to a specific type of result
      types: ['address'],
      // restrict your search to a specific country, or an array of countries
      // componentRestrictions: { country: ['gb', 'us'] },
    };
    this.autoComplete = new mapApi.places.Autocomplete(
    this.searchInput,
        options,
      );
    this.autoComplete.addListener('place_changed', this.onPlaceChanged);
    this.autoComplete.bindTo('bounds', map);
    }

    componentWillUnmount({ mapApi } = this.props) {
      mapApi.event.clearInstanceListeners(this.searchInput);
    }

    onPlaceChanged = ({ map, addplace } = this.props) => {
      console.log('firing', )
      const place = this.autoComplete.getPlace();
      // console.log('auto place', place)

      if (!place.geometry) return;
      if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);
      }

      addplace(place);
      console.log('addplace', place)
      this.searchInput.blur();
    };

    clearSearchBox() {
        this.searchInput.value = '';
    }

    render() {
      return (
        <Wrapper>
          <input
            className="search-input"
            ref={(ref) => {
              this.searchInput = ref;
              }}
              type="text"
              onFocus={this.clearSearchBox}
              placeholder="Enter a location"
              />
          </Wrapper>
        );
    }
}

export default Autocomplete;
