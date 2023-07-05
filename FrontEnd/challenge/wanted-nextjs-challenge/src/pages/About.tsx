import useRouter from "../hook/useRouter";

export default function About() {
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
}
