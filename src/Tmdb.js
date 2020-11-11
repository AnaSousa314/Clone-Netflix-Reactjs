const API_KEY = "4bd69f86df28779632c282d2880d1e19";

const API_BASE = "https://api.themoviedb.org/3";

/*  - Originais da Netflix 
    - Recomendados (treding)
    -em alta (top rated)
    -ação
    -comédia
    - terror (não quero)
    -romance
    -documentários 
*/

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();

    return json;
}

export default{
    getHomeList: async ()=>{
        return 
        [
            {
                slug: 'originals',
                title: 'Originais do Netiflix',
                items: await basicFetch(`/discover/tv?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'treding',
                title: 'Recomendados para você',
                items: await basicFetch(`/trendding/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: 'Em Alta',
                items: await basicFetch(`/movie/top_rated?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: 'Ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: 'Comédia',
                items: await basicFetch(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?with_genres=18&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: 'Romance',
                items: await basicFetch(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: 'Documentário',
                items: await basicFetch(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },

        ]
    }
}