class JsonPlaceholderApiHelper {
    constructor(apiContext, baseUrl) {
        this.apiContext = apiContext;
        this.baseUrl = baseUrl;
    }

    async getPosts() {
        return this.apiContext.get(`${this.baseUrl}/posts`);
    }

    async getPostById(id) {
        return this.apiContext.get(`${this.baseUrl}/posts/${id}`);
    }

    async createPost(payload) {
        return this.apiContext.post(`${this.baseUrl}/posts`, { data: payload });
    }

    async updatePost(id, payload) {
        return this.apiContext.put(`${this.baseUrl}/posts/${id}`, { data: payload });
    }

    async deletePost(id) {
        return this.apiContext.delete(`${this.baseUrl}/posts/${id}`);
    }
}

module.exports = JsonPlaceholderApiHelper;