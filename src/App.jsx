import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {

  const [userData, setUserData] = useState([]);
  const [index, setIndex] = useState(1);

  const getData = async ()=>{
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=18`);
    setUserData(response.data);
  }

  useEffect(function(){
    getData();
  },[index]);

  let printUserData = <h3 className='text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>Loading...</h3>

  if(userData.length>0){
    printUserData = userData.map(function(elem, idx){
      return <div key={idx}>
        <a href={elem.url} target='_blank'>
          <div className='h-40 w-44 overflow-hidden rounded-xl'>
            <img className='h-full w-full object-cover' src={elem.download_url} alt="" />
          </div>
          <h2 className='font-bold text-lg'>{elem.author}</h2>
        </a>
      </div>
    })
  }

  return (
    <div className='bg-black overflow-auto h-screen text-white p-5 '>
      <div className='flex h-[82%] flex-wrap gap-4 p-10 mb-15 ml-10 justify-between'>
        {printUserData}
      </div>

      <div className='flex justify-center gap-6 items-center p-4'>
        <button
          onClick={()=>{
            if(index>1)
            {
              setIndex(index-1);
              setUserData([]);
            }
          }}
          className='bg-cyan-800 text-sm cursor-pointer active:scale-90 text-black rounded px-4 py-2 font-semibold'>
          Prev
        </button>
        <h4>Page {index}</h4>
        <button
          onClick={()=>{
              setIndex(index+1);
              setUserData([]);
          }}
          className='bg-cyan-800 text-sm cursor-pointer active:scale-90 text-black rounded px-4 py-2 font-semibold'>
          Next
        </button>
      </div>
    </div>
  )
}

export default App