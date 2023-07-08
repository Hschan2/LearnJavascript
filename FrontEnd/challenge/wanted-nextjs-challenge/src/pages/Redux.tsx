import { useSelector, useDispatch } from "react-redux"

export default function Redux() {
  const count = useSelector((state: any) => state.count);
  const dispatch = useDispatch();

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  }

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  }
  
  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Up</button>
      <button onClick={decrement}>Down</button>
    </div>
  )
}