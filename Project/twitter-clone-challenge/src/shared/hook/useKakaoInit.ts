import { useEffect } from "react";
import { KAKAO_JAVASCRIPT_KEY } from "../../config";
import { messages } from "../../message";

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
          console.log(messages.apiSuccess.initKakaoSdk);
        }
      };
      document.head.appendChild(script);
    } else if (!window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
      console.log(messages.apiSuccess.initKakaoSdk);
    }
  }, []);
};

export default useKakaoInit;
