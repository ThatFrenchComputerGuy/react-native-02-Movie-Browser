import * as React from 'react';
import {Text, View} from "react-native";

export const returnRatings = (arr) =>{
    const length = arr.length;
    let view;
    if(length===1){
        view =
            <View>
                <Text>
                    <Text style={{fontWeight: 'bold'}}>Internet Movie Database </Text>
                    <Text>{`(${arr[0].Value}):`}</Text>
                </Text>
                <View style={{height: 20, width: String(Number(arr[0].Value.substr(0,3))*10 + '%'), backgroundColor: 'blue'}}/>
            </View>
    }
    if(length===2){
        view =
            <View>
                <View>
                    <Text>
                        <Text style={{fontWeight: 'bold'}}>Internet Movie Database </Text>
                        <Text>{`(${arr[0].Value}):`}</Text>
                    </Text>
                    <View style={{height: 20, width: String(Number(arr[0].Value.substr(0,3))*10 + '%'), backgroundColor: 'blue'}}/>
                </View>
                <View>
                    <Text style={{marginTop: 7}}>
                        <Text style={{fontWeight: 'bold'}}>Rotten Tomatoes </Text>
                        <Text>{`(${arr[1].Value}):`}</Text>
                    </Text>
                    <View style={{height: 20, width: arr[1].Value , backgroundColor: 'blue', marginBottom: 7}}/>
                </View>
            </View>
    }
    if(length===3){
        view =
            <View>
                <View>
                    <Text>
                        <Text style={{fontWeight: 'bold'}}>Internet Movie Database </Text>
                        <Text>{`(${arr[0].Value}):`}</Text>
                    </Text>
                    <View style={{height: 20, width: String(Number(arr[0].Value.substr(0,3))*10 + '%'), backgroundColor: 'blue'}}/>
                </View>
                <View>
                    <Text style={{marginTop: 7}}>
                        <Text style={{fontWeight: 'bold'}}>Rotten Tomatoes </Text>
                        <Text>{`(${arr[1].Value}):`}</Text>
                    </Text>
                    <View style={{height: 20, width: arr[1].Value , backgroundColor: 'blue', marginBottom: 7}}/>
                </View>
                <View>
                    <Text style={{marginTop: 7}}>
                        <Text style={{fontWeight: 'bold'}}>Metacritic </Text>
                        <Text>{`(${arr[2].Value}):`}</Text>
                    </Text>
                    <View style={{height: 20, width: arr[2].Value.substr(0,2) + '%' , backgroundColor: 'blue'}}/>
                </View>
            </View>
    }
    return view;
}
