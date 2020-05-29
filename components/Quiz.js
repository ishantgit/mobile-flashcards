import React, { Component } from 'react'
import {View, StyleSheet, Platform, TouchableOpacity, ScrollView} from 'react-native'
import { connect } from 'react-redux'
import {Button, Card, Text} from "react-native-elements";
import {clearLocalNotification} from "../utils/helpers";

class Quiz extends Component{

    state = {
        currentQuestion:0,
        showAnswer:false,
        score: 0
    };

    markScore = (correct = false) => {
        const {deck} = this.props;
        if(this.state.currentQuestion + 1 === deck.questions.length){
            clearLocalNotification();
        }
        this.setState(prevState => {
            return {
                currentQuestion:prevState.currentQuestion+1,
                showAnswer : !prevState.showAnswer,
                score: correct ? prevState.score + 1 : prevState.score
            }
        })
    };

    restart = () => {
        this.setState({
            currentQuestion:0,
            showAnswer:false,
            score: 0
        });
    };

    goBackToDeck = () => {
        const { goBack } = this.props.navigation;
        goBack();
    };

    render() {
        const {deck} = this.props;
        if(!deck){
            return <View>
                <Text>Loading...</Text>
            </View>
        }
        if(deck.questions.length === 0){
            return <View>
                <Text h3> No Questions in the deck</Text>
            </View>
        }
        if(this.state.currentQuestion >= deck.questions.length){
            const {score} = this.state;
            return <ScrollView>
                <Card>
                    <Text h3>Score {score}</Text>
                    <Text>Out Of {deck.questions.length}</Text>
                </Card>
                <Button title="Restart Quiz" style={{marginTop:20}} onPress={this.restart}/>
                <Button title="Back to Deck" style={{marginTop:10}} onPress={this.goBackToDeck}/>
            </ScrollView>
        }
        return <ScrollView>
            <Text h3>Quiz from deck {deck.title}</Text>
            <Text>{this.state.currentQuestion +  1} of {deck.questions.length}</Text>
            <Text>Question</Text>
            <Card>
                <Text h4>{deck.questions[this.state.currentQuestion].question}</Text>
                {
                    this.state.showAnswer ? <Text h4 style={{marginTop:10}}> Answer : {deck.questions[this.state.currentQuestion].answer}</Text> : null
                }
            </Card>
            {
                this.state.showAnswer ? <Button title="Correct" style={{marginTop:20}} onPress={()=>this.markScore(true)}/> : null
            }
            {
                this.state.showAnswer ? <Button title="Incorrect" style={{marginTop:20}} onPress={()=>this.markScore(false)}/> : null
            }
            {
                !this.state.showAnswer ? <Button onPress={() => {
                    this.setState(prevState => {
                        return {
                            showAnswer: true
                        }
                    })
                }} title="Show Answer" style={{marginTop:20}}/> : null
            }
        </ScrollView>
    }
}

function mapStateToProps (decks,props) {
    const deck = decks[props.navigation.state.params.deckId];
    return {
        deck
    }
}

export default connect(mapStateToProps)(Quiz)