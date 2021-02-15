import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(AuthContext);
    return(
        <View style={styles.container}>
            <NavigationEvents onWillFocus={clearErrorMessage}/>
            <AuthForm 
                headerText="Sign In to your account" 
                errorMessage={state.errorMessage} 
                onSubmit={signin}
                submitButtonText="Sign In"
            />
            <NavLink
                text="Don't have an account? Go back to Sign up"
                routeName='Signup'                
            />
        </View>
    );
};

SigninScreen.navigationOptions = () => {
    return {
        // header: null deprecated
        headerShown: false
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 200
    }
});

export default SigninScreen;