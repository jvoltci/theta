import React from 'react';
import { Magnetometer } from 'expo-sensors';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';

export default class MagnetometerSensor extends React.Component {
  state = {
    MagnetometerData: {},
  };

  componentDidMount() {
    this._toggle();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  };

  _slow = () => {
    Magnetometer.setUpdateInterval(1000);
  };

  _fast = () => {
    Magnetometer.setUpdateInterval(16);
  };

  _subscribe = () => {
    this._subscription = Magnetometer.addListener(result => {
      this.setState({ MagnetometerData: result });
    });
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();	
    this._subscription = null;
  };

  render() {
  	let theta = "0rad";
    let { x, y, z } = this.state.MagnetometerData;
    if(this._subscription) {
	    theta = Math.atan(-x/y);
	    if(-x > 0 && y > 0) {

	    }
	    else if(y > 0) {
	    	theta += Math.PI;
	    }
	    else {
	    	theta += Math.PI * 2; 	
	    }
	    theta = theta.toString() + "rad";
    }
    return (
        
    	<View>
    		<Text style={{color: 'teal', fontSize: 40, alignSelf: 'center'}}>theta!</Text>
	        <ImageBackground source={require('./assets/compass.png')}  style={styles.compass}>
			{
				this._subscription ? <Image source={require('./assets/needle.png')} style={{
										width: 420,
									  	height: 420,
									  	alignSelf: 'center',
									  	opacity: 0.70,
									  	padding: 1,
									  	transform: [{rotate: theta}]
									  }} /> : null
			}
	        </ImageBackground>

	        <View style={styles.buttonContainer}>
	          <TouchableOpacity onPress={this._toggle} style={styles.button}>
	            <Text>Toggle</Text>
	          </TouchableOpacity>
	          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
	            <Text>Slow</Text>
	          </TouchableOpacity>
	          <TouchableOpacity onPress={this._fast} style={styles.button}>
	            <Text>Fast</Text>
	          </TouchableOpacity>
	        </View>
	        <Text style={{alignSelf: 'center'}}>
	          theta: {theta}
	        </Text>

        </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  compass: {
  	alignSelf: 'center',
  	width: 320,
  	height: 320,
  	justifyContent: 'center'
  },
});