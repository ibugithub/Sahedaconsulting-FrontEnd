'use client'
import { useEffect, useState } from 'react';

export const Test = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('I am in the useEffect..')
    return () => {
      console.log('I am in the return...')
    };
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}



// 'use client'
// import { useState } from 'react';

// export const Test = () => {
//   const [count, setCount] = useState(0);

//   setInterval(() => {
//     console.log('Interval running');
//   }, 1000);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//     </div>
//   );
// }
