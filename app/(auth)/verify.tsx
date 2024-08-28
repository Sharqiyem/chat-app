import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Verify() {
  const { signUp, isLoaded } = useSignUp();
  const router = useRouter();
  const [code, setCode] = useState('');

  const onVerifyPress = async () => {
    if (!isLoaded) return;
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      });
      await completeSignUp.createdSessionId;
      router.push('/');
    } catch (err: any) {
      console.error('Error verifying email', err);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-2xl mb-4">Verify Email</Text>
      <TextInput
        className="border border-gray-300 rounded px-4 py-2 mb-4 w-64"
        value={code}
        onChangeText={setCode}
        placeholder="Enter verification code"
      />
      <TouchableOpacity className="bg-blue-500 py-2 px-4 rounded" onPress={onVerifyPress}>
        <Text className="text-white">Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
}
