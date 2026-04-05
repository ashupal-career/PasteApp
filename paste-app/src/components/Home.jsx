import React from 'react'

const Home = () => {
  const [title,setTitle] = useState('');
  return (
    <div>
      <input 
      className='p-2 rounded-2xl mt-2'
      type="text"
      placeholder='Enter title here'
      value={title}
      onChange={(e) => setTitle(e.target.value)} 
      />
      <button>
        Create My Paste
      </button>
    </div>
  )
}

export default Home