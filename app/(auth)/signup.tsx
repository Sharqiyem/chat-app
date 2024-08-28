import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { createUser } from '@/lib/data/user/createUser';

export default function SignUp() {
  const [email, setEmail] = useState('124578shar@gmail.com');
  const [username, setUsername] = useState('salam');
  const [password, setPassword] = useState('Sas12345Sas');

  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    try {
      await signUp.create({
        emailAddress: email,
        password
      });
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      const { user, error } = await createUser({
        email,
        username
      });

      if (user) router.push('/verify');
      else alert(error?.message || 'Error signing up');
    } catch (err: any) {
      alert(err.errors?.[0]?.message);
      console.log('Error signing up', JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Sign Up</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        value={username}
        onChangeText={(username) => setUsername(username)}
        placeholder="username"
      />
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder="email"
      />

      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder="password"
      />
      <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded" onPress={onSignUpPress}>
        <Text className="text-white">Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mt-4" onPress={() => router.push('/login')}>
        <Text className="text-blue-500">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
