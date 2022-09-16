import Layout from './hoc/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import Quiz from './containers/Quiz/Quiz';
import Auth from './containers/Auth/Auth';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='auth' element={<Auth></Auth>}></Route>
        <Route path='quiz-creator' element={<QuizCreator></QuizCreator>}></Route>
        <Route path='quiz/:id' element={<Quiz></Quiz>}></Route>
        <Route path='/' element={<QuizList></QuizList>}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
