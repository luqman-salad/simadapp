import { Ionicons } from '@expo/vector-icons'; // Assuming you have @expo/vector-icons installed
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useTheme from "../hooks/usetheme";


// <Ionicons name="chevron-back" size={24} color={colors.text} />
// <Ionicons name="notifications-outline" size={24} color={colors.text} />
export function Header({
    title,
    showLeftIcon = false,
    showNotifiction = false,
    onLeftIconPress,
    leftIconName,
    onNotificationPress,
    NotificationItemCount = 0,
}) {
    const { colors } = useTheme();
    const styles = createStyle(colors);
    const insets = useSafeAreaInsets();

    return (
        <View style={[
            styles.container,
            {
                backgroundColor: colors.bg,
                // paddingTop: insets.top,
            }
        ]}>
            <View style={styles.content}>
                <View style={styles.leftSection}>
                    {showLeftIcon ? (
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: colors.surface, borderWidth: 0.2, borderColor: colors.primary }]}
                            onPress={onLeftIconPress}
                        >
                            <Ionicons name={leftIconName} size={24} color={colors.text} />
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.iconButton} />
                    )}
                </View>

                <View style={styles.centerSection}>
                    <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
                </View>

                <View style={styles.rightSection}>
                    {showNotifiction ? (
                        <TouchableOpacity
                            style={[styles.iconButton, { backgroundColor: colors.surface, borderWidth: 0.2, borderColor: colors.primary }]}
                            onPress={onNotificationPress}
                        >
                            <Ionicons name="notifications-outline" size={24} color={colors.text} />
                            {NotificationItemCount > 0 && (
                                <View style={[
                                    styles.badge,
                                    { backgroundColor: colors.error }
                                ]}>
                                    <Text style={[styles.badgeText, { color: colors.primary }]}>
                                        {NotificationItemCount > 99 ? '99+' : NotificationItemCount.toString()}
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.iconButton} />
                    )}
                </View>
            </View>
        </View>
    );
}

const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // elevation: 2,
        borderBottomWidth: 1,
        borderBottomColor: colors.border
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 56,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    centerSection: {
        flex: 2,
        alignItems: 'center',
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    badge: {
        position: 'absolute',
        top: -4,
        right: -4,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 4,
    },
    badgeText: {
        fontSize: 12,
        fontWeight: '600',
    },
});
}