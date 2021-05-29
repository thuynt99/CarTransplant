import {Container} from 'native-base';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import HeaderCustom from '../components/common/HeaderCustom';

export default class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          id: 3,
          title: 'March SoulLaComa',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment:
            'https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697',
        },
        {
          id: 2,
          title: 'John DoeLink',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
        },
        {
          id: 4,
          title: 'Finn DoRemiFaso',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 5,
          title: 'Maria More More',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 1,
          title: 'Frank Odalthh',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment:
            'https://static.toiimg.com/photo/msid-67586673/67586673.jpg?3918697',
        },
        {
          id: 6,
          title: 'Clark June Boom!',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
        {
          id: 7,
          title: 'The googler',
          text:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
          attachment: '',
        },
      ],
    };
  }

  render() {
    return (
      <Container>
        <HeaderCustom title="Thông báo" withoutBack />
        <FlatList
          style={styles.root}
          data={this.state.data}
          extraData={this.state}
          ItemSeparatorComponent={() => {
            return <View style={styles.separator} />;
          }}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={item => {
            const Notification = item.item;
            let attachment = <View />;

            let mainContentStyle;
            if (Notification.attachment) {
              mainContentStyle = styles.mainContent;
              attachment = (
                <Image
                  style={styles.attachment}
                  source={{uri: Notification.attachment}}
                />
              );
            }
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('NotificationDetailScreen', {
                    item: Notification,
                  })
                }>
                <View style={styles.container}>
                  <Image
                    source={require('../assets/logo/image.png')}
                    style={styles.avatar}
                  />
                  <View style={styles.content}>
                    <View style={mainContentStyle}>
                      <View style={styles.text}>
                        <Text style={styles.name}>{Notification.title}</Text>
                        <Text>{Notification.text}</Text>
                      </View>
                      <Text style={styles.timeAgo}>2 hours ago</Text>
                    </View>
                    {attachment}
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  img: {
    height: 50,
    width: 50,
    margin: 0,
  },
  attachment: {
    position: 'absolute',
    right: 0,
    height: 50,
    width: 50,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  name: {
    fontSize: 16,
    color: '#1E90FF',
  },
});
