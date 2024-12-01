import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {datasource} from './Data';
import {Button, SectionList, StyleSheet, TouchableOpacity, View, Text, Alert} from "react-native";


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,

    },
    headerText: {
        fontSize: 30,
        margin: 10,
        textAlign: 'center',
        fontWeight: 'bold',


    },
})

const Home = ({navigation}) => {

    const [GPA, setGPA] = useState('');

    function CalculationHandler() {
        let dataSet =
            {
                "A": 4,
                "B+": 3.5,
                "B": 3,
                "C+": 2.5,
                "C": 2,
                "D+": 1.5,
                "D": 1,
                "E": 0.5,
                "F": 0
            }

        let weightedSum = 0;
        let totalCredit = 0;

        for (let i = 0; i < datasource[0].data.length; i++) {
            let item = datasource[0].data[i];
            weightedSum += dataSet[item.grade] * item.credit;
            totalCredit += item.credit;
        }

        const calculatedGPA = (weightedSum / totalCredit).toFixed(2);
        setGPA(calculatedGPA);
        Alert.alert("Overall GPA:", calculatedGPA);

    }


    const renderItem = ({item, section, index}) => {

        const styles = StyleSheet.create({
                borderContainer: {
                    borderWidth: 0.4,
                    margin: 10,
                    padding: 11,
                    borderTopWidth: 5,
                    backgroundColor: 'lightgrey',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }

            }
        )
        return (
            <TouchableOpacity onPress={() => navigation.navigate("Edit", {
                index: index,
                type: section.title,
                key: item.key,
                grade: item.grade,
                credit: item.credit,
            })}>
                <View style={[styles.borderContainer]}>
                    <Text style={{fontSize: 20}}>{item.key}</Text>
                    <Text style={item.grade==="A" ? {color: "green", fontWeight: "bold", fontSize: 20} : {fontSize: 20}} >{item.grade}</Text>
                </View>

            </TouchableOpacity>
        );
    }
//
    return (
        <View>
            <View style={{ marginTop: 30, margin: 20}}>
                <SectionList
                    sections={datasource}
                    renderItem={renderItem}
                    contentContainerStyle={{ margin: 20, borderWidth: 3}}
                    renderSectionHeader={({ section: { title, icon } }) => (
                        <View style={[styles.headerContainer]}>
                            <Icon name={icon} size={30} color="red" />
                            <Text style={styles.headerText}>{title}</Text>
                        </View>
                    )}
                />
                <View>
                    <Button title={"Add Module"} onPress={() => navigation.navigate("Add")} />
                </View>
                <View style={{marginTop: 20}}>
                    <Button title={"Calculate GPA"} onPress={CalculationHandler} />
                </View>
            </View>
        </View>
    )

};

export default Home;
