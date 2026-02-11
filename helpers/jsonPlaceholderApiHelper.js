class JsonPlaceholderApiHelper {
    constructor(apiContext) {
        this.apiContext = apiContext;
        this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

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

    async deletePost(id) {
        const response = await this.apiContext.delete(`${this.baseUrl}/posts/${id}`);
        return { response };
    }
}

module.exports = { JsonPlaceholderApiHelper };
