import './App.css';
import { BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Blog } from './pages/Blog';
import { Blogs } from './pages/Blogs';
import { CreateBlog } from './pages/CreateBlog';

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/blog/:id' element={<Blog/>}/>
        <Route path='/create-blog' element={<CreateBlog/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
