import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Heart,
	MessageCircle,
	MoreHorizontal,
	ThumbsUp,
	X,
} from 'lucide-react';

const CommentsSection = () => {
	const currentUser = {
		id: 'user1',
		username: 'john_doe',
		avatar: '/api/placeholder/32/32',
	};

	const [comments, setComments] = useState([
		{
			id: 1,
			userId: 'user2',
			username: 'sarah_smith',
			avatar: '/api/placeholder/32/32',
			text: 'This is amazing! 🎉',
			likes: 24,
			isLiked: false,
			timestamp: '2h',
			replies: [
				{
					id: 101,
					userId: 'user3',
					username: 'mike_brown',
					avatar: '/api/placeholder/32/32',
					text: 'Totally agree!',
					likes: 5,
					isLiked: false,
					timestamp: '1h',
					replies: [],
				},
			],
		},
	]);

	const [newComment, setNewComment] = useState('');
	const [replyText, setReplyText] = useState('');
	const [replyingTo, setReplyingTo] = useState(null);

	const handleAddComment = () => {
		if (!newComment.trim()) return;

		const comment = {
			id: Date.now(),
			userId: currentUser.id,
			username: currentUser.username,
			avatar: currentUser.avatar,
			text: newComment.trim(),
			likes: 0,
			isLiked: false,
			timestamp: 'now',
			replies: [],
		};

		setComments(prevComments => [comment, ...prevComments]);
		setNewComment('');
	};

	const handleAddReply = parentId => {
		if (!replyText.trim()) return;

		const reply = {
			id: Date.now(),
			userId: currentUser.id,
			username: currentUser.username,
			avatar: currentUser.avatar,
			text: replyText.trim(),
			likes: 0,
			isLiked: false,
			timestamp: 'now',
			replies: [],
		};

		setComments(prevComments =>
			findAndAddReply(prevComments, parentId, reply)
		);
		setReplyText('');
		setReplyingTo(null);
	};

	const findAndAddReply = (commentsList, parentId, newReply) => {
		return commentsList.map(item => {
			if (item.id === parentId) {
				return {
					...item,
					replies: [...(item.replies || []), newReply],
				};
			}
			if (item.replies) {
				return {
					...item,
					replies: findAndAddReply(item.replies, parentId, newReply),
				};
			}
			return item;
		});
	};

	const toggleLike = commentId => {
		setComments(prevComments =>
			findAndToggleLike(prevComments, commentId)
		);
	};

	const findAndToggleLike = (commentsList, targetId) => {
		return commentsList.map(item => {
			if (item.id === targetId) {
				return {
					...item,
					isLiked: !item.isLiked,
					likes: item.isLiked ? item.likes - 1 : item.likes + 1,
				};
			}
			if (item.replies) {
				return {
					...item,
					replies: findAndToggleLike(item.replies, targetId),
				};
			}
			return item;
		});
	};

	const CommentItem = ({ comment, depth = 0 }) => {
		const inputRef = useRef(null);

		// Add this effect to maintain focus
		useEffect(() => {
			if (replyingTo === comment.id) {
				inputRef.current?.focus();
			}
		}, [replyingTo]);

		return (
			<div className={`flex gap-3 ${depth > 0 ? 'mt-3' : ''}`}>
				<img
					src={comment.avatar}
					alt={comment.username}
					className='w-8 h-8 rounded-full'
				/>
				<div className='flex-1'>
					<div className='flex items-start justify-between'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2'>
								<span className='font-medium text-sm '>
									{comment.username}
								</span>
								<span className='text-xs '>{comment.timestamp}</span>
							</div>
							<p className='text-sm text-gray-800 dark:text-gray-200'>
								{comment.text}
							</p>
							<div className='flex items-center gap-4 text-sm text-gray-500'>
								<button
									onClick={() => toggleLike(comment.id)}
									className={`flex items-center gap-1 hover:text-gray-700 ${
										comment.isLiked
											? 'text-red-500 hover:text-red-600'
											: ''
									}`}>
									<ThumbsUp
										className={`w-4 h-4 ${
											comment.isLiked ? 'fill-current' : ''
										}`}
									/>
									{comment.likes > 0 && <span>{comment.likes}</span>}
								</button>
								<button
									onClick={() =>
										setReplyingTo(
											replyingTo === comment.id ? null : comment.id
										)
									}
									className='flex items-center gap-1 hover:text-gray-700'>
									<MessageCircle className='w-4 h-4' />
									<span>Reply</span>
								</button>
							</div>
						</div>
					</div>

					{/* Reply Input */}
					{replyingTo === comment.id && (
						<div className='mt-3 flex items-center gap-3'>
							<img
								src={currentUser.avatar}
								alt={currentUser.username}
								className='w-8 h-8 rounded-full'
							/>
							<input
								ref={inputRef}
								type='text'
								value={replyText}
								onChange={e => setReplyText(e.target.value)}
								onKeyDown={e => {
									if (e.key === 'Enter' && replyText.trim()) {
										handleAddReply(comment.id);
									}
								}}
								placeholder={`Reply to ${comment.username}...`}
								className='flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
							/>
							<button
								onClick={() => handleAddReply(comment.id)}
								disabled={!replyText.trim()}
								className='text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed'>
								<Send className='w-5 h-5' />
							</button>
							<button
								onClick={() => {
									setReplyingTo(null);
									setReplyText('');
								}}
								className='text-gray-500 hover:text-gray-700'>
								<X className='w-5 h-5' />
							</button>
						</div>
					)}

					{/* Nested Replies */}
					{comment.replies && comment.replies.length > 0 && (
						<div
							className={`space-y-3 ${
								depth === 0
									? 'mt-3 pl-8 border-l-2 border-gray-100 dark:border-gray-700'
									: 'mt-3'
							}`}>
							{comment.replies.map(reply => (
								<CommentItem
									key={reply.id}
									comment={reply}
									depth={depth + 1}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		);
	};

	return (
		<div className='w-full max-w-5xl mx-auto'>
			{/* Comment Input */}
			<div className='flex items-center gap-3 p-4 border-b dark:border-gray-700'>
				<img
					src={currentUser.avatar}
					alt={currentUser.username}
					className='w-8 h-8 rounded-full'
				/>
				<input
					type='text'
					value={newComment}
					onChange={e => setNewComment(e.target.value)}
					onKeyPress={e => {
						if (e.key === 'Enter' && newComment.trim()) {
							handleAddComment();
						}
					}}
					placeholder='Add a comment...'
					className='flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
				/>
				<button
					onClick={handleAddComment}
					disabled={!newComment.trim()}
					className='text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed'>
					<Send className='w-5 h-5' />
				</button>
			</div>

			{/* Comments List */}
			<div className='divide-y dark:divide-gray-700'>
				{comments.map(comment => (
					<div key={comment.id} className='p-4'>
						<CommentItem comment={comment} />
					</div>
				))}
			</div>
		</div>
	);
};

export default CommentsSection;
