import React,{useState} from "react";
import './style.css';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
/* atalho rfc para montar a carcaca*/

export default ({ title, items }) => {

  const [scrollX,setScrollX] = useState(0)

  const handleLeftArrow = () =>{
      /* lembrando que o x da lateral da tela começa em 0 */
      let x = scrollX + Math.round(window.innerWidth/2);/* Assim o scroll correrá metade da tela */
      /*  */
      if(x>0){
        x = 0;
      }
      setScrollX(x);
  }

  const handleRightArrow = () =>{
    let x = scrollX - Math.round(window.innerWidth/2);

    /* Com o cálculo abaixo eu pego a largura completa que os itens ocupam, lembrando que cada item possui largura de 150px */
    let listWidth = items.results.length * 150;

    /* Se a largura da tela - a largura total dos itens for maior que 0
      Então x será igual a (largura da tela menos a largura total dos itens) menos o total do padding esquerdo e direito 
    */
    if((window.innerWidth - listWidth) > x){
      x = (window.innerWidth - listWidth) - 60;
    }

    setScrollX(x)
  }

  return (
    <div className="movieRow">
      <h2>{title}</h2>
      <div className="movieRow--left" onClick={handleLeftArrow}>
            <NavigateBeforeIcon style={{fontSize:50}}/>
      </div>

      <div className="movieRow--right" onClick={handleRightArrow}>
            <NavigateNextIcon style={{fontSize:50}}/>
      </div>

      <div className="movieRow--listarea">
        <div className="movieRow--list" style={{
          marginLeft: scrollX,
          width: items.results.length * 150/* com isso não aparece um quadro só com todos os itens, ver style.css movieRow--list */
          }}>
          {items.results.length > 0 &&
            items.results.map((item, key) => {
              return <div key={key} className="movieRow--item">
                  <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
              </div>;
            })}
        </div>
      </div>
    </div>
  );
};
