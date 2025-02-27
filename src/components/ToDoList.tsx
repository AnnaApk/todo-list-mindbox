import DeleteIcon from "@mui/icons-material/Delete";
import { Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { ToDo } from "../type";
import { useAppDispatch } from "../store/hooks";
import { deleteTask, toggleTaskStatus } from "../store/toDoSlice";

interface IProps {
  tasks: ToDo[];
}
export function ToDoList({tasks}: IProps) {

  const dispatch = useAppDispatch();

  if (!tasks.length) {
    return (
      <Typography
        variant="body1"
        color="text.secondary"
        align="center"
        sx={{ py: 4 }}
      >
        No tasks found
      </Typography>
    )
  }
  return (
    <List>
      {
        tasks.map(task => (
          <ListItem 
            key={task.id}
            secondaryAction={
              <IconButton edge='end' onClick={() => dispatch(deleteTask(task.id))} data-testid="todo-delete"  >
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemButton onClick={() => dispatch(toggleTaskStatus(task.id))} data-testid="todo-toggle" >
              <ListItemIcon>
                <Checkbox edge="start" checked={task.completed} />
              </ListItemIcon>
              <ListItemText 
                sx={{
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'text.secondary' : 'text.primary',
                }}
              >
                {task.text}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))
      }
    </List>
  )
}
