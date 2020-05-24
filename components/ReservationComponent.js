import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View, Switch, Picker, Button, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: '',
            showModal: false

        }
    }

    // toggleModal() {
    //     this.setState({ showModal: !this.state.showModal })

    // }

    handleReservation = () => {
        console.log(JSON.stringify(this.state));
        // this.toggleModal();
        Alert.alert(
            'Your Reservation  OK?',
            `Number of guests: ${this.state.guests}\nSmoking? ${this.state.smoking ? 'Yes' : 'No'}\nDate and Time:${this.state.date}`,

            [
                {
                    text: 'Cancel',
                    styles: 'cancel',
                    onPress: () => this.resetForm()
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                },

            ],
            { cancelable: false }
        );
    }

    resetForm = () => {
        this.setState({
            guests: 1,
            smoking: false,
            date: '',
            showModal: false
        });

    }


    async obtainNotificationPermission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
          Notifications.presentLocalNotificationAsync({
                  title:'Your Reservation',
                  body:'Reservation for '+ date +' requested',
                  ios:{
                       sound:true
                   },
                  android:{
                    //  sound:true,
                      //vibrate:'true',
                      color:'#512DA8',
                      

                  }
                  
              });
                Notifications.createChannelAndroidAsync('default', {
                  name: 'default',
                  sound: true,

                  vibrate:true
                });
              

    }




    static navigationOptions = {
        title: 'Reserve Table'
    }

    render() {
        return (
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
                <ScrollView>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>
                            Number of Guests</Text>
                        <Picker style={styles.formItem}
                            selectedValue={this.state.guests}
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                        >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />

                        </Picker>

                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                        <Switch
                            style={styles.formItem}
                            value={this.state.smoking}
                            // onTintColor='#512DA8'
                            trackColor={{ true: '#512DA8', false: 'gray' }}
                            //trackColor={{ true: '#7ab8e1', false: Platform.OS=='android'?'#d3d3d3':'#fbfbfb'  }}
                            onValueChange={(value) => this.setState({ smoking: value })}

                        >
                        </Switch>
                    </View>

                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{ flex: 2, marginRight: 20 }}
                            date={this.state.date}
                            format=''
                            mode='datetime'
                            placeholder='select date and time'
                            minDate='2020-05-16'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36

                                }

                            }}
                            onDateChange={(date) => { this.setState({ date: date }) }}

                        >

                        </DatePicker>


                    </View>

                    <View style={styles.formRow}>
                        <Button
                            title="Reserve"
                            color="#512DA8"
                            accessibilityLabel='Learn more about this purpule button'
                            onPress={() => this.handleReservation()}



                        />

                    </View>


                    {/* <Modal
                        animationType={'slide'}
                        transparent={false}
                        visible={this.state.showModal}
                        onDismiss={() => { this.toggleModal(); this.resetForm() }}
                        onRequestClose={() => { this.toggleModal(); this.resetForm() }}
                    >
                        <View style={styles.modal}>
                            <Text style={styles.modalTitle}>
                                Your Reservation
                        </Text>
                            <Text style={styles.modalText}>Number of Guests:{this.state.guests}</Text>
                            <Text style={styles.modalText}>Smoking?:{this.state.smoking ? 'Yes' : 'No'}</Text>
                            <Text style={styles.modalText}>Date and Time:{this.state.date}</Text>
                            <Button
                                onPress={() => { this.toggleModal(); this.resetForm() }}
                                color="#512DA8"
                                title="Close"
                            />

                        </View>

                    </Modal> */}

                </ScrollView>
            </Animatable.View>

        );
    }

}

const styles = StyleSheet.create({
    formRow: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2,
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: "#512DA8",
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;
