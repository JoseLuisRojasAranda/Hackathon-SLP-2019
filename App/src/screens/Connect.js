import React from 'react';
import {
  Dimensions, StyleSheet, ScrollView, Alert, Platform, TouchableOpacity, Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// galio components
import {
  Text, Block, Button, Card, NavBar, Input, Icon, Switch
} from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');
var sw;

fetch('https://ef7e0e28.ngrok.io/vigia/api/get_act')
.then(response => response.json())
.then(responseJson => {
    sw = responseJson.activate;
});

class Connect extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
      <Block safe flex>
        <NavBar
          title="Conectar"

          left={(
            <TouchableOpacity onPress={() => navigation.navigate('Configuration')}>
              <Icon 
                name="chevron-left"
                family="feather"
                size={40}
                color={theme.COLORS.ICON}
              />
            </TouchableOpacity>
          )}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />
        <Text p>Activar</Text>
        <Switch 
        initialValue={sw}
        trackColor={{true: 'green', false: 'black'}}
        thumbColor={'black'}
        onChange={() => fetch('https://ef7e0e28.ngrok.io/vigia/api/set_act', {
            method: 'POST',
            body: JSON.stringify({
              activate: false,
            }),
          }) } />
        </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    justifyContent: 'flex-start',
    backgroundColor: theme.COLORS.WHITE,
  },
  button: {
    marginBottom: 20,
  },
  cards: {
    flex: 1,
    backgroundColor: theme.COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  card: {
    borderWidth: 0,
    backgroundColor: theme.COLORS.WHITE,
    width: width - theme.SIZES.BASE * 2,
    marginVertical: theme.SIZES.BASE * 0.875,
  },
  cardFooter: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: theme.SIZES.BASE / 2,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: theme.SIZES.BASE / 2,
    backgroundColor: theme.COLORS.TRANSPARENT,
  },
  cardNoRadius: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardAvatar: {
    width: theme.SIZES.BASE * 2.5,
    height: theme.SIZES.BASE * 2.5,
    borderRadius: theme.SIZES.BASE * 1.25,
  },
  cardTitle: {
    justifyContent: 'center',
    paddingLeft: theme.SIZES.BASE / 2,
  },
  cardImageContainer: {
    borderWidth: 0,
    overflow: 'hidden',
  },
  cardImageRadius: {
    borderRadius: theme.SIZES.BASE * 0.1875,
  },
  cardImage: {
    width: 'auto',
    height: theme.SIZES.BASE * 12.5,
  },
  cardRounded: {
    borderRadius: theme.SIZES.BASE * 0.5,
  },
  cardFull: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },
  cardGradient: {
    bottom: 0,
    left: 0,
    right: 0,
    height: 90,
    position: 'absolute',
    overflow: 'hidden',
    borderBottomRightRadius: theme.SIZES.BASE * 0.5,
    borderBottomLeftRadius: theme.SIZES.BASE * 0.5,
  },
});

export default Connect;
