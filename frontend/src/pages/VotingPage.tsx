import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import ReactPlayer from "react-player";
import { withAuthLogin } from '../hoc/withAuthLogin';
import { useTranslation } from 'react-i18next';
import { getVideos, updateVideoVotes } from '../services/videos';
import LanguageSwitcher from '../components/SwitchLanguage';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleLanguage } from '../store/slices/languageSlice';

// Tipos de votos
interface VideoVote {
  id: string;
  title: string;
  votes: number;
  url: string;
}

const VotingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((state: any) => state.language.language);

  const [videos, setVideos] = useState<VideoVote[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar vídeos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (err) {
        setError(t('error_loading_videos') || 'Error loading videos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [t]);

  // Atualizar votos
  const handleVote = async (videoId: string) => {
    try {
      const videoIndex = videos.findIndex((video) => video.id === videoId);
      if (videoIndex >= 0) {
        const newVideos = [...videos];
        newVideos[videoIndex].votes += 1;
        setVideos(newVideos);

        await updateVideoVotes(videoId, newVideos[videoIndex].votes);
      }
    } catch (err) {
      setError(t('error_voting') || 'Error voting.');
    }
  };

  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
    i18n.changeLanguage(language === "en" ? "pt" : "en");
  };

  // Ordenação dos videos
  const sortedVideos = [...videos].sort((a, b) => b.votes - a.votes);

  if (loading) return <div>{t('loading')}...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-5">
      <LanguageSwitcher toggleLanguage={handleToggleLanguage} />
      <h2>{t('vote_for_video')}</h2>
      <Row className="mb-4">
        {videos.map((video) => (
          <Col key={video.id} sm={12} md={6} className="mb-3">
            <Card>
              <Card.Body>
                <Card.Title>{video.title}</Card.Title>
                <ReactPlayer
                  url={video.url}
                  controls
                  width="100%"
                  height="auto"
                  style={{ marginBottom: "15px" }}
                />
                <Button variant="primary" onClick={() => handleVote(video.id)}>
                  {t('vote')}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <h3>{t('video_ranking')}</h3>
      <ListGroup>
        {sortedVideos.map((video, index) => (
          <ListGroup.Item key={video.id}>
            <span>
              {index + 1}. {video.title}
            </span>{' '}
            - <strong>{video.votes} {t('votes')}</strong>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default withAuthLogin(VotingPage);
