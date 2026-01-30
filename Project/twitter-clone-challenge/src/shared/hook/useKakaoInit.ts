import { useEffect } from "react";
import { KAKAO_JAVASCRIPT_KEY } from "../../config";
import { API_SUCCESS_MESSAGE } from "../../message";

const useKakaoInit = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
          console.log(API_SUCCESS_MESSAGE.INIT_KAKAO_SDK);
        }
      };
      document.head.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
      console.log(API_SUCCESS_MESSAGE.INIT_KAKAO_SDK);
    }
  }, []);
};

export default useKakaoInit;
