import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-checkbox';
import { FAB } from 'react-native-paper';

const TaskListScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Tarefa 1', completed: false, selected: false },
    { id: 2, title: 'Tarefa 2', completed: false, selected: false },
  ]);

  const handleCheckboxChange = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed, selected: !task.selected };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const handleAddTask = () => {
    navigation.navigate('AddTask', { addTask });
  };

  const addTask = (title) => {
    const newTask = {
      id: tasks.length + 1,
      title,
      completed: false,
      selected: false
    };
    setTasks([...tasks, newTask]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Tarefas</Text>
      {tasks.map(task => (
        <View key={task.id} style={styles.taskItem}>
          <View style={styles.checkboxContainer}>
            <CheckBox
              label=""
              checked={task.completed}
              onChange={() => handleCheckboxChange(task.id)}
            />
            <Text style={styles.taskTitle}>{task.title}</Text>
          </View>
          {task.selected && (
            <TouchableOpacity onPress={() => handleDeleteTask(task.id)} style={styles.deleteButton}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          )}
        </View>
      ))}
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={handleAddTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24, // Tamanho do texto do título
    fontWeight: 'bold', // Negrito
    marginBottom: 20, // Espaçamento inferior
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16, // Tamanho do texto da tarefa
    fontWeight: 'bold', // Negrito
    marginLeft: 10, // Espaçamento à esquerda do checkbox
  },
  deleteButton: {
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TaskListScreen;