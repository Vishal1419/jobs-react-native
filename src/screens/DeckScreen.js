import React, { Component } from 'react';
import { View, Text, Platform } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

import Swipe from '../components/Swipe';
import { likeJob } from '../actions';

class DeckScreen extends Component {
    static navigationOptions = {
        title: 'Jobs',
        tabBarIcon: ({ tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />;
        }
    }

    renderCard(job) {
        const initialRegion = {
            longitude: job.longitude,
            latitude: job.latitude,
            longitudeDelta: 0.02,
            latitudeDelta: 0.045
        };

        return (
            <Card title={job.jobtitle} wrapperStyle={{ height: 450 }} >
                <View style={{ height: 300 }} >
                    <MapView scrollEnabled={false} style={{ flex: 1 }} cacheEnabled={Platform.OS === 'android'}
                             initialRegion={initialRegion} >
                    </MapView>
                </View>
                <View style={styles.detailsWrapper} >
                    <Text>{job.company}</Text>
                    <Text>{job.formattedRelativeTime}</Text>
                </View>
                <Text>
                    {job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
                </Text>
            </Card>
        );
    }
    
    renderNoMoreCards = () => {
        return (
            <Card title="No more Jobs">
                <Button title="Back To Map" icon={{ name: 'my-location' }} large
                        backgroundColor="#03A9F4" onPress={() => this.props.navigation.navigate('map')} />
            </Card>
        );
    }

    render() {
        return (
            <View style={{ marginTop: 10 }}>
                <Swipe data={this.props.jobs} renderCard={this.renderCard} renderNoMoreCards={this.renderNoMoreCards} 
                       keyProp="jobkey" onSwipeRight={job => this.props.likeJob(job)} />
            </View>
        );
    }
}

const styles = {
    detailsWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10
    }
};

const mapStateToProps = (state) => {
    return { jobs: state.jobs.results };
};

export default connect(mapStateToProps, { likeJob })(DeckScreen);
