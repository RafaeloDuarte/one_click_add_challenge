import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import VotingPage from '../../pages/VotingPage';
import { getVideos } from '../../services/videos';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { AuthContext } from '../../context/AuthContext';

// Mock de funções
vi.mock('../../services/videos', () => ({
  getVideos: vi.fn(),
  updateVideoVotes: vi.fn(),
}));

const mockVideos = [
  { id: '1', title: 'Video 1', votes: 10, url: 'http://example.com/video1' },
  { id: '2', title: 'Video 2', votes: 5, url: 'http://example.com/video2' },
];

vi.mock('../hoc/withAuthLogin', () => ({
  withAuthLogin: (component: JSX.Element) => component, // Retorna o componente sem modificações para os testes
}));

vi.mock('react-player', () => {
  return {
    __esModule: true, // Indicando que a importação será do tipo módulo
    default: vi.fn(() => <div>Mocked ReactPlayer</div>), // Retorna um div simples como substituto
  };
});

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // Para os testes, basta retornar a chave
    i18n: { changeLanguage: vi.fn() },
  }),
}));

const mockAuthContextValue = {
  isAuthenticated: true,
  user: { id: '123', name: 'Test User' },
  login: vi.fn(),
  logout: vi.fn(),
};

describe('VotingPage', () => {
  const renderComponent = () =>
    render(
      <AuthContext.Provider value={mockAuthContextValue}>
        <Provider store={store}>
          <BrowserRouter>
            <VotingPage />
          </BrowserRouter>
        </Provider>
      </AuthContext.Provider>
    );

  afterEach(() => {
    vi.clearAllMocks();
    vi.mocked(getVideos).mockResolvedValue(mockVideos);
  });

  it('should load and display videos', async () => {
    const mockVideos = [
      { id: '1', title: 'Video 1', votes: 5, url: 'http://example.com/video1' },
      { id: '2', title: 'Video 2', votes: 3, url: 'http://example.com/video2' },
    ];

    // Mockando a resposta da API
    (getVideos as Mock).mockResolvedValueOnce(mockVideos);

    renderComponent();

    // Espera a tela carregar os vídeos
    await waitFor(() => expect(screen.getByText('Video 1')).toBeInTheDocument());
    expect(screen.getByText('Video 2')).toBeInTheDocument();
  });

  it('should handle language toggle', async () => {
    const mockVideos = [
      { id: '1', title: 'Video 1', votes: 5, url: 'http://example.com/video1' },
    ];

    // Mockando a resposta da API
    (getVideos as Mock).mockResolvedValueOnce(mockVideos);

    renderComponent();
    await waitFor(() => {
      const toggleButton = screen.getByText('English');
      fireEvent.click(toggleButton);
    });

    // Espera que o idioma mude
    await waitFor(() => {
      expect(screen.getByText('voting.vote_for_video')).toBeInTheDocument();
    });
  });

  it('should display error when loading videos fails', async () => {
    (getVideos as Mock).mockRejectedValueOnce(new Error('Error loading videos'));

    renderComponent();

    await waitFor(() => {
      expect(screen.getByText('voting.error_loading_videos')).toBeInTheDocument()
    });
  });
});
