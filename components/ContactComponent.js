import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { Card,Button,Icon } from 'react-native-elements';

import * as Animatable from 'react-native-animatable';
import * as MailComposer from 'expo-mail-composer';


function Contact() {

    sendMail=()=>{
        MailComposer.composeAsync({
            recipients:['confusion@food.net'],
            subject:'Enquiry',
            body:'To Whom it  may concern:'
        });

    }

    

    return (
        <Animatable.View animation="fadeInDown" duration={2000} >
            <Card title="Contact Information">
                <ScrollView >
                    <Text style={{ margin: 10, fontSize: 16 }}>
                     121,Clear Water Bay Roa
                </Text>
                    <Text style={{ margin: 10, fontSize: 16 }}>Clear Water Bay, Kowloon
                    </Text>
                    <Text style={{ margin: 10, fontSize: 16 }}>
                        HONG KONG
                    </Text>
                    <Text style={{ margin: 10, fontSize: 16 }}>
                        Tel: +852 1234 5678</Text>
                    <Text style={{ margin: 10, fontSize: 16 }}>
                        Fax: +852 8765 4321</Text>
                    <Text style={{ margin: 10, fontSize: 16 }}>
                        Email:confusion@food.net</Text>
                    <Button
                    title="Send Email"
                    buttonStyle={{backgroundColor:"#512DA8"}}
                    icon={
                        <Icon
                        name="envelope-o"
                        type="font-awesome"
                        color="white"
                        />
                    }
                    onPress={()=>sendMail()}
                
                    
                    />
                </ScrollView>

            </Card>
        </Animatable.View>


    );
}
export default Contact;