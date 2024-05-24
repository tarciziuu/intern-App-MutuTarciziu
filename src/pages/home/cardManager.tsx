import { useState } from 'react';
import styles from './home.module.scss';

const CardManager = () => {
  // State for managing cards
  const [cards, setCards] = useState<{ title: string; description: string }[]>(
    [],
  );
  // State for new card input fields
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  // State for managing errors
  const [error, setError] = useState('');
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');

  // Function to add a new card
  const handleAddCard = () => {
    if (newCardTitle.trim() === '' || newCardDescription.trim() === '') {
      setError('Title and description must be filled');
      return;
    }
    setCards([
      ...cards,
      { title: newCardTitle, description: newCardDescription },
    ]);
    setError('');
    setNewCardTitle('');
    setNewCardDescription('');
  };

  // Function to start editing a card
  const handleUpdateClick = (index: number) => {
    setEditIndex(index);
    setUpdatedTitle(cards[index].title);
    setUpdatedDescription(cards[index].description);
    setIsEditing(true);
  };

  // Function to finish editing a card
  const handleFinishEdit = () => {
    if (editIndex !== null) {
      if (updatedTitle.trim() === '' || updatedDescription.trim() === '') {
        setError('Title and description must be filled when updating a card.');
        return;
      }
      const updatedCards = [...cards];
      updatedCards[editIndex] = {
        title: updatedTitle,
        description: updatedDescription,
      };
      setCards(updatedCards);
    }
    setIsEditing(false);
    setEditIndex(null);
    setError('');
  };

  // Function to cancel editing a card
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditIndex(null);
    setError('');
  };

  // Function to delete a card
  const handleDeleteCard = (index: number) => {
    const updatedCards = cards.filter((_, i) => i !== index);
    setCards(updatedCards);
  };

  return (
    <div className={styles.cardManager}>
      <h2>Add new card</h2>
      {error && <div className={styles.error}>{error}</div>}
      <input
        className={styles.inputField}
        type="text"
        placeholder="Title"
        value={newCardTitle}
        onChange={e => setNewCardTitle(e.target.value)}
      />
      <textarea
        className={styles.textareaField}
        placeholder="Description"
        value={newCardDescription}
        onChange={e => setNewCardDescription(e.target.value)}
      ></textarea>
      <button className={styles.addButton} onClick={handleAddCard}>
        Add card
      </button>

      <h2>Your cards:</h2>
      {cards.length === 0 && <div>There isn't any card to display yet.</div>}
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          {isEditing && editIndex === index ? (
            <>
              <input
                className={styles.inputField}
                type="text"
                value={updatedTitle}
                onChange={e => setUpdatedTitle(e.target.value)}
              />
              <textarea
                className={styles.textareaField}
                value={updatedDescription}
                onChange={e => setUpdatedDescription(e.target.value)}
              ></textarea>
              <button
                className={styles.updateButton}
                onClick={handleFinishEdit}
              >
                Finish
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
              <button
                className={styles.updateButton}
                onClick={() => handleUpdateClick(index)}
              >
                Update
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteCard(index)}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default CardManager;
