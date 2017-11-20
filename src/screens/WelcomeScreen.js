import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Job App', backgroundColor: '#886FC6' },
    { text: 'Use this app to get job', backgroundColor: '#6748B1' },
    { text: 'Set your location, then swipe away', backgroundColor: '#460785' }
];

class WelcomeScreen extends Component {
    state = { token: null };

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    async componentWillMount() {
        const token = await AsyncStorage.getItem('fb_token');
        if (token) {
            this.setState({ token });
            this.props.navigation.navigate('map');
        } else {
            this.setState({ token: false });
        }
    }

    render() {
        if (this.state.token === null) {
            return <AppLoading />;
        }

        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
