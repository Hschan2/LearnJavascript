import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

// Hook
// API Fetch (Using Star Wars API)
// useFetch해서 업데이트된 데이터를 관리하고 싶다면 URL 뿐만 아니라 boolean로써 새로고침된 인자도 허용 가능
// useFetch Hook을 사용한 컴포넌트에서 값 관리
// useFetch 파일에서 배열이 변경될 때는 새로고침이 필요
// strict mode 삭제할 것 (App Component)
const UseFetch = (url) => {
    const [fetchedData, setFetchedData] = useState({
        data: [],
        isLoading: true,
        error: false,
    })
    const cancelTokenSource = axios.CancelToken.source();
    const fetchData = useCallback(async() => {
        try {
            const response = await axios.get(url, { cancelToken: cancelTokenSource.token });
            const data = await response.data;

            if (data) {
                setFetchedData({
                    data: data.results ? data.results : data,
                    isLoading: false,
                    error: false,
                })
            }
        } catch (e) {
            if (axios.isCancel(e)) {
                console.log("API 호출이 취소되었습니다.");
            } else {
                console.log("Error 발생", e);
            }

            setFetchedData({
                data: [],
                isLoading: false,
                error: true,
            })
        }
    }, [ url ])

    useEffect(() => {
        fetchData();
        return () => cancelTokenSource.cancel();
    }, [url, fetchData])

    const { data, isLoading, error } = fetchedData;

    return { data, isLoading, error };
}

export default UseFetch;