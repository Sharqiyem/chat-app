import { supabase } from '@/lib/supabase';
import React, { useState, useEffect } from 'react';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';

interface ChatProps {
  senderId: string;
  recipientId: string;
}

const ChatScreen: React.FC<ChatProps> = ({ senderId, recipientId }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const { data: chatMessages } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false })
        .match({
          sender_id: { in: [senderId, recipientId] },
          recipient_id: { in: [senderId, recipientId] }
        });

      if (!chatMessages) return;

      const typedMessages: IMessage[] = chatMessages.map((message) => {
        return {
          _id: message.id,
          text: message.text,
          createdAt: new Date(message.created_at),
          user: {
            _id: message.sender_id
          }
        };
      });
      setMessages(typedMessages);
    };

    fetchMessages();

    // const channel = supabase
    //   .from('messages')
    //   .on('*', (payload) => {
    //     if (payload.new) {
    //       const newMessage = payload.new;
    //       setMessages((prevMessages) => [newMessage, ...prevMessages]);
    //     }
    //   })
    //   .subscribe();

    // return () => {
    //   channel.unsubscribe();
    // };
  }, [senderId, recipientId, supabase]);

  const onSend = (newMessages: IMessage[]) => {
    const message = newMessages[0];
    supabase
      .from('messages')
      .insert([
        {
          sender_id: senderId,
          recipient_id: recipientId,
          text: message.text,
          created_at: new Date()
        }
      ])
      .then((res) => {
        console.log('Message sent successfully:', res);
      });
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={onSend}
      user={{
        _id: senderId
      }}
    />
  );
};

export default ChatScreen;
