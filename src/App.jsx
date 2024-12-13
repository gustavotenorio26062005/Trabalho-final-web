import React, { useEffect, useState } from 'react';
import animesData from './animes.json';  // Importa o JSON
import 'bootstrap/dist/css/bootstrap.min.css'; // Importação do Bootstrap
import Header from './components/Header';
import Carrossel from './components/Carrossel';
import SeçãoDeComentários from './components/SeçãoDeComentários';
import SeçãoCRUD from './components/SeçãoCRUD';

const App = () => {
  const [animes, setAnimes] = useState([]);
  const [comentários, setComentários] = useState([]);
  const [comentáriosExibidos, setComentáriosExibidos] = useState([]);
  const [animeSelecionado, setAnimeSelecionado] = useState(null);
  const [novoAnime, setNovoAnime] = useState({ nome: '', descrição: '', imagemUrl: '' });
  const [animeId, setAnimeId] = useState('');
  const [novoComentário, setNovoComentário] = useState('');
  const [fotoDePerfil, setFotoDePerfil] = useState('');
  const [offsetComentário, setOffsetComentário] = useState(0);

  useEffect(() => {
    // Configura os animes com os dados importados do JSON
    setAnimes(animesData);

    // Adicione aqui chamadas assíncronas para buscar dados reais, se necessário
  }, []);

  const handleCreateAnime = async () => {
    // Função para criar novo anime
    setAnimes([...animes, novoAnime]);
    // Recarrega os animes
  };

  const handleGetAnime = async () => {
    const animeData = animes.find(anime => anime.id === animeId);
    if (animeData) {
      setAnimeSelecionado(animeData);
    } else {
      console.log("Anime não encontrado");
    }
  };

  const handleUpdateAnime = async () => {
    const updatedAnimes = animes.map(anime =>
      anime.id === animeId ? { ...anime, ...novoAnime } : anime
    );
    setAnimes(updatedAnimes); // Recarrega os animes
    setAnimeSelecionado({ ...animeSelecionado, ...novoAnime });
  };

  const handleDeleteAnime = async () => {
    const filteredAnimes = animes.filter(anime => anime.id !== animeId);
    setAnimes(filteredAnimes); // Recarrega os animes
    if (animeSelecionado?.id === animeId) {
      setAnimeSelecionado(null);
    }
  };

  const handleCreateComment = async () => {
    const defaultProfilePic = "https://tm.ibxk.com.br/2022/11/16/16132745594498.jfif";
    const newComment = { profilePic: fotoDePerfil || defaultProfilePic, comment: novoComentário };
    setComentários([...comentários, newComment]);
    setComentáriosExibidos([...comentários, newComment].slice(0, 3)); // Recarrega os comentários
    setNovoComentário(''); // Limpa o campo de comentário
    setFotoDePerfil(''); // Limpa o campo de URL da imagem do perfil
    setOffsetComentário(0); // Reseta o offset dos comentários
  };

  const handleShowMoreComments = () => {
    const newOffset = offsetComentário + 3;
    const newComments = comentários.slice(newOffset, newOffset + 3);
    setComentáriosExibidos(newComments);
    setOffsetComentário(newOffset);
  };

  const handleAnimeClick = async (id) => {
    const animeData = animes.find(anime => anime.id === id);
    setAnimeSelecionado(animeData);
    setAnimeId(id);
  };

  const handleLike = async () => {
    if (!animeSelecionado) return;
    const updatedAnime = { ...animeSelecionado, likes: (animeSelecionado.likes || 0) + 1 };
    const updatedAnimes = animes.map(anime =>
      anime.id === animeSelecionado.id ? updatedAnime : anime
    );
    setAnimes(updatedAnimes); // Atualiza os dados do anime
    setAnimeSelecionado(updatedAnime);
  };

  const handleDislike = async () => {
    if (!animeSelecionado) return;
    const updatedAnime = { ...animeSelecionado, dislikes: (animeSelecionado.dislikes || 0) + 1 };
    const updatedAnimes = animes.map(anime =>
      anime.id === animeSelecionado.id ? updatedAnime : anime
    );
    setAnimes(updatedAnimes); // Atualiza os dados do anime
    setAnimeSelecionado(updatedAnime);
  };

  return (
    <div>
      <Header animeSelecionado={animeSelecionado} />
      <div id='carrossel'>
        <Carrossel animes={animes} onImageClick={handleAnimeClick} />
      </div>
      <SeçãoDeComentários
        comentáriosExibidos={comentáriosExibidos}
        handleShowMoreComments={handleShowMoreComments}
        handleCreateComment={handleCreateComment}
        novoComentário={novoComentário}
        setNovoComentário={setNovoComentário}
        fotoDePerfil={fotoDePerfil}
        setFotoDePerfil={setFotoDePerfil}
        handleLike={handleLike}
        handleDislike={handleDislike}
        offsetComentário={offsetComentário}
        comentários={comentários}
      />
      <SeçãoCRUD
        animeId={animeId}
        setAnimeId={setAnimeId}
        novoAnime={novoAnime}
        setNovoAnime={setNovoAnime}
        handleCreateAnime={handleCreateAnime}
        handleGetAnime={handleGetAnime}
        handleUpdateAnime={handleUpdateAnime}
        handleDeleteAnime={handleDeleteAnime}
      />
    </div>
  );
};

export default App;