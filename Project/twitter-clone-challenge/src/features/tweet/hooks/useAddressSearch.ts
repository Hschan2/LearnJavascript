import { useState } from "react";
import { AddressSearchResult } from "../../../components/types/util-type";

export const useAddressSearch = (endpoint: string) => {
  const [results, setResults] = useState<AddressSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchAddress = async (query: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${endpoint}?q=${query}&format=json`);
      if (!response) throw new Error("주소 검색 실패");
      const data: AddressSearchResult[] = await response.json();
      setResults(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "검색 에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return { results, isLoading, error, searchAddress };
};
