import React from 'react';
import { Layout, Divider } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import InputToDo from '../input-to-do/InputToDo';
import ToDoList from '../todo-list/ToDoList';

function App() {
  const [toDoData, setToDoData] = React.useState([]);

  React.useEffect(() => {
    const existedData = window.localStorage.getItem('data');
    console.log(JSON.parse(existedData));
    if (existedData) {
      const parsedTodos = JSON.parse(existedData);
      setToDoData(parsedTodos.filter((el) => el.expired > Date.now()));
    }
  }, []);

  React.useEffect(() => {
    if (toDoData.length) {
      console.log('data changed');
      window.localStorage.setItem('data', JSON.stringify(toDoData));
    }
  }, [toDoData]);

  return (
    <div className='App'>
      <Header>
        <h1 style={{ marginLeft: '24px' }}>Roga & Kopyta Inc.</h1>
      </Header>
      <Layout style={{ paddingTop: '50px' }}>
        <Content>
          <InputToDo setToDoData={setToDoData} />
          <Divider orientation='left'>YOUR TASKS:</Divider>
          <ToDoList toDoData={toDoData} setToDoData={setToDoData} />
        </Content>
      </Layout>
    </div>
  );
}

export default App;
