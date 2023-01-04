import React, { useCallback } from 'react';
import { Button, Input } from 'antd';
import {
  CheckOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';

function Todo({ item, setToDoData, toDoData, index }) {
  const [isDone, setIsDone] = React.useState(item.done);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentText, setCurrentText] = React.useState(item.text);

  function editToDo() {
    setIsDone(false);
    setIsEditing(false);
    updateData();
  }
  function handleEnter(e) {
    if (e.key === 'Enter') {
      editToDo();
      updateData();
      e.target.blur();
    }
  }
  const updateData = useCallback(() => {
    const filteredData = toDoData.filter((el) => el.text !== item.text);
    setToDoData([
      ...filteredData,
      {
        done: isDone,
        text: currentText,
        createdAt: item.createdAt,
      },
    ]);
  }, [isDone, currentText]);

  function deleteToDo() {
    const filteredData = toDoData.filter((el) => el.text !== item.text);
    !filteredData.length &&
      window.localStorage.setItem('data', JSON.stringify([]));
    setToDoData(filteredData);
  }

  return (
    <>
      <span>{index}</span>
      <Input.Group compact>
        <Input
          style={{
            width: 'calc(100% - 120px)',
            marginLeft: '20px',
            textDecoration: isDone && 'line-through',
          }}
          value={currentText}
          bordered={isEditing && true}
          onChange={(e) => (isEditing ? setCurrentText(e.target.value) : null)}
          onFocus={(e) => !isEditing && e.target.blur()}
          onKeyUp={handleEnter}
        />
        <Button
          style={{
            opacity: !isEditing && '0',
            pointerEvents: !isEditing && 'none',
          }}
          icon={<CheckCircleOutlined />}
          type='primary'
          onClick={editToDo}
        />
      </Input.Group>
      <Button
        onClick={() => setIsDone((state) => !state)}
        style={{ marginLeft: 'auto' }}
        type={isDone ? 'primary' : 'default'}
        icon={<CheckOutlined />}
      />
      <Button
        onClick={() => setIsEditing((state) => !state)}
        icon={<EditOutlined />}
      />
      <Button onClick={deleteToDo} icon={<DeleteOutlined />} />
    </>
  );
}

export default Todo;
