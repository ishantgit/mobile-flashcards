import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity,KeyboardAvoidingView,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {Button, Input, Text} from 'react-native-elements';
import {addDeck} from "../utils/api";
import {addDeckAction} from "../actions";


class AddDeck extends Component{


    state = {
        deckTitle:''
    };

    componentDidMount() {

    }

    onTitleChanged = (title) => {
        this.setState({deckTitle:title})
    };

    addDeck = () => {
        const title = this.state.deckTitle;
        const {navigate} = this.props.navigation;
        const {dispatch} = this.props;
        if(title.length > 0){
            const deckObject = {
                [title]:{
                    title:title,
                    questions:[]
                }
            };
            this.setState({deckTitle:''});
            addDeck(deckObject).then((results) => {
                dispatch(addDeckAction(deckObject));
                navigate("Deck", { deckId: title });
            });
        }
    };

    render() {
        return <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={{ marginBottom: 20 }}>Create Deck</Text>
                <Input
                    placeholder="title of your deck"
                    value={this.state.deckTitle}
                    onChangeText={this.onTitleChanged}/>
                <Button onPress={this.addDeck} title="Add Deck" style={{marginTop:20}}/>
            </KeyboardAvoidingView>
        </ScrollView>
    }
}

function mapStateToProps ({}) {
    return {

    }
}

export default connect(mapStateToProps)(AddDeck)