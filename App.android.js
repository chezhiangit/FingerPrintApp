import React, { Component, PropTypes } from 'react';
import {
  Alert,
  Image,
  Text,
  TouchableOpacity,
  View,
  ViewPropTypes
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';
 
// import ShakingText from './ShakingText.component';
import styles from './FingerprintPopup.component.styles';
 
class FingerprintPopup extends Component {
 
  constructor(props) {
    super(props);
    this.state = { errorMessage: undefined };
  }
 
  componentDidMount() {
    FingerprintScanner
    .isSensorAvailable()
    .then(()=>{
        FingerprintScanner
        .authenticate({ onAttempt: this.handleAuthenticationAttempted })
        .then(() => {
          // this.props.handlePopupDismissed();
          Alert.alert('Fingerprint Authentication - 1', 'Authenticated successfully');
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
          // this.description.shake();
          Alert.alert('Fingerprint Authentication - 2', errorMessage);
        });
    })
    .catch((error) => {
        this.setState({ errorMessage: error.message });
        // this.description.shake();
        Alert.alert('Fingerprint Authentication - 3', this.state.errorMessage);
      });
  }
 
  componentWillUnmount() {
    FingerprintScanner.release();
  }
 
  handleAuthenticationAttempted = (error) => {
    this.setState({ errorMessage: error.message });
    // this.description.shake();
    Alert.alert('Fingerprint Authentication Attempt', this.state.errorMessage);
  };
 
  render() {
    const { errorMessage } = this.state;
    const { style, handlePopupDismissed } = this.props;
 
    return (
      <View style={styles.container}>
        <View style={[styles.contentContainer]}>
 
          <Image
            style={styles.logo}
            source={require('./assets/finger_print.png')}
          />
 
          <Text style={styles.heading}>
            Fingerprint{'\n'}Authentication
          </Text>
          {/* <ShakingText
            ref={(instance) => { this.description = instance; }}
            style={styles.description(!!errorMessage)}>
            {errorMessage || 'Scan your fingerprint on the\ndevice scanner to continue'}
          </ShakingText> */}
 
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={handlePopupDismissed}
          >
            <Text style={styles.buttonText}>
              BACK TO MAIN
            </Text>
          </TouchableOpacity>
 
        </View>
      </View>
    );
  }
}
 
FingerprintPopup.propTypes = {
  style: ViewPropTypes.style,
  // handlePopupDismissed: PropTypes.func.isRequired,
};
 
export default FingerprintPopup;