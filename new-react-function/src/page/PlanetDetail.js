import React from 'react'
import UseFetch from '../component/UseFetch';

const PlanetDetail = () => {
    const id = 1;
    const url = `https://swapi.dev/api/planets/${id}/`;
    // planet으로 오브젝트 데이터의 이름을 변경
    const { data: planet, isLoading, error } = UseFetch(url);

    if (isLoading) {
        return <p>로딩중...</p>
    } else if (error) {
        return <p>에러 발생</p>
    } else {
        const { name, climate, gravity, population } = planet;
        return (
            <div>
                <h3>Name: {name}</h3>
                <p>{climate}</p>
                <p>{gravity}</p>
                <p>{population}</p>
            </div>
        );
    }
}

export default PlanetDetail;