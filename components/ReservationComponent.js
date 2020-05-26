import React, { Component } from 'react';
import { Text, StyleSheet, ScrollView, View, Switch, Picker, Button, Alert, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';
import DateTimePicker from '@react-native-community/datetimepicker';


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
                        this.addReservationToCalendar(this.state.date);
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

    async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;

    }
   /*
   async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();
    const startDate = new Date(Date.parse(date));
    const endDate = new Date(Date.parse(date) + (2 * 60 * 60 * 1000));
    Calendar.createEventAsync(
        Calendar.DEFAULT,
        {
          title: 'Con Fusion Table Reservation',
          location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
          startDate,
          endDate,
          timeZone: 'Asia/Hong_Kong',
            
        },
    );
    
}*/

//Calendar.createEventAsync(Calendar.DEFAULT,details)
//it is  not available 
 async getCalenderId(){
    const calendarId = await Calendar.createCalendarAsync({
        title: 'test',
        color: '#00AAEE',
        source: {
          isLocalAccount: false,
          name: 'mobile',
          type: 'testing.com',
        },
        name: 'coursera',
        ownerAccount: 'confusion@test.com',
        accessLevel: 'owner',
      });
      return calendarId
}
async addReservationToCalendar(date){
await this.obtainCalendarPermission()
let id=await this.getCalenderId()
let endDate=new Date(date)
endDate.setHours(endDate.getHours()+2)
await Calendar.createEventAsync(id,{
    title:'Con Fusion Table Reservation',
    startDate:new Date(date),
    endDate:endDate,
    timeZone:'Asia/Hong_Kong',
    location:'121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong',
    
})
.then(data=>ToastAndroid.show('Sucess',ToastAndroid.LONG))
.catch(err=>console.log("Failed"))
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
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                //  sound:true,
                //vibrate:'true',
                color: '#512DA8',


            }

        });
        Notifications.createChannelAndroidAsync('default', {
            name: 'default',
            sound: true,

            vibrate: true
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
                        {/* <DateTimePicker
                        testId='dateTimePicker'
                        is24Hour={true}
                        display="default"
                        minimumDate={new Date(2020,5,20)}
                        vlaue={new Date(Date.parse(this.state.date))}
                        

                        onChange={(date) => { this.setState({ date: date }) }}


                        /> */}
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
