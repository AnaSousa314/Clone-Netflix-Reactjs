import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';

export default () =>{

  const [movieList, setMovieList] =useState([])

  /* Quando a tela for Carregada, ele vai executar o useEffect */
  useEffect(() => {
      const loadAll = async ()=>{

        // Pegando a lista total
        let list = await Tmdb.getHomeList();
          //console.log(list);

          setMovieList(list);

      }

      loadAll();

  }, []);


  return (
    <div className="page">
        
        <section className="lists">
          {movieList.map((item,key)=>{
            return(
            <div>
              {item.title}
            </div>)
          })}
        </section>

    </div>
  )
}
