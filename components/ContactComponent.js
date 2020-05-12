import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card } from 'react-native-elements';




function Contact() {

    return (
        <Card title="Contact Information">
            <View >
                <Text style={{margin:10,fontSize:16 }}>
                    989898121,Clear Water Bay Road
                </Text>
                <Text style={{margin:10,fontSize:16 }}>Clear Water Bay, Kowloon
                    </Text>
                <Text style={{margin:10,fontSize:16 }}>
                    HONG KONG
                    </Text>
                <Text style={{margin:10,fontSize:16 }}>
                    Tel: +852 1234 5678</Text>
                <Text style={{margin:10,fontSize:16 }}>
                    Fax: +852 8765 4321</Text>
                <Text style={{margin:10,fontSize:16 }}>
                    Email:confusion@food.net</Text>
            </View>

        </Card>


    );
}
export default Contact;