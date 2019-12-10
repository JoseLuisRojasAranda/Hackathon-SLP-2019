import React from 'react';
import {
  Dimensions, StyleSheet, ScrollView, Alert, Platform, TouchableOpacity, Linking
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// galio components
import {
  Text, Block, Button, Card, NavBar, Input, Icon
} from 'galio-framework';
import theme from '../theme';

const { width } = Dimensions.get('screen');

class Settings extends React.Component {
  render() {
    const { navigation } = this.props;
    return (
          <Block>
       <NavBar
          fix
          title="Configuración"
          //onLeftPress={() => navigation.openDrawer()}
          style={Platform.OS === 'android' ? { marginTop: theme.SIZES.BASE } : null}
        />

            <NavBar
              title="Conectar"
              titleStyle={{ alignSelf: 'flex-start' }}
              onLeftPress={() => Alert.alert('Menu')}
              rightStyle={{ flexDirection: 'row' }}
              leftStyle={{ flex: 0.4 }}
              style={{ width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
            />

            <NavBar
              title="Terms of Services"
              leftStyle={{ flex: 0.4 }}
              onLeftPress={() => Alert.alert('Back')}
              titleStyle={{ alignSelf: 'flex-start' }}
              style={{ width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
              right={[
                <Button
                  key="right-location"
                  onlyIcon
                  icon="map-pin"
                  iconFamily="font-awesome"
                  color="transparent"
                  iconColor={theme.COLORS.MUTED}
                  iconSize={theme.SIZES.BASE * 1.0625}
                  onPress={() => Alert.alert('Like!')}
                  style={{ marginRight: theme.SIZES.BASE }}
                />,
                <Button
                  key="right-search"
                  onlyIcon
                  icon="search"
                  color="transparent"
                  iconFamily="font-awesome"
                  iconColor={theme.COLORS.MUTED}
                  iconSize={theme.SIZES.BASE * 1.0625}
                  onPress={() => Alert.alert('Search')}
                />,
              ]}
            />

            <NavBar
              title="Discover"
              style={{ backgroundColor: theme.COLORS.THEME, width, marginHorizontal: -(theme.SIZES.BASE - 2) }}
              titleStyle={{ color: theme.COLORS.WHITE }}
              rightStyle={{ alignSelf: 'flex-end' }}
              leftIconColor={theme.COLORS.WHITE}
              onLeftPress={() => Alert.alert('Menu')}
              right={(
                <Button
                  onlyIcon
                  color="transparent"
                  icon="shopping-cart"
                  iconFamily="font-awesome"
                  iconColor={theme.COLORS.WHITE}
                  iconSize={theme.SIZES.BASE * 1.0625}
                  onPress={() => Alert.alert('Search')}
                />
              )}
            />
        </Block>    );
  }
}

export default Settings;
