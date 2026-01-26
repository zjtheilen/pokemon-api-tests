class JsonPlaceholderApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    // Create a post (POST)
    async createPost(payload) {
        const response = await this.apiContext.post(`${this.baseUrl}/posts`, { data: payload });
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            console.warn('POST response not JSON, returning empty object');
        }
        return { response, data };
    }

    // Get a post (GET)
    async getPost(id) {
        const response = await this.apiContext.get(`${this.baseUrl}/posts/${id}`);
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            console.warn('GET response not JSON, returning empty object');
        }
        return { response, data };
    }

    // Update a post (PUT)
    async updatePost(id, payload) {
        const response = await this.apiContext.put(`${this.baseUrl}/posts/${id}`, { data: payload });
        let data = {};
        try {
            data = await response.json();
        } catch (e) {
            console.warn('PUT response not JSON, returning empty object');
        }
        return { response, data };
    }

    // Delete a post (DELETE)
    async deletePost(id) {
        const response = await this.apiContext.delete(`${this.baseUrl}/posts/${id}`);
        // DELETE usually returns empty body, so no JSON parsing
        return { response };
    }
}

module.exports = { JsonPlaceholderApiHelper };
