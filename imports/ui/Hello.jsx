import React, { useState } from 'react';
import { APIClient } from '../utils/RestApiClient'




export const Hello = () => {
  const [counter, setCounter] = useState(0);
  const [test, setTest] = useState([]);

  const increment = () => {
    setCounter(counter + 1);
  };

  const handleClick = () => {
    const history = APIClient.v1.get('users', {})
    console.log(history)
    history.then((resolve) => {
      console.log('111', resolve)
      setTest(resolve.result)
           
    })



  }

  


  return (
    <div>
      <button onClick={increment}>Click Me</button>
      <p>You've pressed the button {counter} times.</p>
      <button onClick={handleClick}>Кнопка</button>
      <p>Result click  </p>
      {test.map(item => (
        <div key={item.id}>
          {item.id}

          </div>
      ))
}
    </div>
  );
};
