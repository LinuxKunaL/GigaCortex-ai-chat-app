import api from '../app/api';

const useChat = () => {
  const getConversationsList = async () => {
    const result = await api.get('/chat/conversations-list');
    if (result.data.success) {
      return result.data;
    }
    return null;
  };
  return {getConversationsList};
};

export default useChat;
