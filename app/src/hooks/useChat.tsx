import {useCallback} from 'react';
import api from '../app/api';

const useChat = () => {
  /**
   * I used the @seCallback hook to @memoize the
   * getConversationsList function.
   */
  const getConversationsList = useCallback(async () => {
    try {
      const result = await api.get('/chat/conversations');
      if (result.data.success) {
        return result.data;
      }
    } catch (error) {
      return error;
    }
  }, []);

  const getConversationById = useCallback(async (id: string) => {
    try {
      const result = await api.post('/chat/conversations', {id});
      if (result.data.success) {
        return result.data;
      }
    } catch (error) {
      return error;
    }
  }, []);

  const deleteConversation = async (id: string) => {
    try {
      const result = await api.delete('/chat/conversations', {params: {id}});
      if (result.data.success) {
        return result.data;
      }
    } catch (error) {
      return error;
    }
  };

  const clearAllChat = async () => {
    try {
      const result = await api.delete('/chat/conversations');
      if (result.data.success) {
        return result.data;
      }
    } catch (error) {
      return error;
    }
  };

  return {
    getConversationsList,
    deleteConversation,
    getConversationById,
    clearAllChat,
  };
};

export default useChat;
