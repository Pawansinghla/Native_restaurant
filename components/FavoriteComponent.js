import React, { Component } from 'react';
import { View, FlatList, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import SwipeOut from 'react-native-swipeout';
import { deleteFavorite } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favourites: state.favourites

    }
}
const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

class Favorites extends Component {

    static navigationOptions = {
        title: "My Favorites"
    }
    render() {
        const { navigate } = this.props.navigation;
        const renderMenuItem = ({ item, index }) => {
            const rightButton = [
                {
                    text: 'Delete',
                    type: 'delete',
                    onPress: () => {
                        Alert.alert(
                            'Delete Favorite?',
                            'Are you sure  you wish to delete the favorite dish ' + item.name + '?',
                            [
                                {
                                    text: 'Cancel',
                                    style: 'cancel',
                                    onPress: () => console.log(item.name + 'Not Deleted')
                                },
                                {
                                    text: 'OK',
                                    style: 'ok',
                                    onPress: () => this.props.deleteFavorite(item.id)
                                }


                            ],
                            { cancelable: false }// if it is false means  it is mandatory user press either ok or cancel,


                        );

                    }


                }

            ];

            return (
                <SwipeOut right={rightButton} autoClose={true}>
                    <Animatable.View animation="fadeInRightBig" duration={2000}>
                        <ListItem
                            key={index}
                            title={item.name}
                            subtitle={item.description}
                            hideChevron={true}
                            onPress={() => navigate('Dishdetail', { dishId: item.id })}
                            leftAvatar={{ source: { uri: baseUrl + item.image } }}

                        />
                    </Animatable.View>
                </SwipeOut>
            );
        }
        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        }
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>


            );
        }

        else {
            return (
                <FlatList
                    data={this.props.dishes.dishes.filter(dish => this.props.favourites.some(el => el === dish.id))}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />

            );
        }
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);