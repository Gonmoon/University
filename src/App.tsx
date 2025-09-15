import React, { useState } from 'react';
import Modal from '@shared/components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Открыть модальное окно
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Пример модального окна"
      >
        <p>Содержимое модального окна!</p>
        <button onClick={() => setIsModalOpen(false)}>
          Закрыть
        </button>
      </Modal>
    </div>
  );
}

export default App;