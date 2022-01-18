import React, { useState, useEffect } from 'react'
import TeamList from './TeamList';

function FirstList(props){
  
  const [pattern, setPattern] = useState(new RegExp(''));

  // Сортирует список комманд/соревнований и возвращает их в массиве. 
  async function buildList() {
    let data = await props.getPrimaryData();
    let dataSort = [];

    for (let i = 0; i < data.length; i++){
      if (pattern.test(data[i].name)) {
        dataSort.push(data[i]);
      };
    };

    return dataSort;
  };

  // Проверяет какой список команд или соревнований активен.
  function defaultChecked() {
    if (sessionStorage.radio == '1') {
      document.getElementById('btnradio2q')
      .setAttribute('checked', 'checked');
    }else{
      document.getElementById('btnradio1q')
      .setAttribute('checked', 'checked');
    };
  };

  // Сохраняет паттерн поиска.
  function search() {
    const strSearch = document.getElementById("searchBlock").value;
    sessionStorage.setItem('strSearch', strSearch);
    setPattern(new RegExp('\\b'+ strSearch, 'i'));
  };

  useEffect(() => {
    defaultChecked();
    search();
  }, []);

  return (
    <div 
      className={props.status ? 'firstList active' : 'firstList'}
    >
      <div>
        <div 
        className="btn-group btnBlock" 
        role="group" 
        aria-label="Basic radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="btnradio1"
            id="btnradio1q"
            autoComplete="off"
            onChange={()=>{
              props.setRadio(0);
              sessionStorage.setItem('radio', '0');
              props.setNameSecondList('Выберите команду или соревнование');
            }}
          />
          <label 
            className="btn btn1 btn-outline-primary" 
            htmlFor="btnradio1q"
          >
            Команды
          </label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio1"
            id="btnradio2q"
            autoComplete="off"
            onChange={()=>{
              props.setRadio(1);
              sessionStorage.setItem('radio', '1');
              props.setNameSecondList('Выберите команду или соревнование');
            }}
          />
          <label 
            className="btn btn-outline-primary" 
            htmlFor="btnradio2q"
          >
            Соревнования
          </label>
        </div>

        <div className="searchBlock">
          <input
            className="form-control searchLine"
            type="search"
            placeholder=""
            aria-label="Search"
            id="searchBlock"
            defaultValue={sessionStorage.strSearch}
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
      </div>
      

      <TeamList
        setId={props.setId}
        buildList={buildList}
        show={props.show}
        radio={props.radio}
        setRadioSaved={props.setRadioSaved}
        pattern={pattern}
        setNameSecondList={props.setNameSecondList}
      />
    </div>
  );
};

export default FirstList;