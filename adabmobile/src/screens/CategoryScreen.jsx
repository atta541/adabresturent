import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

// Cache object to store API responses
const apiCache = {};

const CategoryScreen = ({ route }) => {
  const { category } = route.params;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    if (apiCache[category]) {
      setItems(apiCache[category]);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `http://192.168.1.4:5000/api/subItems/with-item-details?category=${category}`
      );
      const data = await response.json();
      setItems(data);
      apiCache[category] = data; 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleAddToCart = useCallback((item) => {
    console.log("Added to cart:", item.name);
  }, []);

  const renderItem = useMemo(
    () =>
      ({ item }) =>
        (
          <View style={styles.item}>
            <Image source={{ uri: item.picture }} style={styles.image} />
            <View style={styles.details}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>Price: PKR {item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        ),
    [handleAddToCart]
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
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
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 15,
  },
  details: {
    flex: 1,
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