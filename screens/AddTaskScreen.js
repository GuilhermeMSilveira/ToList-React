import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AddTaskScreen = ({ navigation, route }) => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleAddTask = () => {
    if (route.params?.addTask) {
      route.params.addTask(taskDescription);
    }
    setTaskDescription('');
    navigation.goBack(); // Navegar de volta para a tela da lista de tarefas
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição da Tarefa"
        value={taskDescription}
        onChangeText={text => setTaskDescription(text)}
      />
      <View style={styles.buttonContainer}>
        <Button title="Adicionar Tarefa" onPress={handleAddTask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginVertical: 10,
  },
  input: {
    width: '80%',
    height: 50, // Ajuste a altura aqui
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    height: 500, // Ajuste a altura do contêiner do botão aqui
  },
});

export default AddTaskScreen;
