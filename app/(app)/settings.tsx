import React from 'react';
import { View, Text, TouchableOpacity, Switch, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <View className={`flex-1 p-4 ${colorScheme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ProfileEdit')}
        className="flex-row items-center mb-6"
      >
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          className="w-20 h-20 rounded-full mr-4"
        />
        <View>
          <Text
            className={`text-xl font-semibold ${
              colorScheme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            John Doe
          </Text>
          <Text className={`text-sm ${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            @johndoe
          </Text>
        </View>
      </TouchableOpacity>

      <View className="mb-4">
        <Text
          className={`text-lg font-semibold mb-2 ${
            colorScheme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Theme
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className={`${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Dark Mode
          </Text>
          <Switch value={colorScheme === 'dark'} onValueChange={toggleColorScheme} />
        </View>
      </View>

      <View>
        <Text
          className={`text-lg font-semibold mb-2 ${
            colorScheme === 'dark' ? 'text-white' : 'text-black'
          }`}
        >
          Notifications
        </Text>
        <View className="flex-row justify-between items-center">
          <Text className={`${colorScheme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            Enable Notifications
          </Text>
          <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} />
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
