import { useEffect, useState } from 'react';
import UseDebounce from '../component/UseDebounce';

const DATA = ['bike', 'dog', 'coin', 'cat', 'shop', 'turtle'];

const DebounceApp = () => {
    const [results, setResults] = useState([]);
    const [text, setText] = useState("")

    const deb = UseDebounce(text, 500);

    useEffect(() => {
        const data = DATA.filter(el => el.toLowerCase().includes(deb));
        setResults(data);
    }, [deb]);
    
  return (
    <div className="App">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      {
        results.length > 0 ?
        results.map((el, i) => <div key={i}>{el}</div>)
        :
        <div>There are no results</div>
      }
    </div>
  );
}

export default DebounceApp;