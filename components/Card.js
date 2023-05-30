import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Card = ({ name, price, category, description, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Price: {price}</Text>
      <Text style={styles.category}>Category: {category}</Text>
      <Text style={styles.description}>{description}</Text>
      <Button title="Update" onPress={onUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    marginBottom: 3,
  },
  category: {
    fontSize: 16,
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
  },
});

export default Card;
