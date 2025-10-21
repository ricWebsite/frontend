/**
 * ReviewCard Component - Molecular component for Nozah
 * Card component for displaying individual reviews/testimonials
 */

import React from 'react';
import { COLORS } from '../../shared/const';

export interface ReviewData {
  id: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  avatar?: string;
}

interface ReviewCardProps {
  review: ReviewData;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onDelete,
  isAdmin = false,
}) => {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        style={{
          color: i < rating ? COLORS.PRIMARY : COLORS.LIGHT_GRAY,
          fontSize: '1.25rem',
        }}
      >
        ★
      </span>
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div
      className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      style={{
        backgroundColor: COLORS.WHITE,
        border: `1px solid ${COLORS.BORDER}`,
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.avatar && (
            <img
              src={review.avatar}
              alt={review.author}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h4
              className="font-semibold text-lg"
              style={{ color: COLORS.BLACK }}
            >
              {review.author}
            </h4>
            <p
              className="text-sm"
              style={{ color: COLORS.MEDIUM_GRAY }}
            >
              {formatDate(review.date)}
            </p>
          </div>
        </div>

        {isAdmin && onDelete && (
          <button
            onClick={() => onDelete(review.id)}
            className="text-sm font-semibold px-3 py-1 rounded transition-colors"
            style={{
              backgroundColor: COLORS.ERROR,
              color: COLORS.WHITE,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
            }}
          >
            Delete
          </button>
        )}
      </div>

      <div className="flex gap-1 mb-3">{renderStars(review.rating)}</div>

      <p
        className="text-base leading-relaxed"
        style={{ color: COLORS.BLACK }}
      >
        {review.content}
      </p>
    </div>
  );
};

export default ReviewCard;

