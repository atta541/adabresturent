import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://10.0.2.2:5000/api/subItems/with-item-details?category=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
        setLoading(false);
      });
  }, [category]);

  // Function to handle "Add to Cart" button press
  const handleAddToCart = (item) => {
    console.log("Added to cart:", item.name);
    // Add your logic here to handle adding the item to the cart
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>{category}</Text> */}
      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              {/* Image on the left */}
              <Image source={{ uri: item.picture }} style={styles.image} />

              {/* Details on the right */}
              <View style={styles.details}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>Price: PKR {item.price.toFixed(2)}</Text>

                {/* Add to Cart Button */}
                <TouchableOpacity
                  style={styles.addToCartButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "start",
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 7,
  },
  item: {
    backgroundColor: "#222",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center vertically
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15, // Space between image and text
  },
  details: {
    flex: 1, // Take remaining space
  },
  itemName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "#bbb",
    fontSize: 14,
    marginBottom: 5,
  },
  price: {
    color: "#FF5733",
    fontSize: 16,
    fontWeight: "bold",
  },
  addToCartButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",

  },
});

export default CategoryScreen;