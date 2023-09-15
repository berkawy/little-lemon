// Component responsible for displaying buttons of filtering in the home page

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useFilter } from "../utils/FilterContext";

function Order({ menuData }) {
    const { setActiveCategories } = useFilter();

    const [category] = React.useState([]);

    const [categorySelected, setCategorySelected] = React.useState([])

    // Function to handle the press of the filter buttons
    const handlePress = async (index) => {
        const updatedSelection = [...categorySelected];
        updatedSelection[index] = !updatedSelection[index];
        setCategorySelected(updatedSelection);
        let selectedCategories = [];
        updatedSelection.forEach(
            (item, index) => {
                if (item == true) {
                    selectedCategories.push(category[index]);
                }
            }
        )
        setActiveCategories(selectedCategories)

    }

    // Function to populate the category array
    React.useEffect(() => {
        const populateCategory = () => {
            menuData.map(
                (item) => {
                    if (!category.includes(item.category)) {
                        category.push(item.category);
                        categorySelected.push(false);
                    }
                }
            )
        }
        populateCategory();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>ORDER FOR DELIVERY!</Text>
            <View style={styles.topContainer}>
                {
                    category.map(
                        (item, index) => (
                            <Pressable style={categorySelected[index] ? styles.selected : styles.textContainer} key={index} onPress={() => handlePress(index, item)}>
                                <Text style={categorySelected[index] ? styles.selectedText : styles.sectionText}>{item}</Text>
                            </Pressable>

                        )
                    )
                }
            </View>
            <View style={styles.horizontalLine}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 0.35,
        backgroundColor: "#FFFFFF",
        width: "100%",
        justifyContent: 'flex-start',
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'karla-extra-bold',
        padding: 20,
    },
    topContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    textContainer: {
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: "#e6e6e6",
        borderRadius: 10,
    },
    sectionText: {
        fontSize: 16,
        fontFamily: 'karla-extra-bold',
        padding: 8,
    },
    horizontalLine: {
        borderBottomColor: '#e3e3e3',
        borderBottomWidth: 1,
        marginTop: 40,
    },
    selected: {
        marginTop: 10,
        marginLeft: 20,
        backgroundColor: "#686868",
        borderRadius: 10,
    },
    selectedText: {
        fontSize: 16,
        fontFamily: 'karla-extra-bold',
        padding: 8,
        color: "#FFFFFF",
    }
});

export default Order;