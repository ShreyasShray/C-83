import firebase from 'firebase';
import * as React from 'react';
import {
    View,
    Text,
    ScrollView,
    FlatList
} from 'react-native';
import db from '../config';
import {ListItem, Icon} from "react-native-elements";
import MyHeader from '../components/MyHeader';

export default class NotificationScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            user_id:firebase.auth().currentUser.email,
            allNotifications:[]
        }
        this.notificationRef = null
    }
    getNotificationScreen=async()=>{
        this.notificationRef = db.collection("notifications").where("targated_user_id", "==", this.state.user_id)
        .where("notification_status", "==", "unread")
        .onSnapshot(snapshot=>{
            var allNotifications = []
            snapshot.docs.map(doc=>{
                var notifications = doc.data();
                notifications[doc_id] = doc.id
                allNotifications.push(notifications)
            })
            this.setState({
                allNotifications:allNotifications
            })
        })
    }

    componentDidMount=()=>{
        this.getNotificationScreen()
    }

    componentWillUnmount=()=>{
        this.notificationRef()
    }

    keyEtractor = (item, index) => index.toString()

    renderItem=({item, index})=>{
        return(
            <ListItem
                key={index}
                leftElement={
                    <Icon name="book" type="font-awsome" color="skyblue"></Icon>
                }
                title={item.book_name}
                titleStyle={{fontSize:20, fontWeight:'bold', color:'black'}}
                subtitle={item.message}
                bottomDivider
            ></ListItem>
        );
    }
    render(){
        return(
            <ScrollView>
                <MyHeader title="My Notifications"></MyHeader>
                <View style={{flex:1}}>
                    {
                        this.state.allNotifications.length===0?(
                            <View>
                                <Text style={{textAlign:'center', marginTop:200, fontSize:20}}>No Notifications</Text>
                            </View>
                        ):(
                            <FlatList
                                keyExtractor={this.keyEtractor}
                                data={this.state.allNotifications}
                                renderItem={this.renderItem}
                            ></FlatList>
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}