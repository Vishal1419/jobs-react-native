import React, { Component } from 'react';

import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Job App', backgroundColor: '#886FC6' },
    { text: 'Use this app to get job', backgroundColor: '#6748B1' },
    { text: 'Set your location, then swipe away', backgroundColor: '#460785' }
];

class WelcomeScreen extends Component {

    onSlidesComplete = () => {
        this.props.navigation.navigate('auth');
    }

    render() {
        return (
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
        );
    }
}

export default WelcomeScreen;
