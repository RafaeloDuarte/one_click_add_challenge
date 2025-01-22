import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Busca todos os vídeos
export const getVideos = async () => {
  const response = await axios.get(`${API_BASE_URL}/videos/`);
  return response.data;
};

// Atualiza os votos de um vídeo
export const updateVideoVotes = async (videoId: string, votes: number) => {
  await axios.put(`${API_BASE_URL}/videos/${videoId}`, { id: videoId, votes });
};
