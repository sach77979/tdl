// src/components/TaskManager.js
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import '../styles/TaskManager.css';
const TaskManager = ({ onLogout }) => {
  const [task, setTask] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [tasks, setTasks] = useState([]);

  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'tasks'), where('uid', '==', user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [user.uid]);

  const addTask = async () => {
    if (task && dateTime) {
      await addDoc(collection(db, 'tasks'), {
        task,
        dateTime,
        uid: user.uid
      });
      setTask('');
      setDateTime('');
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, 'tasks', id));
  };

  const handleLogout = () => {
    signOut(auth);
    onLogout();
  };

  return (
    <div className="task-container glass-card">
      <h2>Welcome {user.email}</h2>
      <input type="text" placeholder="Enter task" value={task} onChange={e => setTask(e.target.value)} />
      <input type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(t => (
          <li key={t.id}>
            {t.task} - {new Date(t.dateTime).toLocaleString()}
            <button onClick={() => deleteTask(t.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TaskManager;
