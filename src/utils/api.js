// const baseUrl = 'https://api.nway.top';
const baseUrl = 'http://localhost:8889';


const api = {
    musicList: baseUrl + '/api/music/page',
    banner:baseUrl + '/api/banner/get',
    addBanner:baseUrl + '/api/banner/save',
    deleteBanner:baseUrl + '/api/banner/delete',
}

export default api;