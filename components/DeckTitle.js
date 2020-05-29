import React, { Component } from 'react'
import { View , StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components';
import { Card, Text } from "react-native-elements";

class DeckTitle extends Component{

    render() {
        const {deck} = this.props;
        return <Card>
            <Text h3>{deck.title}</Text>
            <Text>{deck.questions.length} {deck.questions.length > 1 ? "cards" : "card"} </Text>
        </Card>
    }
}

export default DeckTitle;

