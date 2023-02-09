import styles from './Task.module.css';
import { Trash, CheckCircle, Circle } from 'phosphor-react';

interface TaskProps {
    task: Task;
    onDeleteTask: (id: string) => void;
    onChangeStatusTask: (id: string) => void;
}

interface Task {
    id: string;
    description: string;
    isDone?: boolean;
}

export function Task({ task, onDeleteTask, onChangeStatusTask }: TaskProps) {
    return(
        <div className={styles.task}>
            {task.isDone && 
                <CheckCircle 
                    className={styles.inputDone} 
                    onClick={() => onChangeStatusTask(task.id)} />}

            {!!!task.isDone && 
                <Circle
                    className={styles.inputNotDone} 
                    onClick={() => onChangeStatusTask(task.id)} />}

            {task.isDone ? <p className={styles.lineThrough}>{task.description}</p> : <p>{task.description}</p>}
            
            <Trash 
                size={20}
                onClick={() => onDeleteTask(task.id)}
            />
        </div>
    )
}