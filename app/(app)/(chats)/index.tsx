import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { supabase } from '@/lib/supabase';

interface ChatItem {
  id: string;
  senderId: string;
  lastMessage: string;
}

const ChatItem: React.FC<{ item: ChatItem }> = ({ item }) => {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const fetchChats = async () => {
      const { data: chatMessages } = await supabase
        .from('chats')
        .select('*')
        .order('created_at', { ascending: false });
      console.log('🚀 ~ fetchChats ~ chatMessages:', chatMessages);

      const groupedChats = chatMessages?.reduce((acc: Chat[], message) => {
        const existingChat = acc.find(
          (chat) => chat.senderId === message.sender_id && chat.recipientId === message.recipient_id
        );

        if (existingChat) {
          existingChat.lastMessage = message.text;
          existingChat.createdAt = message.created_at;
        } else {
          acc.push({
            senderId: message.sender_id,
            recipientId: message.recipient_id,
            lastMessage: message.text,
            createdAt: message.created_at
          });
        }

        return acc;
      }, []);

      if (groupedChats) setChats(groupedChats);
    };

    fetchChats();

    // const channel = supabase
    //   .from('messages')
    //   .on('*', (payload) => {
    //     if (payload.new) {
    //       const newMessage = payload.new;
    //       const existingChat = chats.find(
    //         (chat) =>
    //           chat.senderId === newMessage.sender_id && chat.recipientId === newMessage.recipient_id
    //       );

    //       if (existingChat) {
    //         existingChat.lastMessage = newMessage.text;
    //         existingChat.createdAt = newMessage.created_at;
    //       } else {
    //         chats.push({
    //           senderId: newMessage.sender_id,
    //           recipientId: newMessage.recipient_id,
    //           lastMessage: newMessage.text,
    //           createdAt: newMessage.created_at
    //         });
    //       }

    //       setChats([...chats]);
    //     }
    //   })
    //   .subscribe();

    // return () => {
    //   channel.unsubscribe();
    // };
  }, [supabase]);

  const handleChatPress = (chat: Chat) => {
    router.navigate({
      pathname: '/chat',
      params: {
        senderId: chat.senderId,
        recipientId: chat.recipientId
      }
    });
  };

  return (
    <FlatList
      data={chats}
      renderItem={({ item }) => (
        <Pressable onPress={() => handleChatPress(item)}>
          <Text>{item.lastMessage}</Text>
        </Pressable>
      )}
      keyExtractor={(item) => item.senderId + item.recipientId}
    />
  );
};

interface Chat {
  senderId: string;
  recipientId: string;
  lastMessage: string;
  createdAt: Date;
}
