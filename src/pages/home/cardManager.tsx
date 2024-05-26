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
  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

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
    setSuccessMessage('Card added successfully!');
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
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
    <div className={styles.card__manager}>
      <h2>Add new card</h2>
      {error && <div className={styles.error__message}>{error}</div>}
      {successMessage && (
        <div className={styles.success__message}>{successMessage}</div>
      )}
      <input
        className={styles.input__field}
        type="text"
        placeholder="Title"
        value={newCardTitle}
        onChange={e => setNewCardTitle(e.target.value)}
      />
      <textarea
        className={styles.textarea__field}
        placeholder="Description"
        value={newCardDescription}
        onChange={e => setNewCardDescription(e.target.value)}
      ></textarea>
      <button className={styles.add__button} onClick={handleAddCard}>
        Add card
      </button>

      <h2>Your cards:</h2>
      {cards.length === 0 && <div>There isn't any card to display yet.</div>}
      {cards.map((card, index) => (
        <div key={index} className={styles.card}>
          {isEditing && editIndex === index ? (
            <div className={styles.popup__overlay}>
              <div className={styles.popup}>
                <h3>Edit Card</h3>
                {error && <div className={styles.error}>{error}</div>}
                <input
                  className={styles.input__field}
                  type="text"
                  value={updatedTitle}
                  onChange={e => setUpdatedTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className={styles.textarea__field}
                  value={updatedDescription}
                  onChange={e => setUpdatedDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
                <button
                  className={styles.done__button}
                  onClick={handleFinishEdit}
                >
                  Done
                </button>
                <button
                  className={styles.cancel__button}
                  onClick={handleCancelEdit}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={styles.card__title}>{card.title}</h3>
              <p className={styles.card__description}>{card.description}</p>
              <button
                className={styles.update__button}
                onClick={() => handleUpdateClick(index)}
              >
                Update
              </button>
              <button
                className={styles.delete__button}
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
