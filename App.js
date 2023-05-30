import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Button, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import Card from './components/Card';

export default function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('http://192.168.1.146:3001/api/products')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleInputChange = (name, value) => {
    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post('http://192.168.1.146:3001/api/products', form)
      .then(response => {
        Alert.alert('Success', 'Product added successfully');
        fetchData(); // Actualiza los datos después de la inserción
        setForm({
          name: '',
          price: '',
          category: '',
          description: '',
        }); // Restablece los valores del formulario después de la inserción
        setShowForm(false); // Cierra la sección de inserción
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to add product');
      });
  };

  const handleUpdate = (id) => {
    const updatedProduct = {
      id,
      ...form
    };

    axios
      .put(`http://192.168.1.146:3001/api/products/${id}`, updatedProduct)
      .then(response => {
        Alert.alert('Success', 'Product updated successfully');
        fetchData(); // Actualiza los datos después de la actualización
        setForm({
          name: '',
          price: '',
          category: '',
          description: '',
        }); // Restablece los valores del formulario
        setShowForm(false); // Cierra la sección de inserción
      })
      .catch(error => {
        console.error(error);
        Alert.alert('Error', 'Failed to update product');
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title={showForm ? 'Close Form' : 'Add Product'}
        onPress={() => setShowForm(!showForm)}
      />
      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={form.name}
            onChangeText={text => handleInputChange('name', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={form.price}
            onChangeText={text => handleInputChange('price', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={form.category}
            onChangeText={text => handleInputChange('category', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={form.description}
            onChangeText={text => handleInputChange('description', text)}
          />
          <Button title="Add Product" onPress={handleSubmit} />
        </View>
      )}
      {data.map(item => (
        <Card
          key={item.id}
          name={item.name}
          price={item.price}
          category={item.category}
          description={item.description}
          onUpdate={() => handleUpdate(item.id)}
        />
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f4f4',
    padding: 10,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },


});
