import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Icon, Input } from 'react-native-elements'
import colors from '../config/colors'
export default function SigninScreen({ navigation }) {
    return (
        <View style={styles.Container}>
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={{ fontSize: 16 }}>
                        Welcome to
                        <Text style={{ color: '#506EDA', fontWeight: "bold" }}>
                            {" "} BDS
                        </Text>
                    </Text>
                    <Text style={{ fontSize: 16, color: "#8D8D8D" }}>
                        No Account?{"\n"}
                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignupScreen')}
                        >
                            <Text style={{ color: '#506EDA' }}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                    </Text>
                </View>
                <View>
                    <Text style={{ fontWeight: "500", fontSize: 40, color: '#F1908C' }}>
                        Sing in
                    </Text>
                </View>
                <TouchableOpacity style={styles.sso}>
                    <Icon name="logo-google" type="ionicon" color='#506EDA' />
                    <Text style={{ color: "#4285F4", marginLeft: 13 }}>Sign in with Google</Text>
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                        Enter your Username or email address
                    </Text>
                    <Input
                        placeholder="Username or Email"
                        textContentType="emailAddress"
                        style={styles.input}
                        inputContainerStyle={{ borderBottomWidth: 0 }}
                        containerStyle={{ paddingHorizontal: 0 }}
                    >
                    </Input>
                </View>
                <View style={{ padding: 0 }}>
                    <Text style={{ fontSize: 16, fontWeight: "400", paddingBottom: 15 }}>
                        Enter your Password
                    </Text>
                    <Input
                        placeholder="Password"
                        secureTextEntry={true}
                        textContentType="password"
                        style={styles.input}
                        inputContainerStyle={{ borderBottomWidth: 0, }}
                        containerStyle={{ paddingHorizontal: 0, margin: 0 }}
                    >
                    </Input>
                    <TouchableOpacity style={{ alignSelf: "flex-end" }}>
                        <Text style={{ fontSize: 11, color: "#4285F4" }}>
                            Forgot Password
                        </Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={() => navigation.navigate('LandingScreen')}
                >
                    <Text style={styles.buttonText}>
                        Sign in
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    button: {
        width: "92%",
        backgroundColor: colors.secondary,
        alignItems: "center",
        padding: 10,
        borderRadius: 15,
        alignSelf: 'center'
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        color: colors.white
    },
    Container: {
        backgroundColor: "#506EDA",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        width: "90%",
        height: "90%",
        backgroundColor: "white",
        borderRadius: 40,
        padding: 25,
        justifyContent: "space-evenly"
    },
    input: {
        borderWidth: 1,
        borderRadius: 9,
        padding: 15,
        borderColor: '#ADADAD',
    },
    sso: {
        width: '100%',
        backgroundColor: "#E9F1FF",
        padding: 17,
        borderRadius: 9,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    }
})
