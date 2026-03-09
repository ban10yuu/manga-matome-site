'use client';

import { useState, useEffect } from 'react';

interface Comment {
  id: string;
  name: string;
  content: string;
  createdAt: string;
}

function getComments(articleSlug: string): Comment[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(`comments_${articleSlug}`);
  return stored ? JSON.parse(stored) : [];
}

function saveComment(articleSlug: string, comment: Comment) {
  const comments = getComments(articleSlug);
  comments.push(comment);
  localStorage.setItem(`comments_${articleSlug}`, JSON.stringify(comments));
}

export default function CommentSection({ articleSlug }: { articleSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setComments(getComments(articleSlug));
  }, [articleSlug]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    const comment: Comment = {
      id: Date.now().toString(),
      name: name.trim() || '匿名',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    saveComment(articleSlug, comment);
    setComments(prev => [...prev, comment]);
    setContent('');
    setIsSubmitting(false);
  };

  if (!mounted) {
    return (
      <div className="mt-12 pt-8 border-t border-[#2a2a3a]">
        <h2 className="text-lg font-black text-white mb-6">◆ コメント</h2>
        <p className="text-gray-600 text-sm">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 pt-8 border-t border-[#2a2a3a]">
      <h2 className="text-lg font-black text-white mb-6 flex items-center gap-2">
        ◆ コメント
        {comments.length > 0 && (
          <span className="text-sm font-normal text-gray-600">({comments.length}件)</span>
        )}
      </h2>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-8 bg-[#1e1e2a] rounded p-5 border border-[#2a2a3a]">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-bold text-gray-400 mb-1">
            ニックネーム（任意）
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="匿名"
            className="w-full max-w-xs bg-[#16161f] border border-[#2a2a3a] rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#ff3a4f] transition-colors"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-bold text-gray-400 mb-1">
            コメント
          </label>
          <textarea
            id="comment"
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="この考察についてあなたの意見を書いてみてください..."
            rows={4}
            className="w-full bg-[#16161f] border border-[#2a2a3a] rounded px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-[#ff3a4f] resize-none transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="bg-[#ff3a4f] text-white px-6 py-2 rounded text-sm font-black hover:bg-[#e52e42] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '送信中...' : 'コメントを投稿'}
        </button>
      </form>

      {/* Comment List */}
      {comments.length === 0 ? (
        <p className="text-center text-gray-600 text-sm py-8">
          まだコメントはありません。最初のコメントを投稿してみませんか？
        </p>
      ) : (
        <div className="space-y-3">
          {comments.map(comment => (
            <div key={comment.id} className="bg-[#16161f] rounded p-4 border border-[#2a2a3a]">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-7 h-7 rounded bg-[#ff3a4f] flex items-center justify-center text-white text-xs font-black">
                  {comment.name.charAt(0)}
                </span>
                <span className="text-sm font-bold text-gray-300">{comment.name}</span>
                <time className="text-[10px] text-gray-600 ml-auto">
                  {new Date(comment.createdAt).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </time>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
