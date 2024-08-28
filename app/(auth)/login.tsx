import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { createUser } from '@/lib/data/user/createUSer';

export default function Login() {
  const [email, setEmail] = useState('124578shar@gmail.com');
  const [password, setPassword] = useState('Sas12345Sas');

  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();

  const onSignInPress = async () => {
    if (!isLoaded) return;
    try {
      const completeSignIn = await signIn.create({
        identifier: '124578shar@gmail.com',
        password: 'Sas12345Sas'
      });
      await completeSignIn.createdSessionId;

      router.push('/');
    } catch (err: any) {
      alert(err.errors?.[0]?.message);
      console.log('Error signing in', JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Login</Text>
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
      <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded" onPress={onSignInPress}>
        <Text className="text-white">Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity className="mt-4" onPress={() => router.push('/signup')}>
        <Text className="text-blue-500">Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
