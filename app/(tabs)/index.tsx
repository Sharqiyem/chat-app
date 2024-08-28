import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

export default function HomeScreen() {
console.log("🚀 ~ SUPABASE_URL, SUPABASE_ANON_KEY:", SUPABASE_URL, SUPABASE_ANON_KEY)

  return (
   <View className='flex-1 justify-center items-center'>
    <Text className="text-3xl font-bold text-primary">Hello</Text>
   </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
