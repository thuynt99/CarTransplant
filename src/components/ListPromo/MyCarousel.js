import React, {Component} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {ENTRIES_PROMO_HOME} from '../../constants/data';
import {
  responsiveScreenFontSize,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import theme from '../../theme';

const {width: screenWidth} = Dimensions.get('window');

export default class MyCarousel extends Component {
  _renderItem({item, index}, parallaxProps) {
    return (
      <View style={styles.item}>
        <ParallaxImage
          source={{uri: item.illustration}}
          containerStyle={styles.imageContainer}
          style={styles.image}
          parallaxFactor={0.1}
          {...parallaxProps}
        />
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={4}>
          {item.subtitle}
        </Text>
      </View>
    );
  }

  render() {
    console.log('test demo');
    console.log('scanner');
    let a = 'test'
    return (
      <Carousel
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={ENTRIES_PROMO_HOME}
        renderItem={this._renderItem}
        hasParallaxImages={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 100,
    backgroundColor: '#ffff',
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 1}), // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: responsiveScreenFontSize(2),
  },
  subtitle: {
    fontSize: 14,
    color: theme.grey_dark,
    textAlign: 'justify',
  },
});
