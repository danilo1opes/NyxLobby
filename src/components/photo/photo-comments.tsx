'use client';

import React from 'react';
import { Comment } from '@/types/actions';
import PhotoCommentsForm from './photo-comments-form';
import styles from './photo-comments.module.css';

interface PhotoCommentsProps {
  single: boolean;
  id: string;
  comments: Comment[];
}

const PhotoComments: React.FC<PhotoCommentsProps> = ({
  single,
  id,
  comments,
}) => {
  const [commentsList, setCommentsList] = React.useState<Comment[]>(
    comments || [],
  );

  const [isLoading] = React.useState(false);

  React.useEffect(() => {
    setCommentsList(comments || []);
  }, [comments]);

  if (!single && comments.length > 0) {
    return (
      <div className={styles.commentsPreview}>
        <span className={styles.commentsCount}>
          {comments.length} comentário{comments.length !== 1 ? 's' : ''}
        </span>
      </div>
    );
  }

  if (!single) {
    return null;
  }

  const handleCommentAdded = (newComment: Comment) => {
    setCommentsList((prev) => [newComment, ...prev]);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 60 * 60),
      );

      if (diffInHours < 1) {
        return 'Agora mesmo';
      } else if (diffInHours < 24) {
        return `${diffInHours}h atrás`;
      } else if (diffInHours < 168) {
        // menos de 7 dias
        const days = Math.floor(diffInHours / 24);
        return `${days}d atrás`;
      } else {
        return date.toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });
      }
    } catch {
      return '';
    }
  };

  return (
    <div className={styles.comments}>
      <div className={styles.commentsHeader}>
        <h3>
          Comentários ({commentsList.length})
          {isLoading && <span className={styles.loading}>...</span>}
        </h3>
      </div>

      <PhotoCommentsForm photoId={id} onCommentAdded={handleCommentAdded} />

      <div className={styles.commentsList}>
        {commentsList.length > 0 ? (
          commentsList.map((comment, index) => (
            <div
              key={comment.comment_ID || `comment-${index}`}
              className={styles.comment}
            >
              <div className={styles.commentHeader}>
                <strong className={styles.commentAuthor}>
                  @{comment.comment_author}
                </strong>
                {comment.comment_date && (
                  <span className={styles.commentDate}>
                    {formatDate(comment.comment_date)}
                  </span>
                )}
              </div>
              <p className={styles.commentContent}>{comment.comment_content}</p>
            </div>
          ))
        ) : (
          <div className={styles.noComments}>
            <p>Nenhum comentário ainda.</p>
            <span>Seja o primeiro a comentar!</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoComments;
