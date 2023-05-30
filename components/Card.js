import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
const Card = ({
  name,
  price,
  category,
  description,
  onDelete,
  expanded,
  onExpand,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>Price: {price}</Text>
      <Text style={styles.category}>Category: {category}</Text>
      {expanded && <Text style={styles.description}>{description}</Text>}

      <View style={styles.buttonContainer}>
        <Button title="Actualizar" onPress={onEdit} />
        <Button title="Eliminar" onPress={onDelete} />
      </View>

      <View style={styles.expandButtonContainer}>
        <Button title={expanded ? "Colapsar" : "Expandir"} onPress={onExpand} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
    elevation: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  expandButtonContainer: {
    marginTop: 10,
  },
});

export default Card;
