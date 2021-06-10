import React, {useContext, useEffect} from 'react';
import {StyleSheet, View, Text, Image, LayoutAnimation} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {CTX} from '../tools/context';
import theme, {primaryColor} from '../theme';
import {useNavigation} from '@react-navigation/native';

const slides = [
  {
    key: 'somethun',
    title: 'Chào mừng bạn đến với CarTransplant',
    color: '#000',
    text: 'CarTransplant - Đi xe tiện chuyến.\nGiải pháp tối ưu cho bạn',
    image: require('../assets/onboarding/image1.gif'),
    backgroundColor: '#FFFFFF',
  },
  {
    key: 'somethun-dos',
    title: 'Tiết Kiệm Chi Phí!',
    color: '#000',
    text:
      'Bản chất là ứng dụng đặt xe tiện chuyến nên cả khách hàng và tài xế đều có lợi nên giá thành của Car Transplant thực sự rẻ chỉ bằng 60% dịch vụ xe con thông thường.',
    image: require('../assets/onboarding/image7.gif'),
    backgroundColor: '#FFDEDE',
  },
  {
    key: 'somethun1',
    title: 'Đặt Lịch Tiện Chuyến!',
    color: '#000',
    text:
      'Đặt trước lịch đường dài để chúng tôi có thể hỗ trợ tìm tài xế thân thiện cho bạn cùng chia sẻ cước phí tuyến đường.',
    image: require('../assets/onboarding/image8.gif'),
    backgroundColor: '#FFFFFF',
  },
];

export default function OnBoardingScreen() {
  const navigation = useNavigation();
  const {navigate} = navigation;

  const skipContext = useContext(CTX);
  const {_seen} = skipContext;

  useEffect(() => {
    LayoutAnimation.easeInEaseOut();
  });

  function _renderItem({item}) {
    return (
      <View style={[styles.slide, {backgroundColor: item.backgroundColor}]}>
        <Text style={[item.color, styles.title]}>{item.title}</Text>
        <Image style={styles.image} source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  }
  function _onDone() {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    // this.setState({showRealApp: true});
    _seen();
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <FontAwesome5
          name="chevron-right"
          color="#FFFFFF"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <FontAwesome5
          name="check-circle"
          color="#FFFFFF"
          size={24}
          style={{backgroundColor: 'transparent'}}
        />
      </View>
    );
  };
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      slides={slides}
      onDone={_onDone}
      activeDotStyle={{backgroundColor: primaryColor}}
      renderNextButton={_renderNextButton}
      renderDoneButton={_renderDoneButton}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 320,
    width: 320,
  },
  text: {
    fontSize: 16,
    color: theme.grey_dark_30,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.primaryColor,
  },
});
