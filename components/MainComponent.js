import React, { Component } from 'react';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import { ScrollView, View, Platform, Image, StyleSheet,Text } from 'react-native';
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import {connect} from 'react-redux';
import {fetchDishes,fetchLeaders,fetchPromos,fetchComments } from '../redux/ActionCreators';
import  Favorites from  './FavoriteComponent';
import Login from './LoginComponent';

const mapStateToProps=state=>{
    return{
    }
}


const mapDispatchToProps=dispatch=>({
    fetchDishes:()=>dispatch(fetchDishes()),
    fetchComments:()=>dispatch(fetchComments()),
    fetchPromos:()=>dispatch(fetchPromos()),
    fetchLeaders:()=>dispatch(fetchLeaders()),

});

const MenuNavigator = createStackNavigator({
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name="menu" size={24}
                color='white'
                onPress={() => navigation.toggleDrawer()}
            />
        })
    },
    Dishdetail: { screen: Dishdetail }

}, {
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});




const AboutNavigator = createStackNavigator({
    About: { screen: About }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});


const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});



const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});
const ReservationNavigator = createStackNavigator({
    Reservation: { screen:Reservation }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen:Favorites }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const LoginNavigator = createStackNavigator({
    Login: { screen:Login }
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name="menu" size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })
});

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container}
            forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')}
                        style={styles.drawerImage} />
                  </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
              
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>


);

const MainNavigator = createDrawerNavigator({
    Login: {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawLabel: 'Login',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                   // color="blue"
                   color={tintcolor}
                />
            )

        }


    },
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawLabel: 'Home',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                   // color="blue"
                   color={tintcolor}
                />
            )

        }


    },


    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawLabel: 'About Us',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='info-circle'
                    type='font-awesome'
                    size={24}
                    color={tintcolor}
                />
            )


        },
    },

    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawLabel: 'Menu',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintcolor}
                />
            )


        },
    },

    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawLabel: 'Contact Us',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintcolor}
                />
            )


        },
    },
    
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawLabel: 'Reserve Table',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    color={tintcolor}
                />
            )


        },
    },
    
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawLabel: 'My Favorites',
            drawerIcon: ({ tintcolor }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    color={tintcolor}
                />
            )


        },
    }
}, {
    initialRouteName:'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent:CustomDrawerContentComponent

});


class Main extends Component {
    componentDidMount(){
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }
    render() {
        return (
            <View style={{ flex: 1,           paddingTop: Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight}}>
                <MainNavigator />
            </View>

        );
    }



}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    drawerHeader: {
      backgroundColor: '#512DA8',
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row'
    },
    drawerHeaderText: {
      color: 'white',
      fontSize: 24,
      fontWeight: 'bold'
    },
    drawerImage: {
      margin: 10,
      width: 80,
      height: 60
    }
  });
  


export default connect(mapStateToProps,mapDispatchToProps)(Main);
