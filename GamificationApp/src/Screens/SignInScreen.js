import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Platform, StyleSheet, TextInput, StatusBar } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Feather from "react-native-vector-icons/Feather";
import * as Animatable from "react-native-animatable"
import { AuthContext } from "../Components/Context";

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        passWord: '',
        check_textInputChange: false,
        secureTextEntry: true
    });

    const {signIn} = React.useContext(AuthContext);

    const textInputChange = (value) => {
        if (value.length != 0) {
            setData({
                ...data,
                email: value,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                email: value,
                check_textInputChange: false
            })
        }
    };

    const HandlerPassWordChange = (value) => {
        setData({
            ...data,
            passWord: value,

        })
    }


    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    return (
        <View style={styles.container}>
                        <StatusBar backgroundColor = '#003266' barStyle = 'light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Bem vindo!</Text>
            </View>
            <Animatable.View style={styles.footer} animation = "fadeInUpBig">
                <Text style={styles.text_footer} >Email</Text>
                <View style={styles.action}>
                    <FontAwesome5
                        name="user"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput placeholder="Email"
                        style={styles.styleTextInput}
                        autoCapitalize="none"
                        onChangeText={(value) => textInputChange(value)} />



                    {data.check_textInputChange ?

                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>

                        : null}
                </View>
                
                <Text style={styles.text_footer}>Senha</Text>


                <View style={styles.action}>
                    <Feather
                        name="lock"
                        color="#05375a"
                        size={20}
                    />
                    <TextInput placeholder="Senha"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.styleTextInput}
                        autoCapitalize="none"
                        onChangeText={(value) => HandlerPassWordChange(value)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry}>
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="green"
                                size={20}
                            />
                            :
                            <Feather name="eye"
                                color="green"
                                size={20}
                            />}
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity style = {styles.signIn}
                    onPress = {()=>{signIn()}}>
                    <LinearGradient  colors={['#002B64', '#66C5E3']}
                        style={styles.signIn}>
                        <Text style = {styles.signIn,{color:'#fff'}}>Fazer Login</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {()=> navigation.navigate('SignUpScreen')}
                                       style = {[styles.signIn, {borderColor: '#009387', 
                                                                borderWidth: 1, 
                                                                marginTop: 15}]}>
                        <Text style = {styles.textSign}>Cadastrar</Text>

                    </TouchableOpacity>

                </View>
            </Animatable.View>
        </View>
    );
}


export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003266'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 9,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    styleTextInput: {
        flex: 1,
        marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});