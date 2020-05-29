import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Card, Text,Button } from "react-native-elements";
import DeckTitle from "./DeckTitle";
import {deleteDeck} from "../actions";
import {removeDeck} from "../utils/api";

class Deck extends Component{

    addCard = () =>{
        const { navigate } = this.props.navigation;
        const { deckId } = this.props.navigation.state.params;
        navigate("AddCard", { deckId: deckId });
    };

    deleteDeck = () => {
        const {deck,navigation,dispatch} = this.props;
        const id = deck.title;
        removeDeck(id).then(()=>{
            dispatch(deleteDeck(id));
            navigation.navigate("Decks");
        });
    };

    goToQuiz = () => {
        const { navigate } = this.props.navigation;
        const { deck } = this.props;
        navigate("Quiz", { deckId: deck.title });
    };

    render() {
        const {deck} = this.props;
        if(!deck){
            return <View>

            </View>
        }
        return <ScrollView>
            <DeckTitle deck={deck}/>
            <Button onPress={this.addCard} title="Add Card" style={{marginTop:20}}/>
            <Button onPress={this.goToQuiz} title="Start Quiz" type="outline" style={{marginTop:10}}/>
            <Button onPress={this.deleteDeck} title="Delete Card" type="clear" style={{marginTop:10}}/>
        </ScrollView>
    }
}


function mapStateToProps (decks,props) {
    const deck = decks[props.navigation.state.params.deckId];
    return {
        deck
    }
}

export default connect(mapStateToProps)(Deck)

