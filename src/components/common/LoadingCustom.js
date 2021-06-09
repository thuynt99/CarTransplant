import React from 'react';
import {Spinner} from 'native-base';
import {Modal} from 'react-native';
import theme from '../../theme';

export default function LoadingCustom(props) {
  return (
    <Modal
      animationType={'none'}
      transparent={true}
      visible={props.loading}
      onRequestClose={() => null}>
      <Spinner
        color={theme.primaryColor}
        style={{
          alignSelf: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      />
    </Modal>
  );
}
