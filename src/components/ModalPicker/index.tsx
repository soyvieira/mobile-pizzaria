import React from "react";
import { 
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';

import { CategoryProps }  from '../../pages/Order';

interface ModalPickerProps {
  options: CategoryProps[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoryProps) => void;
}

const { width , height } = Dimensions.get('window');

export function ModalPicker ( { options, handleCloseModal, selectedItem }: ModalPickerProps){

  function onPressItem(item: CategoryProps ){
    selectedItem(item);
    handleCloseModal();
  }

  const option = options.map( (item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={ () => onPressItem(item)}>
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))

  return(
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.container}>
        <Text style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {option}
          </ScrollView>
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingLeft: 15,
    paddingTop: 90,
  },
  content:{
    width: '92%',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  option:{
    alignItems: 'flex-start',
  },
  item:{
    margin: 12,
    fontSize: 18,
    color: '#000'
  }
})