import React,{ useState, useEffect} from 'react'
import { Link, useSearchParams } from 'react-router-dom';

function Teams(props){

  const [list, setList] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const postQuery = searchParams.get('post') || '';

  // Сортирует список комманд/соревнований и возвращает их в массиве.
  async function buildList() {
    let data = await props.getPrimaryData(0);
    let dataSort = [];

    for (let i = 0; i < data.length; i++){
      let pattern = new RegExp('\\b'+ postQuery, 'i')
      if (pattern.test(data[i].name)) {
        dataSort.push(data[i]);
      };
    };

    return dataSort;
  };

  // Сохраняет паттерн поиска.
  function search() {
    const strSearch = document.getElementById("searchBlock").value;
    setSearchParams({post: strSearch});
  };

  useEffect(() => {
    setList(<div className='spinner spinner-1'/>)
    buildList().then(response => {
      let data = response.map(i => 
        <div className='teamsLinkContainer' key={props.getKey()}>
          <Link 
              to={`${i.id}/${i.name}`} 
              className="teamsLink"
              key={props.getKey()}
          >
            <img src={i.logo} className="logoItem"/>
            {i.name}
            <div className="logoItem shadowLogo"/>
          </Link>
        </div>
        )
        setList(data);
      });
  }, [postQuery]);

  return (

    <div className="Teams">
        <div className="searchBlock">
          <input
            className="form-control searchLine"
            type="search"
            placeholder=""
            aria-label="Search"
            id="searchBlock"
            defaultValue={postQuery}
          />
          <button 
            type="button" 
            className="btn btn-outline-primary btn-sm buttonSearch"
            onClick={() => search()}
          >
            Поиск
          </button>
          <button 
            type="button" 
            className="
              btn
              btn-outline-danger
              btn-sm 
              buttonSearch
              buttonSearchDisable
            "
            onClick={() => {
              document.getElementById("searchBlock").value = '';
              search();
            }}
          >
            Сброс
          </button>
        </div>

        <div className="containerTeams"> 
            <div className='teamsList'>
              {list}
            </div>
        </div>
    </div>
    
    
  );
};

export default Teams;