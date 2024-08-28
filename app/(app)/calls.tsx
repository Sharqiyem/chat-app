import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useColorScheme } from 'nativewind';

const CallItem = ({ item }) => {
  const { colorScheme } = useColorScheme();
  return (
    <View
      className={`p-4 border-b ${colorScheme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}
    >
      <Text
        className={`text-lg font-semibold ${colorScheme === 'dark' ? 'text-white' : 'text-black'}`}
      >
        {item.name}
      </Text>
      <Text className={`text-sm ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {item.time}
      </Text>
    </View>
  );
};

const CallsScreen = () => {
  const { colorScheme } = useColorScheme();

  const calls = [
    { id: '1', name: 'John Doe', time: 'Yesterday, 2:30 PM' },
    { id: '2', name: 'Jane Smith', time: 'Today, 10:00 AM' }
    // Add more call items as needed
  ];

  return (
    <View className={`flex-1 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <FlatList
        data={calls}
        renderItem={({ item }) => <CallItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default CallsScreen;
