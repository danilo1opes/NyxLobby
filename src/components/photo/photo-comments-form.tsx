'use client';

import React from 'react';
import { useUser } from '@/context/user-context';
import commentPost from '@/actions/comment-post';
import styles from './photo-comments-form.module.css';
import { Comment } from '@/types/actions';
import { ActionResult, CommentResponse } from '@/types/actions';

interface PhotoCommentsFormProps {
  photoId: string;
  onCommentAdded: (comment: Comment) => void;
}

const PhotoCommentsForm: React.FC<PhotoCommentsFormProps> = ({
  photoId,
  onCommentAdded,
}) => {
  const { user } = useUser();
  const [comment, setComment] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('Por favor, digite um comentário');
      return;
    }

    if (!user || !user.username) {
      setError('Você precisa estar logado para comentar');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result: ActionResult<CommentResponse> = await commentPost(
        photoId,
        comment.trim(),
      );

      if (!result.success) {
        throw new Error(result.error);
      }

      if (result.data) {
        const newComment: Comment = {
          comment_ID: result.data.comment?._id || Date.now().toString(),
          comment_post_ID: photoId,
          comment_author: user.username,
          comment_content: comment.trim(),
          comment_date: new Date().toISOString(),
        };

        onCommentAdded(newComment);

        setComment('');
      }
    } catch (err) {
      console.error('Erro ao enviar comentário:', err);
      setError(
        err instanceof Error ? err.message : 'Erro ao enviar comentário',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
    if (error) setError('');
  };

  if (!user) {
    return (
      <div className={styles.loginPrompt}>
        <p>
          Você precisa estar <a href="/login">logado</a> para comentar.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={styles.commentForm}>
      <div className={styles.formHeader}>
        <div className={styles.userInfo}>
          <span className={styles.username}>@{user.username}</span>
        </div>
      </div>

      <div className={styles.textareaContainer}>
        <textarea
          value={comment}
          onChange={handleTextareaChange}
          placeholder="Adicione um comentário..."
          className={styles.commentTextarea}
          rows={4}
          maxLength={500}
          disabled={loading}
        />
        <div className={styles.characterCount}>{comment.length}/500</div>
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.formActions}>
        <button
          type="button"
          onClick={() => {
            setComment('');
            setError('');
          }}
          className={styles.cancelButton}
          disabled={loading || !comment.trim()}
        >
          Limpar
        </button>
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className={styles.submitButton}
        >
          {loading ? 'Enviando...' : 'Comentar'}
        </button>
      </div>
    </form>
  );
};

export default PhotoCommentsForm;
