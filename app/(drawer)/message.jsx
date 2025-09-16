import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Header } from '../../components/Headrer';
import ReactorsMessage from "../../components/RectorsMessage";
import useTheme from '../../hooks/usetheme';

const message = () => {
  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();

  return (
    <View
      style={styles.container}
    >
      <Header
        title="Message"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      <ReactorsMessage />
    </View>
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