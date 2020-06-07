//const baseUrl = 'http://localhost:3000/';
const baseUrl = 'https://embajadas-api-rest.now.sh/';

const apiHeaders = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
}

//Otra forma de agregar headers
// const apiHeaders = new Headers();
// apiHeaders.append('Content-Type', 'application/json');
// apiHeaders.append('Accept', 'application/json');


const fetchParams = (method, data = '') => {
    const body = data ? { body: JSON.stringify(data) } : {}
    return {
        method: method,
        headers: apiHeaders,
        credentials: 'same-origin',
        ...body
    }
}

const api = {
    //Funciones CRUD
    //CREATE
    createEmbajada: async formData => {
        const dataResponse = await fetch(baseUrl + 'markers', fetchParams('POST', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //READ
    getEmbajadas: async () => {
        const dataResponse = await fetch(baseUrl + 'markers', fetchParams('GET'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //UPDATE
    updateEmbajadas: async (formData,id) => {
        const dataResponse = await fetch(baseUrl + 'markers/' + id, fetchParams('PUT', formData));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
    //DELETE
    deleteEmbajadas: async id => {
        const dataResponse = await fetch(baseUrl + 'markers/' + id, fetchParams('DELETE'));
        const dataInfo = await dataResponse.json();
        return dataInfo;
    },
}