import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './routes/home/home-route-component';
import Nav from './routes/navigation/navigation-route-component';
import Posts from './routes/posts/posts-route-component.jsx'
import SinglePost from './routes/singlePost/singlePost-route-component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Nav />}>
        <Route index element={<Home />} />
        <Route path='/posts' element={<Posts />} />
        <Route path='/single-post' element={<SinglePost />} />
      </Route>
    </Routes>
  );
}

export default App;
