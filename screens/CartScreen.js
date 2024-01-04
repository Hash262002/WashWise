import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { cleanCart, decrementQuantity, incrementQuantity } from '../CartReducer';
import { decrementQty, incrementQty } from '../ProductReducer';
import { useNavigation, useRoute } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const CartScreen = () => {
    const cart=useSelector((state)=> state.cart.cart);
    const route=useRoute();
    const total=cart.map((item) => item.quantity*item.price).reduce((curr,prev)=>curr+prev,0);
    const dispatch=useDispatch();
    const navigation=useNavigation();
    const userUid=auth.currentUser.uid;
    const placeOrder= async()=>{
        navigation.navigate("Order");
    dispatch(cleanCart());
    await setDoc(
      doc(db, "users", `${userUid}`),
      {
        orders: { ...cart },
        pickUpDetails: route.params,
      },
      {
        merge: true,
      }
    );
    }
   
    return (
        <>
        <ScrollView style={{marginTop:36,marginLeft:5,marginRight:5}}>
            {total===0 ? 
            (
                <View style={{alignItems:"center"}}>
                    <Text style={{fontSize:20,fontWeight:500}}>Your Cart is Empty!!</Text>
                </View>
            )
            :
            (
                <View>
                    <Text style={{fontSize:17,fontWeight:500}}>Cart Details</Text>
                    {
                        cart.map((item)=>(
                            <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",backgroundColor:"#e6e6e6",margin:5,borderRadius:5}}>
                                <Text style={{fontWeight:500}}>{item.name}</Text>
                                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10}}>
                                    <Pressable onPress={()=>{
                                        dispatch(decrementQuantity(item)); // cart
                                        dispatch(decrementQty(item)); // product
                                    }} style={{paddingHorizontal:10,paddingVertical:2,borderRadius:20,backgroundColor:"black",marginRight:10}}>
                                        <Text style={{color:"white"}}>-</Text>
                                    </Pressable>
                                    <Text style={{fontWeight:500}}>{item.quantity}</Text>
                                    <Pressable onPress={()=>{
                                        dispatch(incrementQuantity(item)); // cart
                                        dispatch(incrementQty(item)); //product
                                    }} style={{paddingHorizontal:8,paddingVertical:2,borderRadius:20,backgroundColor:"black",marginLeft:10}}>
                                        <Text style={{color:"white"}}>+</Text>
                                    </Pressable>
                                </View>
                                <Text style={{fontWeight:500}}>Rs.{item.quantity*item.price}</Text>
                        
                            </View>
                        ))
                    }
                </View>
            )
            }
            <View style={{ marginHorizontal: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 30 }}>
                Billing Details
              </Text>
              <View
                style={{
                  backgroundColor: "white",
                  borderRadius: 7,
                  padding: 10,
                  marginTop: 15,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Item Total
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "400" }}>
                    ₹{total}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "400", color: "gray" }}
                  >
                    Delivery Fee
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "black",
                    }}
                  >
                    FREE
                  </Text>
                </View>

                

                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Date
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "black",
                    }}
                  >
                    {(JSON.stringify(route.params.pickUpDate)).slice(1,11)}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    No Of Days
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "black",
                    }}
                  >
                    {route.params.no_Of_days}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 10,
                  }}
                >
                  <Text
                    style={{ fontSize: 18, fontWeight: "500", color: "gray" }}
                  >
                    selected Pick Up Time
                  </Text>

                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "400",
                      color: "black",
                    }}
                  >
                    {route.params.selectedTime}
                  </Text>
                </View>
                <View
                  style={{
                    borderColor: "gray",
                    height: 1,
                    borderWidth: 0.5,
                    marginTop: 10,
                  }}
                />

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: 8,
                  }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    To Pay
                  </Text>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {total }
                  </Text>
                </View>
              </View>
            </View>
        </ScrollView>
        {total === 0 ? null : (
        <Pressable
          style={{
            backgroundColor: "#e6e6e6",
            marginTop: "auto",
            padding: 10,
            marginBottom: 40,
            margin: 15,
            borderRadius: 7,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ fontSize: 13, fontWeight: "600", color: "black" }}>
              {cart.length} items | Rs.{total}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "400",
                color: "black",
                marginVertical: 6,
              }}
            >
              extra charges might apply
            </Text>
          </View>

          <Pressable onPress={placeOrder} style={{backgroundColor:"black",padding:8,borderRadius:15}}>
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
              Place Order
            </Text>
          </Pressable>
        </Pressable>
      )}
        </>
    )
}

export default CartScreen

const styles = StyleSheet.create({})