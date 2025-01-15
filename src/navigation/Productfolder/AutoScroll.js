import { useRef, useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from "react-native";
import StyledText from "../../componets/Texts/StyledText";
import { FlatList } from "react-native-gesture-handler";
import { ScreenWidth } from "../../core/constant";
import { machinesData } from "../../data";

const AutoScrollFlatList = ({ data }) => {
    const flatListRef = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() =>{
        let interval = setInterval(()=> {
            if(activeIndex === machinesData.length-1){
                flatListRef.current.scrollToIndex({
                    index: 0,
                    animation: true,
                });
            }else{
                flatListRef.current.scrollToIndex({
                    index: activeIndex +1,
                    animation: true,
                });
    
            }
        }, 2000);
        
        return () => clearInterval(interval);
        
    })

  const renderItem = ({ item, index }) => {
    return(
        <View
            style={{
            borderRadius: 20, // Add a border radius to the container
            overflow: "hidden", // Ensures the border radius is respected
            }}
        >
        <Image source={item.image}
            style={{
                height: 250, 
                width: ScreenWidth,
                resizeMode: "cover", 
            }}/>
      </View>
    );
  };


  const renderIndicators = () =>{
    return machinesData.map((dot, index) =>{
        if(activeIndex === index){
            return (
                <View key={index}
                    style={{
                    backgroundColor: "green",
                    height: 10,
                    width: 10,
                    borderRadius:5,
                    marginHorizontal: 6,
                }}>

                </View>
            );
        }else{
            return (
                <View 
                    key={index}
                    style={{
                    backgroundColor: "red",
                    height: 10,
                    width: 10,
                    borderRadius:5,
                    marginHorizontal: 6,
                }}>
                </View>
            ); 
        }
        
    });
  };

  const handleScroll = (event) => {
    const scrollPositon = event.nativeEvent.contentOffset.x;
    const index = scrollPositon / ScreenWidth;
    setActiveIndex(index);

  };

  const getItemLayout = (data, index) => ({
    length: ScreenWidth,
    offset: ScreenWidth * index,
    index: index,
  })
  
  return (
    <View>
      <FlatList
        //ref={flatListRef}
        data={data}
        ref={flatListRef}
        getItemLayout={getItemLayout}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        contentContainerStyle={{
            borderRadius: 20,
          }}
      />
      <View style={{
        flexDirection: "row", 
        justifyContent: "center",
        marginTop: 30,
        }}>
      {renderIndicators()}
      </View>
      
    </View>
  );
};

export default AutoScrollFlatList;