import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import useTheme from '../hooks/usetheme'

const CustomeDrawer = (props) => {
    const { top, bottom } = useSafeAreaInsets();
    const { colors } = useTheme();
    const styles = createStyle(colors, bottom);


    return (
        <SafeAreaView style={{ flex: 1, oundColor: colors.bg }}>
            <DrawerContentScrollView
                {...props}
                scrollEnabled={false}>
                <View style={styles.drawerHead}>
                    <Image
                        source={require("../assets/images/simadlogo.png")}
                        style={styles.logo}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            {/* <View style={styles.footer}>
        <TouchableOpacity style={styles.footerLoutbtn}>
            <Ionicons name='information-circle-outline' style={styles.logouticon}/>
            <Text style={styles.logoutxt}>Support</Text>
        </TouchableOpacity>
      </View> */}
        </SafeAreaView>
    )
}

export default CustomeDrawer;
const createStyle = (colors, bottom) => {
    const styles = StyleSheet.create({
        drawerHead: {
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            marginTop: -20,
            marginBottom: 20,
            padding: 20
        },
        logo: {
            width: 100,
            height: 100,
            alignSelf: "center"
        },
        footer: {

            borderTopColor: colors.border,
            borderTopWidth: 1,
            padding: 20,
            paddingBottom: 20 + bottom
        },
        footerLoutbtn: {
            flexDirection: "row",
        },
        logoutxt: {
            color: colors.text,
            fontSize: 16
        },
        logouticon: {
            fontSize: 22,
            color: colors.text
        }
    });
    return styles;

}