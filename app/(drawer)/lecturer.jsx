import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Header } from '../../components/Headrer'
import { useNavigation } from '@react-navigation/native';

const Lecturer = () => {
  const navigationTab = useNavigation();
  return (
    <View>
      <Header
        title="Lecturer"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
    </View>
  )
}

export default Lecturer

const styles = StyleSheet.create({})