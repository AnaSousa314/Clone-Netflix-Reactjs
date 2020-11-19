import React, { useEffect, useState } from 'react';
import './App.css'
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow/MovieRow';
import FeaturedMovie from './components/FeaturedMovie/FeaturedMovie';


export default () =>{

  const [movieList, setMovieList] =useState([]);
  const [featuredData,setFeaturedData] = useState(null);

  /* Quando a tela for Carregada, ele vai executar o useEffect */
  useEffect(() => {
      const loadAll = async ()=>{

        // Pegando a lista total
        let list = await Tmdb.getHomeList();
          //console.log(list);

          setMovieList(list);

        // Pegando o Featured
        let originals = list.filter(item=>item.slug === 'originals');
        let radomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));/* gera um numero aleatorio para escolher o filme */
        let chosen = originals[0].items.results[radomChosen];/* pega o escolhido a partir do numero aleatorio gerado acima */
        let chosenInfo = await Tmdb.getMovieInfo(chosen.id,'tv');/* para buscar mais informacoes do escolhido */

        setFeaturedData(chosenInfo);
        

      }

      loadAll();

  }, []);


  return (
    <div className="page">

      {featuredData && 
        <FeaturedMovie item={featuredData}/>
      }
        
        <section className="lists">
          {movieList.map((item,key)=>{
            return(
            <MovieRow key={key} 
            title={item.title} 
            items={item.items}/>)
          })}
        </section>

    </div>
  )
}
