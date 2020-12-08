import React, { useEffect, useState } from "react";
import "./App.css";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie/FeaturedMovie";
import Header from "./components/Header/Header";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  /* Quando a tela for Carregada, ele vai executar o useEffect */
  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista total
      let list = await Tmdb.getHomeList();
      //console.log(list);

       setMovieList(list); //comenta para ver o loading e o setFeatureData

      // Pegando o Featured
      let originals = list.filter((item) => item.slug === "originals");
      let radomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      ); /* gera um numero aleatorio para escolher o filme */
      let chosen =
        originals[0].items.results[
          radomChosen
        ]; /* pega o escolhido a partir do numero aleatorio gerado acima */
      let chosenInfo = await Tmdb.getMovieInfo(
        chosen.id,
        "tv"
      ); /* para buscar mais informacoes do escolhido */

       setFeaturedData(chosenInfo); //comenta para ver o loading
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => {
          return <MovieRow key={key} title={item.title} items={item.items} />;
        })}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" aria-label="coração">
          💙
        </span>{" "}
        pela Ana Sousa
        <br />
        Direitos de imagem para Netflix
        <br />
        Dados pegos do site Themoviedb.org
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif"
            alt="Carregando"
          />
        </div>
      )}
    </div>
  );
};
