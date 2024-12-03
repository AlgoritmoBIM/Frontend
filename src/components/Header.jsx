import '../index.css';

const Header = () => {
  return (
    <div className="flex items-center justify-between bg-color-2-60 h-20 p-0 ">
      <div className="flex items-center h-full">
        <img src="./Logo AB.png" alt="Logo" className="logo" />
        <h1 className="text-color-5">AlgoritmoBIM</h1>    
      </div>
      <div className="flex items-center space-x-8">
        <button className="btn text-color-5">Sign In</button>
        <button className="btn text-color-5">Sign Up</button>
      </div>
    </div>
  )
}

export default Header;