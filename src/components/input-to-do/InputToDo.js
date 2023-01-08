import React from 'react';
import { Button, Input } from 'antd';

function InputToDo({ setToDoData }) {
  const [inputText, setInputText] = React.useState('');
  function handleClick() {
    setToDoData((state) => [
      ...state,
      {
        text: inputText,
        done: false,
        expired: Date.now() + 30 * 24 * 60 * 60 * 1000,
      },
    ]);
    setInputText('');
  }
  function handleEnter(e) {
    if (e.key === 'Enter') {
      handleClick();
      e.target.blur();
    }
  }
  return (
    <Input.Group compact>
      <Input
        style={{ width: 'calc(100% - 110px)', marginLeft: '24px' }}
        placeholder='Add new task'
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
        onKeyUp={handleEnter}
      />
      <Button onClick={handleClick} type='primary'>
        Add
      </Button>
    </Input.Group>
  );
}

export default InputToDo;
