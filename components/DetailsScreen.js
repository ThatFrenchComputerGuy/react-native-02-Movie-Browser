import * as React from 'react';
import {Text, ScrollView, Image, StyleSheet,View} from "react-native";
import {returnRatings} from "./ratingsGenerator";

class DetailsScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('movieTitle'),
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            }
        };
    };

    constructor(props){
        super(props);
        this.state = {
            imdb: "1%",
            rotten: "1%",
            meta: "1%",
            Rated: "",
            Runtime: "",
            Plot: "",
            Actors: "",
            Awards: "",
            Poster: "a",
            Ratings: [{"Value": "0.0%"},{"Value": "0.0%"},{"Value": "0.0%"}],
        }
    }

    componentDidMount() {
        this.fetchDetails();
    }


    fetchDetails = async () => {
        const {navigation} = this.props;
        const response = await fetch(`http://www.omdbapi.com/?apikey=4f367a3a&t=${navigation.getParam('movieTitle').replace(/\s+/g, '+')}`);
        const results = await response.json();
        this.setState({
            Rated: results.Rated,
            Runtime: results.Runtime,
            Plot: results.Plot,
            Actors: results.Actors,
            Awards: results.Awards,
            Ratings: results.Ratings,
            Poster: results.Poster,
        })
    };

    render() {
        const {navigation} = this.props;
        return (
            <ScrollView style={{ flex: 1,backgroundColor: '#e9e8ee'}}>
                <Image style={{flex: 1, width: '95%', height: 400, marginVertical: 15, alignSelf: 'center'}}
                       source={{uri: this.state.Poster}}/>
                <View style={{marginLeft: 10, marginBottom: 20}}>
                    <View style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
                        <Text style={styles.title}>{`${navigation.getParam('movieTitle')} `}</Text>
                        <Text style={{fontSize: 19, fontStyle: 'italic'}}>{`(${navigation.getParam('movieYear')})`}</Text>
                    </View>
                    <Text style={{marginVertical: 7}}>{`${this.state.Rated}, ${this.state.Runtime}`}</Text>
                    <Text>
                        <Text style={{fontWeight: 'bold'}}>Plot: </Text>
                        <Text>{this.state.Plot}</Text>
                    </Text>
                    <Text style={{marginVertical: 7}}>
                        <Text style={{fontWeight: 'bold'}}>Actors: </Text>
                        <Text>{this.state.Actors}</Text>
                    </Text>
                    {/*Only display awards if there are some*/}
                    {this.state.Awards? <Text style={{marginVertical: 7}}>
                        <Text style={{fontWeight: 'bold'}}>Awards: </Text>
                        <Text>{this.state.Awards}</Text>
                    </Text>: null}
                    {returnRatings(this.state.Ratings)}
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    marginLeft:{
        marginLeft: 15,
    },
    title:{
        fontSize: 19,
        fontWeight: 'bold',
    }
});
export default DetailsScreen;
