import axios from 'axios';

const API_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const fetchBlogs = async () => {
	try {
		const response = await fetch(`${API_URL}/api/blog/getAllBlogs`);
		const result = await response.json();

		if (result.success) {
			return result.data.blogs; // Return the blogs array
		} else {
			throw new Error('Failed to fetch blogs');
		}
	} catch (error) {
		console.error('Error fetching blogs:', error);
		return []; // Return an empty array if an error occurs
	}
};
export const fetchBlogById = async id => {
	try {
		const response = await fetch(
			`${API_URL}/api/blog/getBlogById/${id}`
		);
		// console.log("raw response:",response)
		if (!response.ok) throw new Error('Failed to fetch blog');
		const data = await response.json();
		// console.log("Fetched Data:", data); // Check if response contains blog data
		return data;
	} catch (error) {
		console.error('Error fetching blog:', error);
		return null;
	}
};

export const createBlog = async blogData => {
	try {
		const response = await fetch(`${API_URL}/api/blogs`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(blogData),
		});
		if (!response.ok) throw new Error('Failed to create blog');
		return await response.json();
	} catch (error) {
		console.error('Error creating blog:', error);
		return null;
	}
};

export const fetchUserById = async id => {
	try {
		const response = await fetch(
			`${API_URL}/api/user/getUserById/${id}`
		);
		if (!response.ok) throw new Error('Failed to fetch user');
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching user:', error);
		return null;
	}
};

export const fetchComments = async blogId => {
	try {
		const response = await fetch(
			`${API_URL}/api/comment/getComments/${blogId}`
		);
		const result = await response.json();
		if (result.success) {
			return result.data.comments;
		} else {
			throw new Error('Failed to fetch comments');
		}
	} catch (error) {
		console.error('Error fetching comments:', error);
		return [];
	}
};

export const signupUser = async formData => {
	try {
		const response = await axios.post(
			`${API_URL}/api/user/signup`,
			formData
		);
		console.log(response);
		return response.data;
	} catch (error) {
		throw error.response?.data || { message: 'Something went wrong' };
	}
};

export const loginUser = async formData => {
	try {
		const response = await axios.post(
			`${API_URL}/api/user/login`,
			formData,
			{
				withCredentials: true, 
			}
		);
		// console.log("response:",response);
		const userData = response.data.data;

		localStorage.setItem('userId', userData.loggedIn._id);  

		return userData;
	} catch (error) {
		throw error.response?.data || { message: 'Something went wrong' };
	}
};

export const voteBlog = async (blogId, voteType, token) => {
    try {
        const response = await axios.post(
            `${API_URL}/api/blog/voteBlog`, 
            { blogId, voteType }, 
            
			{
				withCredentials: true,  
				headers: {
					"Content-Type": "application/json",
				},

			}
        );
		// console.log("✅ Vote success:", response.data);
        return response.data; 
    } catch (error) {
        console.error("Error voting blog:", error.response?.data?.message || error.message);
        throw error;
    }
};	

export const removeBlogVote = async (blogId) => {
	try {
		const response = await axios.delete(
		  `${API_URL}/api/blog/deleteVote`,
		  {
			data: { blogId }, // Send `blogId` in the request body
			withCredentials: true, // Ensure cookies (JWT) are sent
		  }
		);
		return response.data;
	  } catch (error) {
		console.error("Error removing blog from bookmarks:", error.response?.data);
		throw error;
	  }
}

export const fetchBookmarks = async () => {
	try{
		// const token = localStorage.getItem("token"); 
		const response = await fetch(`${API_URL}/api/bookmark/getAllBookmarks`, {
			method: "GET",
			credentials: "include", 
		  });
		const result = await response.json();
		// console.log(result);
		if (result.success) {
			return result.data; // Return the blogs array
		} else {
			throw new Error('Failed to fetch blogs');
		}
	}
	catch(err){
		console.log(err)
	}	
}

export const removeFromBookmarks = async (blogId) => {
	try {
	  const response = await axios.delete(
		`${API_URL}/api/bookmark/removeFromBookmarks`,
		{
		  data: { blogId }, // Send `blogId` in the request body
		  withCredentials: true, // Ensure cookies (JWT) are sent
		}
	  );
	  return response.data;
	} catch (error) {
	  console.error("Error removing blog from bookmarks:", error.response?.data);
	  throw error;
	}
  };

export const addToBookmark = async(blogId) => {
	try{
		const response = await axios.post(
            `${API_URL}/api/bookmark/addtobookmarks`, 
            { blogId }, 
            
			{
				withCredentials: true,  
				headers: {
					"Content-Type": "application/json",
				},

			}
        );  

		return response.data;
	}
	catch(err){
		console.log(err);
	}
}