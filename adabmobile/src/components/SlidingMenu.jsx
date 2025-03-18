import React, { useEffect, useState } from "react";
import { 
  View, Text, ScrollView, TouchableOpacity, StyleSheet, 
  ActivityIndicator, Image, 
  
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Base_URL from "../../Base_URL";


const SlidingMenu = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
 
  useEffect(() => {
    fetch(`${Base_URL}/api/items`)
      .then((response) => response.json()) 
      .then((data) => {
        setCategories(data);   
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  return ( 
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FF5733" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {categories.map((item) => (
            <TouchableOpacity 
              key={item._id} 
              style={styles.categoryButton} 
              activeOpacity={0.8}
              onPress={() => navigation.navigate("CategoryScreen", { category: item.name })}
            >
              <Image source={{ uri: item.picture }} style={styles.categoryImage} />
              <Text style={styles.categoryText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    paddingVertical: 10,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  categoryButton: {
    alignItems: "center",
    marginRight: 15,
  },
  categoryImage: {
    width: 80,  
    height: 80, 
    borderRadius: 10,
  },
  categoryText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
    textTransform: "capitalize",
  },
});

export default SlidingMenu;
