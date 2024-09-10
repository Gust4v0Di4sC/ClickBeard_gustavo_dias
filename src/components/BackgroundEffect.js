import { useState, useEffect } from 'react';

const BackgroundEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Função para manipular o movimento do mouse
    const handleMouseMove = (e) => {
      const xPos = (e.clientX / window.innerWidth) - 0.5;
      const yPos = (e.clientY / window.innerHeight) - 0.5;

      const maxMovement = 10;
      setPosition({
        x: xPos * maxMovement, // Ajusta a intensidade horizontal
        y: yPos * maxMovement  // Ajusta a intensidade vertical
      });
    };

    // Adiciona o listener de movimento do mouse
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      // Remove o listener quando o componente for desmontado
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Aplica o movimento ao background do body
    document.body.style.backgroundPosition = `${position.x}px ${position.y}px`;
  }, [position]);

  return null; // Não precisa renderizar nada, pois só estamos aplicando o efeito no body
};

export default BackgroundEffect;
