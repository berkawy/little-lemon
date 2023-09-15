// Used to populate data for flatlist component in home screen

export function getFlatListData(data) {
    let result = [];
    data.forEach((item) => {
        result.push({
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image,
            category: item.category,
        });
    });
    return result;
  }
  