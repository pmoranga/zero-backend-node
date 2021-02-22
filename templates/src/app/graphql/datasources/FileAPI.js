const { RESTDataSource } = require('apollo-datasource-rest');

class FileAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = 'http://localhost:8090';
    }

    mapPresignedUrl(category, presignedUrl) {
        return {
            category: category,
            url: presignedUrl.url,
            method: presignedUrl.method
        };
    }

    async getDownloadPresignedUrl({ key }) {
        const response = await this.get('/file', { key: key });
        return this.mapPresignedUrl("download",response);
    }
     
    async getUploadPresignedUrl({ key }) {
        const response = await this.get('/file/presigned', { key: key });
        return this.mapPresignedUrl("upload",response);
    }

}

module.exports = FileAPI;