import './Products.css'

const Products = () => {
  return (
    
      <div className="flex h-screen px-5 py-2 gap-3">
          <div className='w-[18%] h-full bg-red-500 rounded-lg'>Sidebar</div>
          <div className='w-[82%] h-full flex flex-col gap-3'>
             <div className='h-[10%] bg-amber-300 rounded-lg'>Header</div>
             <div className='h-[90%] bg-green-300 rounded-lg'></div>
          </div>

      </div>
    
  )
}

export default Products