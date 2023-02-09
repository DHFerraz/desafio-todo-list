import { ChangeEvent, FormEvent, useState } from 'react';
import { PlusCircle, TextUnderline } from 'phosphor-react';
import { v4 as uuidv4 } from 'uuid';

import { Header } from './components/Header';
import { Task } from './components/Task';
import styles from './App.module.css';
import './global.css';

import clipboard from './assets/clipboard.svg';

interface TaskData {
  id: string;
  description: string;
  isDone?: boolean;
}

function App() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [newTask, setNewTask] = useState('');
  const [createdTasks, setCreatedTasks] = useState(0);
  const [finishedTasks, setFinishedTasks] = useState(0);

  function handleAddNewTask(event: FormEvent) {
    event.preventDefault();

    const newCreatedTask = {
      id: uuidv4(),
      description: newTask
    }

    setTasks([...tasks, newCreatedTask]);

    setCreatedTasks((state) => {
      return state + 1
    });

    setNewTask('');
  }

  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {
    setNewTask(event.target.value);
  }

  function handleDeleteTask(id: string) {
    const taskToDelete = tasks.find(task => task.id === id);

    const tasksWithoutDeletedOne = tasks.filter(task => {
      return task.id !== id
    });

    setTasks(tasksWithoutDeletedOne);

    setCreatedTasks((state) => {
      return state - 1
    });

    if (taskToDelete?.isDone) {
      decreaseFinishedCountTasks();
    }
  }

  function handleChangeStatus(id: string) {
    const newListWithChanges = tasks.filter(task => {
      if (task.id === id) {
        task.isDone = !task.isDone
      }

      return task
    });

    setTasks(newListWithChanges);

    const changedTask = tasks.find(task => task.id === id);

    if (changedTask?.isDone) {
      increaseFinishedCountTasks();
    } else {
      decreaseFinishedCountTasks();
    }
  }

  function increaseFinishedCountTasks() {
    setFinishedTasks((state) => {
      return state + 1
    });
  }

  function decreaseFinishedCountTasks() {
    setFinishedTasks((state) => {
      return state - 1
    });
  }

  const newTaskTextIsEmpty = newTask.length === 0;

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <form className={styles.form} onSubmit={handleAddNewTask}>
          <input 
            type="text" 
            placeholder='Adicione uma nova tarefa'
            value={newTask}
            onChange={handleNewTask}
          />
          
          <button disabled={newTaskTextIsEmpty}>
            <span>Criar</span>
            <PlusCircle size={20} />
          </button>
        </form>

        <div className={styles.tasks}>
          <header>
            <div className={styles.createdTasks}>
              <strong>
                Tarefas criadas
              </strong>
              <div>{createdTasks}</div>
            </div>
            
            <div className={styles.finishedTasks}>
              <strong>
                Concluídas
              </strong>
              <div>{finishedTasks}</div>
            </div>
          </header>

          {tasks.length == 0 && 
            <div className={styles.contentEmpty}>
              <img src={clipboard} />

              <strong>Você ainda não tem tarefas cadastradas</strong>
              <p>Crie tarefas e organize seus itens a fazer</p>
            </div>
          }

          {tasks.length > 0 && 
            tasks.map(task => {
              return <Task 
                        key={task.id} 
                        task={task}
                        onDeleteTask={handleDeleteTask}
                        onChangeStatusTask={handleChangeStatus}
                      />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default App