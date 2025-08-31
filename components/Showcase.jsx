import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Image } from 'expo-image'
import useTheme from '../hooks/usetheme'


const updates = [
        { id: '1', source: require('../assets/images/simadlead.jpg') },
        { id: '2', source: require('../assets/images/simadilab.jpg') },
        // { id: '3', source: require('../assets/images/showcase3.jpg') },
    ]

export default function ShowCase() {
    const listRef = useRef(null);
    const [index, setIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => {
                const next = prev + 1 >= updates.length ? 0 : prev + 1;
                listRef.current?.scrollToIndex({index: next, Animated: true});
                return next;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);
    
    const {colors} = useTheme();
    const styles = createStyle(colors);
  return (
    <View style={styles.showCaseContainer}>
      <FlatList
        ref={listRef}
        style={styles.listContainer}
        data={updates}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
            <TouchableOpacity style={styles.showCaseItem}>
                <Image source={item.source} style={styles.showcaseImg}/>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}

const createStyle = (colors) => {
    const styles = StyleSheet.create({
        
        showCaseContainer:{
            paddingHorizontal: 7,
            marginVertical: 10,
            
        },
        title:{
            marginLeft: 15,
            fontSize: 18,
            color: colors.text
        },
        showCaseItem:{
            marginRight: 10,
            marginTop: 7,
            
        },
        showcaseImg:{
            width: 270,
            height: 170,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: colors.border
            
        }
    });
    return styles;
}