import { Ionicons } from '@expo/vector-icons'; // Assuming you have @expo/vector-icons installed
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Header } from '../../components/Headrer';
import useTheme from '../../hooks/usetheme';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { colors } = useTheme();
  const styles = createStyle(colors);
  const navigationTab = useNavigation();

  const router = useRouter();

  const handleLogin = () => {
    router.push("(screens)/parentPortalHomePage");
  };

  const handleForgotPassword = () => {
    alert('Forgot Password pressed!'); // Placeholder for navigation or action
  };

  const handleSignUp = () => {
    alert('Sign Up pressed!'); // Placeholder for navigation or action
  };

  return (
    <>
      <Header
        title="Parent"
        showLeftIcon
        leftIconName="menu"
        onLeftIconPress={() => navigationTab.openDrawer()}
      />
      <KeyboardAvoidingView
        style={{ flex: 2 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          {/* Logo */}
          <Image
            source={require('../../assets/images/simadlogo.png')} // Update this path to your logo
            style={styles.logo}
            resizeMode="contain"
          />

          {/* Welcome Message */}
          <Text style={styles.welcomeText}>
            Welcome to SIMAD University,
            {'\n'}Please Login to continue
          </Text>

          {/* Username Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Username"
              placeholderTextColor="#999"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.passwordVisibilityToggle}>
              <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={20} color="#888" />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPasswordButton}>
            <Text style={styles.forgotPasswordText}>Forgot Password</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Don't have an account Link */}
          <TouchableOpacity onPress={handleSignUp} style={styles.signUpButton}>
            <Text style={styles.signUpText}>Don't have an account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};



const createStyle = (colors) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.bg,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 30,
    },
    welcomeText: {
      fontSize: 22,
      fontWeight: 500,
      color: colors.text,
      textAlign: 'center',
      marginBottom: 40,
      lineHeight: 30,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 15,
      paddingHorizontal: 15,
      width: '100%',
      maxWidth: 350,
      height: 50,
    },
    inputIcon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 16,
      color: colors.text,
    },
    passwordVisibilityToggle: {
      padding: 5,
    },
    forgotPasswordButton: {
      alignSelf: 'flex-end',
      width: '100%',
      maxWidth: 350,
      marginBottom: 30,
    },
    forgotPasswordText: {
      color: colors.text,
      fontSize: 14,
      fontWeight: '500',
      textAlign: 'right',
    },
    loginButton: {
      backgroundColor: colors.primary, // Green color
      paddingVertical: 15,
      borderRadius: 8,
      width: '100%',
      maxWidth: 350,
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    loginButtonText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: 'bold',
    },
    signUpButton: {
      marginTop: 20,
    },
    signUpText: {
      color: colors.text,
      fontSize: 16,
    },
  });
}

export default LoginScreen;