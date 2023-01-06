import React from 'react'
import UseFetch from '../component/UseFetch';

const Planets = () => {
    const url = 'https://swapi.dev/api/planets/';
    const { data, isLoading, error } = UseFetch(url);

    if (isLoading) {
        return <p>로딩중...</p>
    }

    if (error) {
        return <p>에러 발생</p>
    }

    return (
        <div>
            {data.map(el => <p key={el.name}>{el.name}</p>)}
        </div>
    );
}

export default Planets;