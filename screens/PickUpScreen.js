import { StyleSheet, Text, View , ScrollView, Pressable, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import HorizontalDatepicker from '@awrminkhodaei/react-native-horizontal-datepicker';
import { useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';


const PickUpScreen = () => {
    const [selectedDate,setSelectedDate]=useState("");
    const [selectedTime,setSelectedTime]=useState("");
    const [delivery,setDelivery]=useState("");
    const [changeAddress,setChangeAddress]=useState(false);
    const route=useRoute();
    const [address,setAddress]=useState(route.params.location);
    const deliveryTime = [
        {
          id: "0",
          name: "2-3 Days",
        },
        {
          id: "1",
          name: "3-4 Days",
        },
        {
          id: "2",
          name: "4-5 Days",
        },
        {
          id: "3",
          name: "5-6 Days",
        },
        {
          id: "4",
          name: "Tommorrow",
        },
      ];
    
      const times = [
        {
          id: "0",
          time: "11:00 PM",
        },
        {
          id: "1",
          time: "12:00 PM",
        },
        {
          id: "2",
          time: "1:00 PM",
        },
        {
          id: "2",
          time: "2:00 PM",
        },
        {
          id: "4",
          time: "3:00 PM",
        },
        {
          id: "5",
          time: "4:00 PM",
        },
      ];
        const cart=useSelector((state)=> state.cart.cart);
        const total=cart.map((item) => item.quantity*item.price).reduce((curr,prev)=>curr+prev,0);
        const navigation=useNavigation();
        const proceedToCart=()=>{
            if(!selectedDate || !selectedTime || !delivery){
                Alert.alert(
                    "Empty or invalid",
                    "Please select all the fields",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
            }
            if(selectedDate && selectedTime && delivery){
                navigation.navigate("Cart",{
                    pickUpDate:selectedDate,
                    selectedTime:selectedTime,
                    no_Of_days:delivery,
                    delivery_address:address
                });
            }
        }
    return (
        <>
        <View style={{justifyContent:"space-between",marginTop:36,marginLeft:10,marginRight:10}}>
            <Text style={{fontSize:15,fontWeight:500}}>Change PIckup Address?</Text>
            <View style={{justifyContent:"space-between",marginTop:10,flexDirection:"row"}}>
                
                <Pressable onPress={()=>setChangeAddress(true)} style={{marginLeft:80,backgroundColor:"black",paddingHorizontal:15,paddingVertical:8,borderRadius:10}}>
                    <Text style={{fontWeight:500,color:"white"}}>Yes</Text>
                </Pressable>
                <Pressable onPress={()=>setChangeAddress(false)} style={{marginRight:80,backgroundColor:"black",paddingHorizontal:15,paddingVertical:8,borderRadius:10}}>
                    <Text style={{fontWeight:500,color:"white"}}>No</Text>
                </Pressable>
            </View>
        </View>
        {changeAddress===false ? 
            <View style={{margin:10}}>
                <Text>(Your PickUp address is your default location)</Text>
            </View> 
            : 
            <View style={{marginLeft:10,marginRight:10}}>
                <Text>Enter Your Pickup Address</Text>
                <TextInput 
                    placeholder='Enter pickup address'
                    value={address}
                    onChangeText={(text)=>setAddress(text)}
                    style={{
                        
                        borderColor: "gray",
                        borderWidth: 0.7,
                        paddingBottom: 50,
                        borderRadius: 9,
                        margin: 10,
                        
                    }}
                />
            </View>
        }
        <View style={{marginTop:10, marginLeft:10,marginRight:10}}>
            
            <Text style={{fontWeight:500}}>PickUp date</Text>
            <HorizontalDatepicker
                mode="gregorian"
                startDate={new Date('2024-01-1')}
                endDate={new Date('2024-01-31')}
                initialSelectedDate={new Date('2020-08-22')}
                onSelectedDateChange={(date) => setSelectedDate(date)}
                selectedItemWidth={170}
                unselectedItemWidth={38}
                itemHeight={38}
                itemRadius={10}
                selectedItemTextStyle={styles.selectedItemTextStyle}
                unselectedItemTextStyle={styles.selectedItemTextStyle}
                selectedItemBackgroundColor="#222831"
                unselectedItemBackgroundColor="#ececec"
                flatListContainerStyle={styles.flatListContainerStyle}
            />
            <Text style={{fontWeight:500}}>Select Time</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
                {times.map((item,index)=>(
                    <Pressable onPress={()=>setSelectedTime(item.time)} 
                        style={
                            selectedTime.includes(item.time) ? {margin:10,padding:10,borderRadius:10,borderColor:"red",borderWidth:0.7}:{margin:10,padding:10,borderRadius:10,borderColor:"black",borderWidth:0.7}
                        }
                    >
                        <Text>{item.time}</Text>
                    </Pressable>
                ))}
            </ScrollView>
            <Text style={{fontWeight:500}}>Select Date</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{}}>
                {deliveryTime.map((item,index)=>(
                    <Pressable onPress={()=>setDelivery(item.name)} 
                        style={
                            delivery.includes(item.name) ? {margin:10,padding:10,borderRadius:10,borderColor:"red",borderWidth:0.7}:{margin:10,padding:10,borderRadius:10,borderColor:"black",borderWidth:0.7}
                        }
                    >
                        <Text>{item.name}</Text>
                    </Pressable>
                ))}
            </ScrollView>
        </View>
        {total===0 ?
          null :
          
          <Pressable style={{margin:10,borderColor:"#e6e6e6",backgroundColor:"#e6e6e6",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10,borderRadius:15,marginTop:"auto"}}>
            <View>
              <Text style={{fontSize:12, fontWeight:600}}>{cart.length} Items | Rs.{total}</Text>
              <Text style={{fontSize:12, fontWeight:600}}>Extra charges might apply</Text>
            </View>
            <Pressable onPress={proceedToCart} style={{backgroundColor:"black",padding:10,borderRadius:10}}>
              <Text style={{color:"white"}}>Proceed to Cart</Text>
            </Pressable>
          </Pressable>
          
         
        }
        </>

    )
}

export default PickUpScreen

const styles = StyleSheet.create({})