import { Box, Button, Divider, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { ToDoInput } from './components/ToDoInput';
import { useState } from 'react';
import { ToDoList } from './components/ToDoList';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { deleteCompleted, selectTasks } from './store/toDoSlice';

function App() {

  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  

  const [ filter, setFilter ] = useState<'all' | 'completed' | 'active'>('all');

  const activeTodosCount = tasks.filter((task) => !task.completed).length;

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  function handleFilterChange(_:React.MouseEvent<HTMLElement>, newProp: 'all' | 'completed' | 'active') {
    setFilter(newProp)
  }

  return (
    <Box sx={{ width:'100vw', minHeight:'100vh', bgcolor:'rgba(0,0,0,.1)', display:'flex', flexDirection:'column', alignItems:'center'}}>
      <Typography variant='h2' sx={{ padding:'40px 0' }} >To Do List</Typography>

      <Paper sx={{ width:'80%', maxWidth:'900px', padding:'20px', display:'flex', flexDirection:'column', gap:'20px'}}>
        <ToDoInput />

        <ToggleButtonGroup 
          size='small'
          value={filter}
          onChange={handleFilterChange}
          exclusive
        >
          <ToggleButton value='all'>
            All
          </ToggleButton>
          <ToggleButton value='active'>
            Active
          </ToggleButton>
          <ToggleButton value='completed' data-testid="filter-completed">
            Completed
          </ToggleButton>
        </ToggleButtonGroup>

        <Divider />
          <ToDoList tasks={filteredTasks} />
        <Divider />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {activeTodosCount} items left
          </Typography>
          <Button
            onClick={() => dispatch(deleteCompleted()) }
            disabled={!tasks.some((task) => task.completed)}
            size="small"
          >
            Clear completed
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default App
