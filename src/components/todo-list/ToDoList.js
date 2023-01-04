import React from 'react';
import { List } from 'antd';
import Todo from '../todo/Todo';

function ToDoList({ toDoData, setToDoData }) {
  return (
    <List
      bordered
      dataSource={toDoData}
      renderItem={(item, i) => (
        //i havent any id for todos, so did it as random value
        <List.Item key={Math.random()}>
          <Todo
            index={i + 1}
            item={item}
            setToDoData={setToDoData}
            toDoData={toDoData}
          />
        </List.Item>
      )}
    />
  );
}

export default ToDoList;
