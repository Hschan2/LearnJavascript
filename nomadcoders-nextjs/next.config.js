/** @type {import('next').NextConfig} */

// API 외부에서 보이지 않도록 가리는 방법 사용
const API_KEY = process.env.API_KEY;

const nextConfig = {
  reactStrictMode: true,
  // Redirect 설정
  async redirects() {
    return [
      {
        source: "/contact/:path*", // contact 페이지로 이동하면
        destination: "/form/:path", // form 페이지가 실행된다.
        permanent: false // false로 하여 브라우저 혹은 검색엔진이 정보 기억 X. 꼭 작성해야 하는 것
      },
    ]
  },

  // Redirect와 달리 URL을 변경하지 않음
  async rewrites() {
    return [
      {
        source: "/api/movies", // 브라우저에서 /api/movies로 접근 시 Response 정보 확인 가능
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/highRated",
        destination: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=ko-KR`,
      },
      {
        source: "/api/upcoming",
        destination: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR`,
      },
    ]
  },
}

module.exports = nextConfig
