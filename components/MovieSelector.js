import * as React from 'react';
import {Text, View, TextInput, SafeAreaView, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity} from "react-native";

class MovieSelector extends React.Component {
    static navigationOptions = {
        title: 'Movie Search',
        headerTitleStyle: {
            textAlign:"center",
            flex:1
        }
    };
    constructor(props){
        super(props);
        this.state={text: '',myArr: []};
    }

    travelData = async (result) => {
        let size;
        let myArr = [], titleArr=[];
        const initialResponse = await fetch(`http://www.omdbapi.com/?s=${result}&apikey=4f367a3a&`);
        const initialResults = await initialResponse.json();
        size = Math.ceil(Number(initialResults["totalResults"])/10);

        //Movie limiited to 100 per entry to limit lag
        for(let i=1; i<=size && i<=10 ; i++){
            try{
                const response = await fetch(`http://www.omdbapi.com/?s=${result}&page=${i}&apikey=4f367a3a&`);
                const results = await response.json();
                for(let j=0; j<results.Search.length; j++){
                    if(results.Search[j].Type==="movie" && !titleArr.includes(results.Search[j].Title)){
                        //This title array is not super optimised but only way found since all movies appearing twice are
                        //duplicates in the API as far as I could notice
                        titleArr.push(results.Search[j].Title);
                        myArr.push(results.Search[j]);
                    }
                }
            }catch (e) {
                return null;
            }
        }
        //Removing eventual duplicates
        this.setState({text: result, myArr: myArr,});
    };

    renderFlatList = () => {
        return(
            <SafeAreaView>
                <FlatList
                    data={this.state.myArr}
                    renderItem={({ item }) =>
                        <TouchableOpacity style={styles.movieList}
                              onPress={() => this.props.navigation.navigate('Details', {
                                  imageUri: item.Poster,
                                  movieTitle: item.Title,
                                  movieYear: item.Year
                              })}
                        >
                            <View>
                                <Image style={styles.movieListImage}
                                         source={{uri: item.Poster}}/>
                            </View>
                            <View>
                                <Text style={styles.movieTitleText}>{item.Title}</Text>
                                <Text style={{fontSize: 13}}>{`${item.Year} (${item.Type})`}</Text>
                            </View>
                        </TouchableOpacity>}
                    keyExtractor={item => item.Title+item.imdbID}
                />
            </SafeAreaView>
        );
    };

    render() {
        return (
            <ScrollView style={{ flex: 1, }}>
                <TextInput
                    placeholder={"Enter movie title"}
                    style={{textAlign: 'center', height: 40, borderColor: 'gray', borderWidth: 1, alignSelf: 'stretch', marginHorizontal: 5}}
                    onChangeText={text => this.travelData(text)}
                    // onChangeText={text => text.length>=3 ? this.travelData(text): this.setState({text:''})}
                />
                {/*Trick to get the list updated on every new keyboard interaction*/}
                {this.state.text.length>=3  ? this.renderFlatList(): null}
                {this.state.myArr.length===0 || this.state.text.length < 3?<Text>No results</Text> : null}
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
   movieListImage: {
       marginVertical: 5,
       marginRight: 15,
       width:50,
       height:50
   },
    movieTitleText: {
        fontWeight: 'bold',
        flexShrink: 1,
        alignItems: 'center',
        paddingTop: 7,
    },
    movieList:{
      display: 'flex',
      flexDirection:'row',
    },
});
export default MovieSelector;
