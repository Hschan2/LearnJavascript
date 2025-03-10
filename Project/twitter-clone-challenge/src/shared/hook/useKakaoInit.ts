import { useEffect } from "react";
import KakaoSdk from "kakao-js-sdk";
import { KAKAO_JAVASCRIPT_KEY } from "../../api-key";

const useKakaoInit = () => {
  useEffect(() => {
    const Kakao = KakaoSdk as any;

    if (!Kakao.isInitialized()) {
      Kakao.init(KAKAO_JAVASCRIPT_KEY);
      console.log("✅ Kakao SDK initialized!");
    }
  }, []);
};

export default useKakaoInit;
