import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReactorsMessage from "../../components/RectorsMessage"
import useTheme from '../../hooks/usetheme';

const message = () => {
    const { colors } = useTheme();
    const styles = createStyle(colors);
  return (
    <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
    >
      <ReactorsMessage/>
    </ScrollView>
  )
}

export default message

const createStyle = (colors) => {
    return StyleSheet.create({
    container: {
            flex: 1, // Keep flex: 1 on the container to fill the screen space
            backgroundColor: colors.bg,
        },
        contentContainer: {
            paddingVertical: 20, // Move padding here to apply to content
        },
});
}