import { View, Text } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import useTheme from '@/hooks/usetheme';

export default function SafeScreen({children}) {
    const insets = useSafeAreaInsets();
    const {colors} = useTheme();
  return (
    <View style={{flex: 1, paddingTop: insets.top, backgroundColor: colors.bg}}>
      {children}
    </View>
  )
}