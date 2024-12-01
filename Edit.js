import React, {useState} from 'react';
import {datasource} from './Data.js'
import {TextInput, Text, View, Button, Alert} from "react-native";
import RNPickerSelect from "react-native-picker-select";
//
const Edit = ({navigation, route}) => {
    const [module, setModule] = useState(route.params.key);
    const [grade, setGrade] = useState(route.params.grade);
    const [credit, setCredit] = useState(route.params.credit);

    return (
        <View style={{margin: 10}}>
            <Text style={{fontSize: 20, color: "red"}}>Edit Module:</Text>
            <TextInput value={module} style={{borderWidth: 1, marginBottom: 20}} onChangeText={(text) => setModule(text)}/>
            <Text style={{fontSize: 20, color: "grey"}}>Edit Grade:</Text>
            <View style={{borderWidth: 0.5, marginBottom: 10    }} >
                <RNPickerSelect
                    onValueChange={(value) => setGrade(value)} value={grade}
                    items={[
                        { label: "A", value: "A" },
                        { label: "B+", value: "B+" },
                        { label: "B", value: "B" },
                        { label: "C+", value: "C+" },
                        { label: "C", value: "C" },
                        { label: "D+", value: "D+" },
                        { label: "E", value: "E" },
                        { label: "F", value: "F" },
                    ]}
                />
            </View>
            <Text style={{fontSize: 20, color: "grey"}}>Edit Credit:</Text>
            <TextInput
                value={String(credit)} // Ensure it's a string for the TextInput
                style={{ borderWidth: 1 }}
                keyboardType="numeric"
                onChangeText={(text) => setCredit(Number(text) || 0)} // Convert to number
            />
            <View style={{flexDirection: "row"}}>
                <View style={{margin: 10, flex: 1}}>
                    <Button title="Save"
                            onPress={()=>{
                                datasource[0].data[route.params.index] = {
                                    key: module,
                                    grade: grade,
                                    credit: credit,
                                }
                                navigation.navigate("Home");
                            }}
                    />
                </View>


                <View style={{margin: 10, flex: 1}}>
                    {/*Delete Button*/}
                    <Button title="Delete"
                            onPress={()=>{
                                Alert.alert("Are you sure?", ' ', [{text: "Yes", onPress:()=>{
                                        datasource[0].data.splice(route.params.index, 1);
                                        navigation.navigate("Home");
                                    }},
                                    {text: "No"}])

                            }}/>
                </View>
            </View>


        </View>
    )
}

export default Edit;
