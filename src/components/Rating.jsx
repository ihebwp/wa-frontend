import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Rating = ({ initialRating, maxRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    if (onRatingChange) {
      onRatingChange(newRating);
    }
  };

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleRatingChange(index + 1)}
          style={{
            cursor: 'pointer',
            color: index < rating ? 'gold' : 'gray',
          }}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

Rating.propTypes = {
  initialRating: PropTypes.number.isRequired,
  maxRating: PropTypes.number.isRequired,
  onRatingChange: PropTypes.func,
};

export default Rating;
