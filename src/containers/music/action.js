export const GET_LIST = 'GET_LIST';
export const PAGE_LIST = 'PAGE_LIST';
export const SEARCH = 'SERACH';

// let data = [];

// for (let index = 0; index < 100; index++) {
//     data.push({
//         id: index + 1,
//         key: Math.random(),
//         name: index % 2 === 0 ? `jay` : 'mike',
//         age: '18'
//     })
// }

export const getListAction = ({ page, pageSize, keyword = '' }) => dispatch => {

    // const data2 = keyword != '' ? data.filter(item => item.name === keyword) : data;

    fetch('https://api.nway.top/api/music/top2')
        .then(response => response.json())
        .then(data=>{
            dispatch({
                type: GET_LIST,
                data: {
                    list: data.data,
                    total: data.data.length,
                    page,
                    pageSize,
                    keyword
                }
            })
        })

    
}


export const pageAction = ({ page, pageSize, keyword = '' }) => dispatch => {
    const data2 = keyword != '' ? data.filter(item => item.name === keyword) : data;
    dispatch({
        type: PAGE_LIST,
        data: {
            list: data2.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
            page,
            pageSize
        }
    })
}
