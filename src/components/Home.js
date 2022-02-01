import React, { Component } from 'react';
import { Link } from 'react-router-dom';

function Home(){
        return (
            <div className="home">
                <h1 className="h1Home">
                    Здесь вы можете посмотереть матчи ведущих европейских 
                    команд и соревнаваний. На сайте действует ограничение 
                    по запросам в минуту, это обусловленно ограничениями 
                    бесплатного api.

                </h1>
                <Link to="/teams" className="homeLink">
                    Список команд
                </Link>
                <Link to="/competitions" className="homeLink">
                    Список соревнований
                </Link>
            </div>
        );
    }
 
export default Home;