import React, { Component } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity,KeyboardAvoidingView,ScrollView } from 'react-native'
import { connect } from 'react-redux'
import {Button, Input, Text} from 'react-native-elements';
import {addCard, addDeck} from "../utils/api";
import {addCardAction, addDeckAction} from "../actions";


class AddCard extends Component{


    state = {
        question:'',
        answer:''
    };

    componentDidMount() {

    }

    onQuestionChanged = (question) => {
        this.setState({question})
    };

    onAnswerChanged = (answer) => {
        this.setState({answer})
    };

    addCard = () => {
        const {question,answer} = this.state;
        const { goBack } = this.props.navigation;
        const {dispatch} = this.props;
        const { deckId } = this.props.navigation.state.params;
        if(question.length > 0 && answer.length > 0){
            addCard({question,answer},deckId).then((results) => {
                dispatch(addCardAction({question,answer},deckId));
                goBack();
            });
        }
    };

    render() {
        const { deckId } = this.props.navigation.state.params;
        return <ScrollView>
            <KeyboardAvoidingView behavior="padding">
                <Text h3 style={{ marginBottom: 20 }}>Add Card To {deckId}</Text>
                <Input
                    placeholder="Add Question"
                    value={this.state.question}
                    onChangeText={this.onQuestionChanged}/>
                    <View style={{marginTop:20}}/>
                <Input
                    placeholder="Add Answer"
                    value={this.state.answer}
                    onChangeText={this.onAnswerChanged}/>
                <Button onPress={this.addCard} title="Add Card" style={{marginTop:20}}/>
            </KeyboardAvoidingView>
        </ScrollView>
    }
}

function mapStateToProps ({}) {
    return {

    }
}

export default connect(mapStateToProps)(AddCard)