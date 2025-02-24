const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

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
export const fetchBlogById = async (id) => {
	try {
		const response = await fetch(`${API_URL}/api/blog/getBlogById/${id}`);
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

export const createBlog = async (blogData) => {
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

export const fetchUserById = async (id) => {
	try{
		const response = await fetch(`${API_URL}/api/user/getUserById/${id}`);
		if (!response.ok) throw new Error('Failed to fetch user');
		const data = await response.json();
		return data
	}
	catch(error){
		console.error('Error fetching user:', error);
		return null;
	}	
}