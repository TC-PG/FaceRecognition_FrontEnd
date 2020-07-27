import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';



const particleOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }


  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  calculateFaceLocation = (data) => {
    const regions = data.outputs[0].data.regions;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    let boxes = regions.map(region => {
      let box = region.region_info.bounding_box;
      return {
        leftCol: box.left_col * width,
        topRow: box.top_row * height,
        rightCol: width - (box.right_col * width),
        bottomRow: height - (box.bottom_row * height)
      }
    });

    return boxes;
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onPictureSubmit = () => {

    this.setState({ imageUrl: this.state.input });
      fetch('https://smartfacerecogniton.herokuapp.com/imageUrl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())  
      .then(response => {
        if (response) {
          fetch('https://smartfacerecogniton.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(resp => resp.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }

        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch(err => console.log(err));

  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  }

  loadUser = (data) => {
    this.setState({
      user:
      {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  }

  render() {
    const { isSignedIn, route, imageUrl, box } = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particleOptions}
        />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {route === 'home'
          ?
          <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries} />
            <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          :
          (
            route === 'signin'
              ? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
              : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;
