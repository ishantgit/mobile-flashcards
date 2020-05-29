import React, { Component } from 'react'
import { View,  StyleSheet, Platform, TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {fetchDeckResults} from "../utils/api";
import {loadDecks} from "../actions";
import DeckTitle from "./DeckTitle";
import {Card,Text} from "react-native-elements";

class Home extends Component{

    state = {
        loading: false
    };

    componentDidMount() {
        this.setState({loading:true});
        fetchDeckResults().then((decks) => {
            this.props.dispatch(loadDecks(JSON.parse(decks)));
            this.setState({loading:false});
        })
    }

    goToDeck = (deckId) =>{
        const { navigate } = this.props.navigation;
        navigate("Deck", { deckId });
    };

    goToAddDeck = () =>{
        const { navigate } = this.props.navigation;
        navigate("AddDeck");
    };

    render() {
        const {decks} = this.props;
        if(this.state.loading){
            return <View style={{flex:1}}>
                <Text h3>Loading...</Text>
            </View>
        }
        return <ScrollView>
            {
                decks != null && Object.keys(decks).length > 0 ? Object.keys(decks).map((id) => {
                   return <TouchableOpacity key={id}
                                      onPress={() => this.goToDeck(id)}>
                        <DeckTitle deck={decks[id]}/>
                    </TouchableOpacity>
                }) : <View style={{flex:1}}>
                    <Text h3>No Decks</Text>
                </View>
            }
        </ScrollView>
    }
}

function mapStateToProps (decks) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(Home)