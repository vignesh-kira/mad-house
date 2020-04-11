import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert,Text, View } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
import ArButton from "../components/Button";
const { width } = Dimensions.get('screen');

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    this.setGeolocationCoordinates();

  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // if(this.state.latitude !== prevState.latitude || this.state.longitude !== prevState.longitude){
    //   this.setGeolocationCoordinates();
    // }
  }

  setGeolocationCoordinates = () => navigator.geolocation.getCurrentPosition(
      position => {
        //const location = JSON.stringify(position);
        //Alert.alert(location);
        this.setState({ latitude: position.coords.latitude, longitude: position.coords.longitude });
      },

      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );

  renderArticles = () => {
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
          <Block flex>
            <Card item={articles[0]} horizontal  />
          </Block>
        </ScrollView>
    )
  };

  render() {

    return (
        <>
          <View>
            <Text>
              Latitude : {this.state.latitude}
            </Text>
            <Text>
              Longitude : {this.state.longitude}
            </Text>
          </View>
          <Block flex center style={styles.home}>
            {this.renderArticles()}
          </Block>
        </>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
