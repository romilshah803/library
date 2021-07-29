import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet}from 'react-native';
import * as Permissions from 'expo-permissions'
import{BarCodeScanner}from 'expo-barcode-scanner'
export default class Transactions extends React.Component{
  constructor(){
    super();
    this.state={
      hasPermission:null,
      scanned:false,
      scanneddata:'',
      buttonstate:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasPermission:status==="granted",
      buttonstate:'clicked',
      scanned:false
    })
  }
  handlebarcodescan=async({type,data})=>{
    this.setState({
      scanneddata:data,buttonstate:'normal',scanned:true
    })
  }
  render(){
    const hasPermission=this.state.hasPermission;
    const scanned=this.state.scanned;
    const buttonstate=this.state.buttonstate;
    if(buttonstate==="clicked" && hasPermission){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handlebarcodescan}
        style={StyleSheet.absoluteFillObject}
        />
      )
    }else{
      return(
        <View style={styles.container}>
        <Text style={styles.dt} >{hasPermission==true?this.state.scanneddata:"request camera permissions"} </Text>
        <TouchableOpacity style={styles.scannedButton}
        onPress={this.getCameraPermissions}>
          <Text style={styles.buttonText}>scan qr code</Text>
        </TouchableOpacity>
        </View>

      )
    }
    
  }
}
const styles=StyleSheet.create({
  container:{
    flex:1,justifyContent:'center',alignItems:"center"
  },
  dt:{
    fontSize:15,
    textDecorationLine:'underline',
    
  },
  buttonText:{
    fontSize:20
  },
  scannedButton:{
    backgroundColor:'#2196F3',
    padding:10,
    margin:10

  }
})