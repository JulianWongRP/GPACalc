import React, {useState} from "react";
import {datasource} from "./Data";
import RNPickerSelect from 'react-native-picker-select';
import {Button, TextInput, View, Text} from "react-native";
//

const Add = ({navigation}) => {
    const [module, setModule] = useState('');
    const [grade, setGrade] = useState('');
    const [credit , setCredit] = useState('');

    return (
        <View style={{margin: 20}}>
            <View>
                <Text style={{fontWeight: "bold", fontSize: 30, color: 'red'}}>Add Your Module:</Text>
            </View>
            <TextInput style={{borderWidth: 1, marginBottom: 20}} onChangeText={(text => setModule(text))} placeholder="Module Name" />
            <View style={{borderWidth: 0.5, marginBottom: 10}} >
                <Text> Grade: </Text>
                <RNPickerSelect
                    onValueChange={(value) => setGrade(value)}
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
            <Text> Credit</Text>
            <TextInput style={{borderWidth: 1, marginBottom: 20}} placeholder="Enter Credit" keyboardType="numeric" onChangeText={(value) => setCredit(value)} />
            <Button title='Add'
                    onPress={() => {
                        let item = {
                            key:module,
                            grade:grade,
                            credit: parseFloat(credit)
                        };

                        datasource[0].data.push(item);
                        navigation.navigate("Home");
                    }
                    }
            />
            <Button title='Back' onPress={() => {navigation.navigate("Home")}}>

            </Button>
        </View>
    )
}

export default Add;
