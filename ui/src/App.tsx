import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import { Navbar } from './components/Navbar';
import { Home } from './pages/home/Home';
import { SignUp } from './pages/auth/signup/SignUp';
import { SignIn } from './pages/auth/signin/SignIn';
import { isAuthenticated } from './utils/authStorage';
import { Post } from './pages/post/Post';
import { CreatePost } from './pages/post/CreatePost';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Container>
          <Route path="/" exact>
            {isAuthenticated() ? <Home /> : <Redirect to="/signin" />}
          </Route>
          <Route path="/posts/:id">{isAuthenticated() ? <Post /> : <Redirect to="/signin" />}</Route>
          <Route path="/post">{isAuthenticated() ? <CreatePost /> : <Redirect to="/signin" />}</Route>
          <Route component={SignUp} path="/signup" />
          <Route component={SignIn} path="/signin" />
          {/* <Route component={RecipesPage} path="/" exact />
          <Route component={EditRecipe} path="/edit/:id" />
          <Route component={Recipe} path="/recipe/:id" />
          <Route component={AddRecipe} path="/add" /> */}
        </Container>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
