import { Box, Button, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { addTask } from "../store/toDoSlice";

export function ToDoInput() {

  const dispatch = useAppDispatch();

  const [task, setTask] = useState<string>('');

  function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
    setTask(e.target.value)
  }

  function handleSubmit() {
    dispatch(addTask(task))
  }

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ display:'flex', gap:'20px'}}>
      <TextField 
        fullWidth
        size="small"
        placeholder="What needs to be done?"
        onChange={handleChange}
        value={task}
        // data-testid="todo-input"
        inputProps={{ 'data-testid': 'todo-input' }}
      />
      <Button
        type="submit"
        variant="contained"
        disabled={!task.trim()}
        startIcon={<AddIcon />}
      >
        Add
      </Button>
    </Box>
  )
}
