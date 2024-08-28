import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { supabase } from '@/lib/supabase';

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
}

const ChatItem: React.FC<{ item: ChatItem }> = ({ item }) => {
  const { colorScheme } = useColorScheme();
  return (
    <TouchableOpacity
      className={`p-4 border-b ${colorScheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <Text
        className={`text-lg font-semibold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        {item.name}
      </Text>
      <Text className={`text-sm ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {item.lastMessage}
      </Text>
    </TouchableOpacity>
  );
};

export default function ChatsScreen() {
  const { colorScheme } = useColorScheme();
  const [chats, setChats] = useState<ChatItem[]>([]);

  useEffect(() => {
    fetchChats();
  }, []);

  async function fetchChats() {
    try {
      const { data, error } = await supabase.from('chats').select('*');
      if (error) console.error('Error fetching chats:', error);
      else setChats(data);
    } catch (error) {}
  }

  return (
    <View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <FlatList
        data={chats}
        renderItem={({ item }) => <ChatItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <Link href="/(modals)/search" asChild>
        <TouchableOpacity className="absolute bottom-4 right-4 bg-blue-500 rounded-full p-3">
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}
