import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

class Slides extends Component {

    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return (
                <Button title="Onwards!" raised onPress={this.props.onComplete} />
            );
        }
        return;
    }

    renderSlide() {
        return this.props.data.map((slide, index) => {
            return (
                <View key={slide.text} style={[styles.slideStyle, { backgroundColor: slide.backgroundColor }]}>
                    <Text style={styles.textStyle}>{slide.text}</Text>
                    {this.renderLastSlide(index)}
                </View>
            );
        });
    }

    render() {
        return (
            <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
                {this.renderSlide()}
            </ScrollView>
        );
    }
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH
    },
    textStyle: {
        fontSize: 30,
        color: '#FFFFFF',
        margin: 20
    },
    buttonStyle: {
        marginTop: 15,
        backgroundColor: '#911991'
    }
};

export default Slides;
