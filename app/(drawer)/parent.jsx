import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../components/Headrer'
import { useNavigation } from '@react-navigation/native';

const parent = () => {
  const navigationTab = useNavigation();
  return (
    <View>
      <Header
        title="Parent"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
    </View>
  )
}

export default parent

const styles = StyleSheet.create({})