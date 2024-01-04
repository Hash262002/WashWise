import { StyleSheet, Text, View ,SafeAreaView, Alert, Pressable, TextInput, ScrollView, Image} from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from "expo-location"
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Carousel from '../components/Carousel';
import Services from '../components/Services';
import DressItem from '../components/DressItem';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../ProductReducer';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
const HomeScreen = () => {
  const[displayCurrentAddress,setdisplayCurrentAddress]=useState("We are loading your location");
  const[locationServiceEnabled,setlocationServiceEnabled]=useState(false);
  const [items,setItems] = useState([]);
  const cart=useSelector((state)=> state.cart.cart);
  const total=cart.map((item) => item.quantity*item.price).reduce((curr,prev)=>curr+prev,0);
  const navigation=useNavigation();
  const services = [
    {
      id: "0",
      image: "https://cdn-icons-png.flaticon.com/128/4643/4643574.png",
      name: "shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "11",
      image: "https://cdn-icons-png.flaticon.com/128/892/892458.png",
      name: "T-shirt",
      quantity: 0,
      price: 10,
    },
    {
      id: "12",
      image: "https://cdn-icons-png.flaticon.com/128/9609/9609161.png",
      name: "dresses",
      quantity: 0,
      price: 10,
    },
    {
      id: "13",
      image: "https://cdn-icons-png.flaticon.com/128/599/599388.png",
      name: "jeans",
      quantity: 0,
      price: 10,
    },
    {
      id: "14",
      image: "https://cdn-icons-png.flaticon.com/128/9431/9431166.png",
      name: "Sweater",
      quantity: 0,
      price: 10,
    },
    {
      id: "15",
      image: "https://cdn-icons-png.flaticon.com/128/3345/3345397.png",
      name: "shorts",
      quantity: 0,
      price: 10,
    },
    {
      id: "16",
      image: "https://cdn-icons-png.flaticon.com/128/293/293241.png",
      name: "Sleeveless",
      quantity: 0,
      price: 10,
    },
  ];
  useEffect(()=>{
    checkIfLocationenabled();
    getCurrentLocation();
  },[])
  const checkIfLocationenabled=async() =>{
    let enabled= await Location.hasServicesEnabledAsync();
    if(!enabled){
      Alert.alert(
        "Location services not enabled",
        "Please enable the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }else{
      setlocationServiceEnabled(enabled);
    }

  }
  const getCurrentLocation = async() =>{
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "allow the app to use the location services",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    const { coords } = await Location.getCurrentPositionAsync();
    // console.log(coords)
    if (coords) {
      const { latitude, longitude } = coords;

      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      // console.log(response)

      for (let item of response) {
        let address = `${item.name} ${item.city} ${item.postalCode}`;
        setdisplayCurrentAddress(address);
      }
    }
  }
  const product=useSelector((state) => state.product.product);
  const dispatch=useDispatch();
  useEffect(() => {
    if (product.length > 0) return;

    const fetchProducts = async () => {
      const colRef = collection(db,"types");
      const docsSnap = await getDocs(colRef);
      docsSnap.forEach((doc) => {
        items.push(doc.data());
      });
      items?.map((service) => dispatch(getProducts(service)));
    };
    fetchProducts();
  }, []);
  
  return (
    <>
    
      
      <ScrollView style={{marginTop:50,marginRight:10}}>
        {/*Location and Profile */}
      <View style={{flexDirection:"row"}}>
        <Entypo name="location-pin" size={24} color="black"/>
        <View>
          <Text style={{fontSize:15 , fontWeight: 600}}>Home</Text>
          <Text style={{fontSize:10}}>{displayCurrentAddress}</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("Profile")} style={{ marginLeft: "auto", marginRight: 7 }}>
            <Image
              style={{ width: 40, height: 40, borderRadius: 20 }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBbRk55TAj61TKNjhYzU_oyqUqJSUBeTwupw&usqp=CAU",
              }}
            />
          </Pressable>
      </View>
      {/*Search Bar */}
      <View
          style={{
            padding: 10,
            margin: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderWidth: 0.8,
            borderColor: "#C0C0C0",
            borderRadius: 7,
          }}
        >
          <TextInput placeholder="Search for items or More" />
          <EvilIcons name="search" size={24} color="black" /> 
        </View>
        {/* Carousel of Images */}
        <Carousel/>
        {/*Services */}
        <Services/>
        {/*Products*/}
        {product.map((item,index)=>(
          <DressItem item={item} key={index}/>
        ))}

      </ScrollView>
    
        {total===0 ?
          null :
          
          <Pressable style={{margin:10,borderColor:"#e6e6e6",backgroundColor:"#e6e6e6",flexDirection:"row",alignItems:"center",justifyContent:"space-between",padding:10,borderRadius:15}}>
            <View>
              <Text style={{fontSize:12, fontWeight:600}}>{cart.length} Items | Rs.{total}</Text>
              <Text style={{fontSize:12, fontWeight:600}}>Extra charges might apply</Text>
            </View>
            <Pressable onPress={() => navigation.navigate("PickUp",{location:displayCurrentAddress})} style={{backgroundColor:"black",padding:10,borderRadius:10}}>
              <Text style={{color:"white"}}>Proceed to PickUp</Text>
            </Pressable>
          </Pressable>
          
         
        }
    </>

  )
}

export default HomeScreen;

