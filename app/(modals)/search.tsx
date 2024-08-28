import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { useColorScheme } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { supabase } from '@/lib/supabase';

interface User {
  id: string;
  username: string;
  email: string;
}

const SearchScreen = () => {
  const { colorScheme } = useColorScheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  const searchUsers = async (query: string) => {
    if (query.length < 3) {
      setUsers([]);
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .select('id, username, email')
      .or(`username.ilike.%${query}%,email.ilike.%${query}%`)
      .limit(10);

    if (error) {
      console.error('Error searching users:', error);
    } else {
      setUsers(data || []);
    }
  };

  return (
    <View className={`flex-1 p-4 pt-20 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-10 left-4 bg-blue-500 rounded-full p-3"
      >
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <TextInput
        className="border border-gray-300 rounded-md p-2 mb-4 mt-10"
        placeholder="Search users by username or email"
        value={searchQuery}
        onChangeText={(text) => {
          setSearchQuery(text);
          searchUsers(text);
        }}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-3 mb-2 rounded-md">
            <Text className="font-bold">{item.username}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default SearchScreen;
