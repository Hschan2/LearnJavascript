import { ApolloServer, gql } from "apollo-server";
import fetch from "node-fetch";

let tweets = [
    {
      id: "1",
      text: "first one!",
      userId: "2",
    },
    {
      id: "2",
      text: "second one!",
      userId: "1",
    },
];

let users = [
    {
      id: "1",
      firstName: "nico",
      lastName: "las",
    },
    {
      id: "2",
      firstName: "Elon",
      lastName: "Mask",
    },
];

const typeDefs = gql`

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        """
        fullName = firstName + lastName
        """
        fullName: String!
    }

    """
    Tweet을 위한 Tweet 오브젝트 대표 리소스
    """
    type Tweet {
        id: ID!
        text: String!
        author: User
    }

    type Query {
        allMovies: [Movie!]!
        allUsers: [User!]!
        allTweets: [Tweet!]!
        tweet(id: ID!): Tweet
        movie(id: String!): Movie
    }

    type Mutation {
        postTweet(text: String!, userId: ID!): Tweet!
        """
        ID가 있으면 Tweet 삭제하고 없으면 false
        """
        deleteTweet(id: ID!): Boolean!
    }

    type Movie {
        id: Int!
        url: String!
        imdb_code: String!
        title: String!
        title_english: String!
        title_long: String!
        slug: String!
        year: Int!
        rating: Float!
        runtime: Float!
        genres: [String]!
        summary: String
        description_full: String!
        synopsis: String
        yt_trailer_code: String!
        language: String!
        background_image: String!
        background_image_original: String!
        small_cover_image: String!
        medium_cover_image: String!
        large_cover_image: String!
      }

      """
      for Real-Time Data Process
      """
      type Subscription {
          postTweet(text: String!, userId: ID!): Tweet!
      }
`;

const resolvers = {
    Query: {
        allTweets() {
            return tweets;
        },
        allUsers() {
            return users;
        },
        allMovies() {
            return fetch("https://yts.mx/api/v2/list_movies.json")
                .then((res) => res.json())
                .then((json) => json.data.movies);
        },
        tweet(root, { id }) {
            return tweets.find((tweet) => tweet.id === id);
        },
        movie(_, { id }) {
            return fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
                .then((res) => res.json())
                .then((json) => json.data.movie);
        },
    },

    Mutation: {
        postTweet(_, { text, userId }) {
            const user = users.find((user) => user.id === userId);
            if (!user) return "Don't find User";

            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        },
        deleteTweet(_, { id }) {
            const tweet = tweets.find((tweet) => tweet.id === id);
            if (!tweet) return false;
            tweets = tweets.filter((tweet) => tweet.id !== id);
            return true;
        }
    },

    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`;
        }
    },

    Tweet: {
        author({ userId }) {
            return users.find((user) => user.id === userId);
        }
    },
    
    Subscription: {
        // 추가, 삭제, 수정 등 데이터가 변경될 수 있는 처리 작업
        postTweet(_, { text, userId }) {
            const user = users.find((user) => user.id === userId);
            if (!user) return "Don't find User";

            const newTweet = {
                id: tweets.length + 1,
                text,
            };
            tweets.push(newTweet);
            return newTweet;
        }
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});