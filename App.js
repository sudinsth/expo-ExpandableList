import React, {useState, useEffect} from 'react';
import { 
  Text, 
  View, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager

} from 'react-native';
import Constants from 'expo-constants';

//Dummy Data
const content = [
  {
    isExpanded: false,
    category: 'Item 1',
    subcategory: [
      {id: 1, val: 'Sub 1'},
      {id: 2, val: 'Sub 2'}
    ]
  },
  {
    isExpanded: false,
    category: 'Item 2',
    subcategory: [
      {id: 3, val: 'Sub 3'},
      {id: 4, val: 'Sub 4'}
    ]
  },
  {
    isExpanded: false,
    category: 'Item 3',
    subcategory: [
      {id: 5, val: 'Sub 5'},
      {id: 6, val: 'Sub 6'}
    ]
  },
];

const ExpandableComponent = ({item, onClickFunction}) => {
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if(item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded])

  return (
    <View>
      <TouchableOpacity style={styles.item} onPress={onClickFunction}>
        <Text style={styles.itemText}>
          {item.category}
        </Text>
      </TouchableOpacity>
      <View style={{height: layoutHeight, overflow: 'hidden'}}>
        {
          item.subcategory.map((item, key) => (
            <TouchableOpacity key={key} style={styles.content}>
              <Text style={styles.text}>
                {key}.{item.val}
              </Text>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))
        }
      </View>
    </View>
  )
}

export default function App() {
  const [multiSelect, setMultiSelect] = useState(false);
  const [listData, setListData] = useState(content);

  if(Platform.OS === 'android' ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...listData];
    if(multiSelect) {
      array[index]['isExpanded'] = !array[index]['isExpanded'];
    } else {
      array.map((value,placeIndex) => 
        placeIndex === index
        ? (array[placeIndex]['isExpanded']) = !array[placeIndex]['isExpanded']
        : (array[placeIndex]['isExpanded']) = false
      );
    }
    setListData(array)
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.titleText}>
            Expandable List View
          </Text>
          <TouchableOpacity onPress={() => setMultiSelect(!multiSelect)}>
            <Text style={styles.headerButton}>
              {
                multiSelect ? 'Enable Single \n Expand' : 'Enable Multiple \n Expand'
              }
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {
            listData.map((item,key) => (
              <ExpandableComponent 
                item={item}
                key={item.category}
                onClickFunction={()=> {
                  updateLayout(key)
                }}
              />
            ))  
          }
        </ScrollView>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: {
    flexDirection: 'row',
    padding: 10,  
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerButton: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  item: {
    backgroundColor: 'yellow',
    padding: 20,
    borderColor: 'orange',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    padding: 10,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#c8c8c8',
    width: '100%',
  }
});
