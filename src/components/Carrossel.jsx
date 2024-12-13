import React from 'react';
import { Carousel as BootstrapCarousel } from 'react-bootstrap';

const Carrossel = ({ animes, onImageClick }) => {
  return (
    <BootstrapCarousel>
      {animes.map((anime, index) => (
        <BootstrapCarousel.Item key={index}>
          <div className="d-flex justify-content-center">
            {/* Primeira imagem do par */}
            <div
              className="position-relative w-50"
              onClick={() => onImageClick(index)}
            >
              <img
                className="d-block w-100"
                src={anime.imagem_url} // Certificando-se de que imagem_url contém base64 ou URL válida
                alt={`Imagem ${index + 1}`}
                style={{ height: '400px', objectFit: 'cover' }}
              />
              <BootstrapCarousel.Caption>
                <p>{anime.titulo}</p>
              </BootstrapCarousel.Caption>
            </div>

            {/* Segunda imagem do par (se existir) */}
            {animes[index + 1] && (
              <div
                className="position-relative w-50"
                onClick={() => onImageClick(index + 1)}
              >
                <img
                  className="d-block w-100"
                  src={animes[index + 1].imagem_url} // Certificando-se de que imagem_url contém base64 ou URL válida
                  alt={`Imagem ${index + 2}`}
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                <BootstrapCarousel.Caption>
                  <p>{animes[index + 1].titulo}</p>
                </BootstrapCarousel.Caption>
              </div>
            )}
          </div>
        </BootstrapCarousel.Item>
      ))}
    </BootstrapCarousel>
  );
};

export default Carrossel;
