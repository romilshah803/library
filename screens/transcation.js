import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet,Image,TextInput}from 'react-native';
import * as Permissions from 'expo-permissions'
import{BarCodeScanner}from 'expo-barcode-scanner'
export default class Transactions extends React.Component{
  constructor(){
    super();
    this.state={
      hasPermission:null,
      scanned:false,
      scannedstudentid:'',
      scannedbookid:'',
      buttonstate:'normal'
    }
  }
  getCameraPermissions=async(id)=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasPermission:status==="granted",
      buttonstate:id,
      scanned:false
    })
  }
  handlebarcodescan=async({type,data})=>{
    const {buttonstate}=this.state
    if(buttonstate=="bookid"){
      this.setState({
        scannedbookid:data,buttonstate:'normal',scanned:true
      })
    }else{
      this.setState({
        scannedstudentid:data,buttonstate:'normal',scanned:true
      })
    }
    
  }
  render(){
    const hasPermission=this.state.hasPermission;
    const scanned=this.state.scanned;
    const buttonstate=this.state.buttonstate;
    if(buttonstate!=="normal" && hasPermission){
      return(
        <BarCodeScanner
        onBarCodeScanned={scanned?undefined:this.handlebarcodescan}
        style={StyleSheet.absoluteFillObject}
        />
      )
    }else{
      return(
        <View style={styles.container}>
          <View>
            <Image source={require("../assets/booklogo.jpg")}
            style={{width:200,height:200}}
            />
            
          </View>
          <View style={styles.inputview}>
            <TextInput
            style={styles.inputbox}
            placeholder="book id"
            value={this.state.scannedbookid}
            onChangeText={(text)=>{this.setState({scannedbookid:text})}}
            >

            </TextInput>
            <TouchableOpacity onPress={()=>{this.getCameraPermissions("bookid")}} style={styles.scannedButton}
            >
             <Text>scan</Text> 
            </TouchableOpacity>
            </View>
          <View style={styles.inputview}>
            <TextInput
                        style={styles.inputbox}

            placeholder="student id"
            value={this.state.scannedstudentid}
            onChangeText={(text)=>{this.setState({scannedstudentid:text})}}
            >

            </TextInput>
            <TouchableOpacity style={styles.scannedButton}onPress={()=>{this.getCameraPermissions("studentid")}}
            >
             <Text>scan</Text> 
            </TouchableOpacity>
          </View>
        <Text style={styles.dt} >{hasPermission==true?this.state.scannedbookid:"request camera permissions"} </Text>
        <TouchableOpacity style={styles.submitbutton}
        onPress={}>
          <Text style={styles.buttonText}>submit</Text>
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
    width:50,
    borderWidth:1.5,
    borderLeftWidth:0

  },
  inputview:{
    flexDirection:'row',
    margin:20
  },
  inputbox:{
    width:200,height:40,borderWidth:1.5,borderRightWidth:0,fontSize:20
  },
  submitbutton:{
    BackgroundColor:'#66886a',
    width:80,
  }
})