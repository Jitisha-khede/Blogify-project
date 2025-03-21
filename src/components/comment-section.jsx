import React, { useState, useRef, useEffect } from 'react';
import {
	Send,
	Heart,
	MessageCircle,
	MoreHorizontal,
	ThumbsUp,
	X,
	ChevronDown,
	ChevronUp,
	ArrowUpDown,
} from 'lucide-react';
import { fetchComments } from '@/utils/api';
import AuthModal from './ui/auth-modal';
import { fetchUserById } from '@/utils/api';

const CommentsSection = ({ blogId }) => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState('');
	const [loading, setLoading] = useState(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
	const [ProfilePic,setProfilePic] = useState('https://res.cloudinary.com/ddagtg9fo/image/upload/v1736452441/hk7sfadgvpsmtdt6kgv7.png')
	const userId = localStorage.getItem('userId');
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			if (!userId) return;	
			const userData = await fetchUserById(userId);
			// console.log('user data: ', userData.data.user);
			if (userData) {
				setCurrentUser(userData.data.user);
				// console.log('curentUser: ', userData.data.user);
				
				// setProfilePic(userData.profilePhoto);
			}
			
			if(userData.data.user.profileImage){
				setProfilePic(userData.data.user.profileImage);
			}
		};
		fetchUserData();
	},[userId])

	// useEffect(() => {
	// 		const fetchUserData = async () => {
	// 			if (!userId) return;
	// 			const userData = await fetchUserById(userId);
	// 			if (userData && userData.profilePhoto) {
	// 				setProfilePic(userData.profilePhoto);
	// 			}
	// 		};
	// 		fetchUserData();
	// 	},[userId])	

	useEffect(() => {
		const getComments = async () => {
			const commentsData = await fetchComments(blogId);
			// console.log('comments data: ', commentsData);

			// Create a map of comments by id
			const commentMap = {};
			commentsData.forEach(comment => {
				commentMap[comment.id] = { ...comment, replies: [] };
			});

			// Populate replies
			const structuredComments = [];
			commentsData.forEach(comment => {
				if (comment.parentComment) {
					// If the comment has a parent, add it as a reply
					if (commentMap[comment.parentComment]) {
						commentMap[comment.parentComment].replies.push(
							commentMap[comment.id]
						);
					}
				} else {
					// If no parent, it's a top-level comment
					structuredComments.push(commentMap[comment.id]);
				}
			});

			setComments(structuredComments);
			console.log('structured comments: ', structuredComments);
		};

		getComments();
	}, [blogId]);

	// const currentUser = {
	// 	id: 'user1',
	// 	userName: 'john_doe',
	// 	avatar: '/api/placeholder/32/32',
	// };

	const [replyText, setReplyText] = useState('');
	const [replyingTo, setReplyingTo] = useState(null);
	const [replyingToInfo, setReplyingToInfo] = useState(null); // To store username info
	const [sortBy, setSortBy] = useState('latest'); // 'latest', 'oldest', 'most-liked'
	const [showSortOptions, setShowSortOptions] = useState(false);

	const sortButtonRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = event => {
			if (
				sortButtonRef.current &&
				!sortButtonRef.current.contains(event.target)
			) {
				setShowSortOptions(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () =>
			document.removeEventListener('mousedown', handleClickOutside);
	}, []);

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

	// Function to toggle showing/hiding replies
	const toggleShowReplies = commentId => {
		setComments(prevComments =>
			prevComments.map(comment => {
				if (comment.id === commentId) {
					return {
						...comment,
						showReplies: !comment.showReplies,
					};
				}
				return comment;
			})
		);
	};

	const sortComments = (comments, method) => {
		return [...comments].sort((a, b) => {
			switch (method) {
				case 'oldest':
					return a.id - b.id;
				case 'most-liked':
					return b.likes - a.likes;
				case 'most-replied':
					return b.replies.length - a.replies.length;
				case 'least-replied':
					return a.replies.length - b.replies.length;
				default: // latest
					return b.id - a.id;
			}
		});
	};

	const CommentItem = ({
		comment,
		isReply = false,
		parentId = null,
	}) => {
		const inputRef = useRef(null);

		// Add this effect to maintain focus
		useEffect(() => {
			if (replyingTo === comment.id) {
				inputRef.current?.focus();
			}
		}, [replyingTo]);

		const replyCount = comment.replies ? comment.replies.length : 0;

		const handleReplyClick = () => {
			if (replyingTo === comment.id) {
				setReplyingTo(null);
				setReplyingToInfo(null);
			} else {
				setReplyingTo(comment.id);
				// Store username info for @mention
				setReplyingToInfo({
					username: comment.user.userName,
					id: comment.id,
				});
			}
		};

		// console.log("comment: ", comment);

		return (
			<div className={`flex gap-3`}>
				<img
					src={ProfilePic}
					alt={comment.user.userName}
					className='w-8 h-8 rounded-full'
				/>
				<div className='flex-1'>
					<div className='flex items-start justify-between'>
						<div className='space-y-1'>
							<div className='flex items-center gap-2'>
								<span className='font-medium text-sm '>
									{comment.user.userName}
								</span>
								<span className='text-xs '>{comment.timestamp}</span>
							</div>
							<p className='text-sm text-gray-800 dark:text-gray-200'>
								{comment.content}
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
									onClick={handleReplyClick}
									className='flex items-center gap-1 hover:text-gray-700'>
									<MessageCircle className='w-4 h-4' />
									<span>Reply</span>
									{/* Show reply count for all comments and replies */}
									{replyCount > 0 && (
										<span className='text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full'>
											{replyCount}
										</span>
									)}
								</button>
							</div>
						</div>
					</div>

					{/* Reply Input */}
					{replyingTo === comment.id && (
						<div className='mt-3 flex items-center gap-3'>
							<img
								src={ProfilePic}
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
										handleAddReply(isReply ? parentId : comment.id);
									}
								}}
								placeholder={`Replying to ${comment.username}...`}
								className='flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
							/>
							<button
								onClick={() =>
									handleAddReply(isReply ? parentId : comment.id)
								}
								disabled={!replyText.trim()}
								className='text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed'>
								<Send className='w-5 h-5' />
							</button>
							<button
								onClick={() => {
									setReplyingTo(null);
									setReplyText('');
									setReplyingToInfo(null);
								}}
								className='text-gray-500 hover:text-gray-700'>
								<X className='w-5 h-5' />
							</button>
						</div>
					)}
				</div>
			</div>
		);
	};

	// Check if user is authenticated
	const isAuthenticated = () => {
		return document.cookie.split('; ').some(cookie => cookie.startsWith('token='));
	};

	// Show login modal if user tries to post comment while not logged in
	const handleAddComment = e => {
		e.preventDefault();

		if (!isAuthenticated()) {
			setIsAuthModalOpen(true);
			return;
		}

		// Your existing comment submission logic
	};

	return (
		<>
			<AuthModal
				isOpen={isAuthModalOpen}
				onClose={() => setIsAuthModalOpen(false)}
			/>

			<div className='w-full max-w-5xl mx-auto'>
				<div className='flex items-center gap-3 p-4 border-b dark:border-gray-700'>
					<img
						src={ProfilePic}
						alt="abc"
						className='w-8 h-8 rounded-full'
					/>
					<input
						type='text'
						value={newComment}
						onChange={e => setNewComment(e.target.value)}
						onKeyPress={e => {
							if (e.key === 'Enter' && newComment.trim()) {
								handleAddComment(e);
							}
						}}
						placeholder='Add a comment...'
						className='flex-1 bg-gray-100 dark:bg-gray-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white'
					/>
					<button
						// onClick={handleAddComment}
						disabled={!newComment.trim()}
						className='text-blue-500 hover:text-blue-600 disabled:text-gray-400 disabled:cursor-not-allowed'>
						<Send className='w-5 h-5' />
					</button>
					<div className='relative' ref={sortButtonRef}>
						<button
							onClick={() => setShowSortOptions(!showSortOptions)}
							className='text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
							title='Sort comments'>
							<ArrowUpDown className='w-5 h-5' />
						</button>
						{showSortOptions && (
							<div className='absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 z-10'>
								{[
									{ id: 'latest', label: 'Latest' },
									{ id: 'oldest', label: 'Oldest' },
									{ id: 'most-liked', label: 'Most Liked' },
									{ id: 'most-replied', label: 'Most Replied' },
									{ id: 'least-replied', label: 'Least Replied' },
								].map(option => (
									<button
										key={option.id}
										onClick={() => {
											setSortBy(option.id);
											setShowSortOptions(false);
										}}
										className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700
                  ${
										sortBy === option.id
											? 'text-blue-500'
											: 'text-gray-700 dark:text-gray-300'
									}`}>
										{option.label}
									</button>
								))}
							</div>
						)}
					</div>
				</div>

				{/* Comments List */}
				<div className='divide-y dark:divide-gray-700'>
					{sortComments(comments, sortBy).map(comment => (
						<div key={comment.id} className='p-4'>
							<CommentItem comment={comment} />

							{/* Show/Hide Replies Button - only shown if there are replies */}
							{comment.replies && comment.replies.length > 0 && (
								<div className='flex items-center gap-4 text-sm text-gray-500 ml-11 mt-1'>
									<button
										onClick={() => toggleShowReplies(comment.id)}
										className='flex items-center gap-1 hover:text-gray-700'>
										{comment.showReplies ? (
											<>
												<ChevronUp className='w-4 h-4' />
												<span>
													Hide replies ({comment.replies.length})
												</span>
											</>
										) : (
											<>
												<ChevronDown className='w-4 h-4' />
												<span>
													Show replies ({comment.replies.length})
												</span>
											</>
										)}
									</button>
								</div>
							)}

							{/* Replies - all in the same column with left indent */}
							{comment.replies &&
								comment.replies.length > 0 &&
								comment.showReplies && (
									<div className='mt-3 pl-8 border-l-2 border-gray-100 dark:border-gray-700 space-y-3'>
										{comment.replies.map(reply => (
											<CommentItem
												key={reply.id}
												comment={reply}
												isReply={true}
												parentId={comment.id}
											/>
										))}
									</div>
								)}
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CommentsSection;
