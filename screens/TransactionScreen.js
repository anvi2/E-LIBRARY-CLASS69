import React from 'react';
import{View , Text , StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            domState:"normal",
            hasCameraPermissions:false,
            scanned:false,
            scannedData:""
        }
    }
    getCameraPermissions=async (state)=>{
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions:status==="granted",
            domState:state,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        this.setState({
            domState:"normal",
            scanned:true,
            scannedData:data
        })
    }
    render(){
        const {domState,scanned,hasCameraPermissions,scannedData} = this.state
        if(domState==="scanner"){
            return <BarCodeScanner style ={StyleSheet.absoluteFillObject} onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}/>

        }
        return(
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={()=>this.getCameraPermissions("scanner")}>
                    <Text style = {styles.text}>
                        SCAN QR CODE
                    </Text>

                </TouchableOpacity>
                <Text>
                    {hasCameraPermissions?scannedData:"REQUEST FOR CAMERA PERMISSIONS"}
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#5653d4"
    },
    text:{
        color:"white",
        fontSize:24
    },
    button:{ 
        width:150, 
        height:55,
        justifyContent:"center",
        alignItems:"center", 
        backgroundColor:"#F48D20",
        borderRadius:15 }
})