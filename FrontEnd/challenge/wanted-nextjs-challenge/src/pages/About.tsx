import useRouter from "../hook/useRouter";

const About = () => {
  const {push} = useRouter()

  const moveAbout = () => {
      push('/')
  }

  return (
    <>
      <div>About</div>
      <button onClick={moveAbout}>go main</button>
    </>
  );
};

export default About;
