import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import axios from "axios";
import Card from "./components/Card";

export default function App() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://192.168.1.9:3001/api/products")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleInputChange = (name, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios
      .post("http://192.168.1.9:3001/api/products", form)
      .then((response) => {
        Alert.alert("Success", "Product added successfully");
        fetchData();
        setForm({
          name: "",
          price: "",
          category: "",
          description: "",
        });
        setShowForm(false);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to add product");
      });
  };

  const handleUpdate = (id) => {
    const updatedProduct = {
      ...form,
    };

    axios
      .put(`http://192.168.1.9:3001/api/products/${id}`, updatedProduct)
      .then((response) => {
        Alert.alert("Success", "Product updated successfully");
        fetchData();
        setForm({
          name: "",
          price: "",
          category: "",
          description: "",
        });
        setShowForm(false);
        setExpandedCardId(null);
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to update product");
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://192.168.1.9:3001/api/products/${id}`)
      .then((response) => {
        Alert.alert("Success", "Product deleted successfully");
        fetchData();
      })
      .catch((error) => {
        console.error(error);
        Alert.alert("Error", "Failed to delete product");
      });
  };

  const handleCardExpand = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
    }
  };

  const openEditForm = (product) => {
    setForm({
      _id: product._id,
      name: product.name,
      price: String(product.price),
      category: product.category,
      description: product.description,
    });
    setShowForm(true);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        title={showForm ? "Cerrar Form" : "Agregar Producto"}
        onPress={() => {
          setShowForm(!showForm);
          setForm({
            name: "",
            price: "",
            category: "",
            description: "",
          });
        }}
      />
      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={form.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Precio"
            value={form.price}
            onChangeText={(text) => handleInputChange("price", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Categoria"
            value={form.category}
            onChangeText={(text) => handleInputChange("category", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Descripcion"
            value={form.description}
            onChangeText={(text) => handleInputChange("description", text)}
          />
          <Button
            title={form._id ? "Actualizar Producto" : "Agregar Producto"}
            onPress={form._id ? () => handleUpdate(form._id) : handleSubmit}
          />
        </View>
      )}

      {data.map((item) => (
        <Card
          key={item._id}
          name={item.name}
          price={item.price}
          category={item.category}
          description={item.description}
          onUpdate={() => handleUpdate(item._id)}
          onDelete={() => handleDelete(item._id)}
          expanded={expandedCardId === item._id}
          onExpand={() => handleCardExpand(item._id)}
          onEdit={() => openEditForm(item)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#e5f3fd",
    color: "#fff",
    padding: 10,
    marginTop: 25,
  },
  formContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});
