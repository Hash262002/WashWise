import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../CartReducer";
import { decrementQty, incrementQty } from "../ProductReducer";

const DressItem = ({item}) => {
  const dispatch=useDispatch();
  const cart=useSelector((state)=>state.cart.cart);
  const addItemToCart=()=>{
    dispatch(addToCart(item)) //cart
    dispatch(incrementQty(item)) //product
  }

  return (
    <View >
      <Pressable style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",margin:10,backgroundColor:"#e6e6e6",padding:10,borderRadius:20}}>
        <View>
            <Image style={{width :70 ,height:70}} source={{uri:item.image}}/>
        </View>
        <View>
            <Text style={{
              width: 83,
              fontSize: 17,
              fontWeight: "500",
              marginBottom: 7,
            }}>{item.name}</Text>
            <Text style={{ width: 60, color: "gray", fontSize: 15 }}>Rs.{item.price}</Text>
        </View>
        {cart.some((c) => c.id === item.id) ? (
          <Pressable
            style={{
              flexDirection: "row",
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                dispatch(decrementQuantity(item)); // cart
                dispatch(decrementQty(item)); // product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                
                backgroundColor: "black",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  
                }}
              >
                -
              </Text>
            </Pressable>

            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  color: "black",
                  paddingHorizontal: 8,
                  fontWeight: "600",
                }}
              >
                {item.quantity}
              </Text>
            </Pressable>

            <Pressable
              onPress={() => {
                dispatch(incrementQuantity(item)); // cart
                dispatch(incrementQty(item)); //product
              }}
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                borderColor: "#BEBEBE",
                backgroundColor: "black",
                justifyContent: "center",
                alignContent: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  paddingHorizontal: 6,
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                +
              </Text>
            </Pressable>
          </Pressable>
        ) : (
          <Pressable onPress={addItemToCart} style={{backgroundColor:"black",width:70,height:40,borderRadius:10,alignItems:"center",justifyContent:"center"}}>
            <Text style={{color:"white"}}>Add</Text>
          </Pressable>
        )
        }
        
      </Pressable>
    </View>
  )
}

export default DressItem

const styles = StyleSheet.create({})