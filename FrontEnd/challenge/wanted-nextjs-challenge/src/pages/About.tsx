import useRouter from "../hook/useRouter";

const About = () => {
  const {push} = useRouter()

  const moveRoot = () => {
      push('/')
  }

  return (
    <>
      <div>About</div>
      <button onClick={moveRoot}>go main</button>
    </>
  );
};

export default About;
