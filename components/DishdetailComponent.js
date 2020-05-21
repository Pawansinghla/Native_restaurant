import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, FlatList, Button, Alert, PanResponder } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavourite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favourites: state.favourites,

    }
}

const mapDispatchToProps = dispatch => ({
    postFavourite: (dishId) => dispatch(postFavourite(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))

});

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef=(ref)=>this.view=ref;
    const recognizeDrag = ({ moveX, moveY, dx, dy }) => {// we can extract those properties those needed from gestureState
        if (dx < -200)
            return true;

        else
            return false;


    };
    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;

        },
        onPanResponderGrant:()=>{
            this.view.rubberBand(1000)
            .then(endState=>console.log(endState.finished?'finished':'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorite ',
                    'Are you sure you wish to add ' + dish.name + ' to your favorite ?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'

                        },
                        {
                            text: 'Ok',
                            onPress: () => props.favourite ? console.log("alredy favourite") : props.onPress(),
                            style: 'ok'

                        }
                        

                    ],
                    { cancelable: false }

                );


            return true;
        }


    });
    if (dish != null) {
        return (
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}
            ref={this.handleViewRef}
            {...panResponder.panHandlers}>
                
                <Card
                    featuredTitle={dish.name}
                    image={{ uri: baseUrl + dish.image }}
                >
                    <Text style={{ margin: 10 }}>
                        {dish.description}
                    </Text>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Icon
                            raised
                            reverse
                            name={props.favourite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#f50'
                            onPress={() => props.favourite ? console.log("alredy favourite") : props.onPress()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            onPress={() => props.onPressComment()}
                            color='#512DA8'

                        />
                    </View>
                </Card>
            </Animatable.View>

        );
    }
    else {
        return (<View></View>)
    }

}

function RenderComments(props) {
    const comments = props.comments;

    const RenderCommentItem = ({ item, index }) => {
        return (

            <View key={index} style={{ margin: 10 }}>
                <Text style={{ fontSize: 14 }}>
                    {item.comment}
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {item.rating} Starts
                </Text>
                <Text style={{ fontSize: 12 }}>
                    {'-- ' + item.author + ',' + item.date}
                </Text>

            </View>

        );


    }
    return (
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
            <Card title="Comments">
                <FlatList
                    data={comments}
                    renderItem={RenderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />

            </Card>
        </Animatable.View>

    );

}


class Dishdetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            rating: null,
            author: '',
            comment: ''

        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }


    markFavourite(dishId) {
        //  this.setState({favourites:this.state.favourites.concat(dishId)})
        this.props.postFavourite(dishId);


    }
    handleComment() {
        const { rating, author, comment } = this.state;
        const dishId = this.props.navigation.getParam('dishId', '');
        this.props.postComment(dishId, rating, author, comment);




    }

    resetCommentForm() {
        this.setState({
            showModal: false,
            rating: null,
            author: '',
            comment: ''
        })
    }


    static navigationOptions = {
        title: 'Dish Details'
    };



    render() {
        const dishId = this.props.navigation.getParam('dishId', '')

        return (
            <ScrollView>
                <RenderDish
                    dish={this.props.dishes.dishes[+dishId]}
                    favourite={this.props.favourites.some(el => el === dishId)}
                    onPress={() => this.markFavourite(dishId)}
                    onPressComment={() => this.toggleModal()}

                />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId == dishId)} />

                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showModal}
                    onDismiss={() => { this.toggleModal() }}
                    onRequestClose={() => { this.toggleModal() }}
                >
                    <View >
                        <Rating
                            startingValue={1}
                            showRating
                            onFinishRating={rating => this.setState({ rating: rating })}
                        />
                        <Input
                            placeholder='Author'
                            leftIcon={{

                                type: 'font-awesome',
                                name: 'user-o'

                            }}
                            onChangeText={author => this.setState({ author: author })}

                        />

                        <Input
                            placeholder="Comment"
                            leftIcon={{
                                type: 'font-awesome',
                                name: 'comment-o'
                            }}
                            onChangeText={comment => this.setState({ comment: comment })}

                        />
                    </View>
                    <View style={{ margin: 10 }}>


                        <Button
                            onPress={() => { this.handleComment(); this.resetCommentForm() }}
                            color="#512DA8"
                            title="SUBMIT"

                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => { this.toggleModal(); this.resetCommentForm() }}
                            color="gray"
                            title="CANCEL"

                        />

                    </View>

                </Modal>

            </ScrollView>
        );
    }



}
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);
