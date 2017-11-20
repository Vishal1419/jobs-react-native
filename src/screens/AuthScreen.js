import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { facebookLogin } from '../actions';

class AuthScreen extends Component {
    onAuthComplete(props) {
        if (props.token) {
            this.props.navigation.navigate('map');
        }
    }

    componentDidMount() {
        this.props.facebookLogin();
        this.onAuthComplete(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.onAuthComplete(nextProps);
    }

    render() {
        return (
            <View />
        );
    }
}

const mapStateToProps = state => {
    return { token: state.auth.token };
};

export default connect(mapStateToProps, { facebookLogin })(AuthScreen);
