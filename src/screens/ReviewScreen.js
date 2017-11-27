import React, { Component } from 'react';
import { Platform, View, Text, ScrollView, Linking } from 'react-native';
import { MapView } from 'expo';
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';

class ReviewScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { navigate } = navigation;
        return {
            title: 'Review Jobs',
            tabBarIcon: ({ tintColor }) => {
                return <Icon name="favorite" size={30} color={tintColor} />;
            },
            headerRight: (
                <Button title="Settings" onPress={() => navigate('settings')}
                        backgroundColor="rgba(0,0,0,0)" color="rgba(0, 122, 255, 1)" />
            ),
            style: {
                marginTop: Platform.OS === 'android' ? 24 : 0
            }
        };
    }

    render() {
        return (
            <ScrollView>
                {this.renderLikedJobs()}
            </ScrollView>
        );
    }

    renderLikedJobs() {
        return this.props.likedJobs.map(job => {
            const { company, formattedRelativeTime, url, longitude, latitude, jobtitle, jobkey } = job;
            const initialRegion = {
                longitude,
                latitude,
                longitudeDelta: 0.02,
                latitudeDelta: 0.045
            };

            return (
                <Card key={jobkey} title={jobtitle}>
                    <View style={{ height: 200 }}>
                        <MapView style={{ flex: 1 }} cacheEnabled={Platform.OS === 'android'} scrollEnabled={false} 
                                 initialRegion={initialRegion} />
                        <View style={styles.detailWrapper}>
                            <Text style={styles.italics}>{company}</Text>
                            <Text style={styles.italics}>{formattedRelativeTime}</Text>
                        </View>
                        <Button title="Apply Now!" backgroundColor="#03A9F4" onPress={() => Linking.openURL(url)} />
                    </View>
                </Card>
            );
        });
    }
}

const styles = {
    detailWrapper: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    italics: {
        fontStyle: 'italic'
    }
};

const mapStateToProps = (state) => {
    return { likedJobs: state.likedJobs };
};

export default connect(mapStateToProps)(ReviewScreen);
