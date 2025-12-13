import React from 'react';
import styles from './styles.module.css';

export default function Feedback(): JSX.Element {
  const [feedback, setFeedback] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the feedback to a server
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
  };

  return (
    <div className={styles.feedbackContainer}>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            className={styles.feedbackTextarea}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback..."
            required
          />
          <button type="submit" className={styles.submitButton}>
            Submit Feedback
          </button>
        </form>
      )}
    </div>
  );
}