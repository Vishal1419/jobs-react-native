import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';

import { fetchJobs } from '../actions';

class MapScreen extends Component {
    static navigationOptions = {
        title: 'Map',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />;
        }
    }

    state = {
        mapLoaded: false,
        region: {
            longitude: -122,
            latitude: 37,
            longitudeDelta: 0.04,
            latitudeDelta: 0.09
        }
    }

    onRegionChangeComplete = (region) => {
        this.setState({ region });
    }

    onSearchPress = () => {
        this.props.fetchJobs(this.state.region, () => {
            this.props.navigation.navigate('deck');
        });
    }

    componentDidMount() {
        this.setState({ mapLoaded: true });
    }

    render() {
        if (!this.state.mapLoaded) {
            return (
                <View style={{ flex: 1, justifyContent: 'center' }} >
                    <ActivityIndicator size="large" />
                </View>
            );
        }

        return (
            <View style={{ flex: 1 }} >
                <MapView style={{ flex: 1 }} region={this.state.region} 
                         onRegionChangeComplete={this.onRegionChangeComplete} />
                <View style={styles.searchButtonContainerStyle} >
                    <Button large backgroundColor="#009688" icon={{ name: 'search' }}
                            title="Search This Area" onPress={this.onSearchPress} />
                </View>
            </View>
        );
    }
}

const styles = {
    searchButtonContainerStyle: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0
    }
};


export default connect(null, { fetchJobs })(MapScreen);
