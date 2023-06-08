import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput, 
  Modal,
  FlatList
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker';
import { ListItem } from '../../components/ListItem';

type RouteDetailParams = {
  Order:{
    number: string | number;
    order_id: string;
  }
}
export type CategoryProps = {
  id:string;
  name: string;
}

export type ProductsProps = {
  id:string;
  name: string;
}

type ItemProps ={
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order(){
  const route = useRoute<OrderRouteProps>();
  const navigation= useNavigation();

  const [ category, setCategory ] = useState<CategoryProps[] | []>([]);
  const [ categorySelected, setCategorySelected ] = useState<CategoryProps | undefined>();
  const [ modalCategoryVisible, setModalCategoryVisible ] = useState(false);

  const [ products , setProducts ] = useState<ProductsProps[] | []>([]);
  const [ productSelected , setProductSelected ] = useState<ProductsProps | undefined>();
  const [ modalProductVisible, setModalProductVisible ] = useState(false);

  const [ amount, setAmount ] = useState('1');

  const [ items, setItems ] = useState<ItemProps[]>([]);

  useEffect( () => { 
    async function loadInfo() {
      const response = await api.get('/category');

      setCategory(response.data);
      setCategorySelected(response.data[0]);
    }
    loadInfo();
   }, []);

   useEffect( () => {
    async function loadProducts() {
      const response = await api.get('/category/product', {
        params: {
          category_id: categorySelected?.id
        }
      })
      setProducts(response.data);
      setProductSelected(response.data[0]);
    }
    loadProducts();
   }, [categorySelected]);

  async function handleCloseOrder(){
    try{
      await api.delete('/order', {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack();

    }catch(err){
      console.log(err);
    }
  }

  function handleChangeCategory(item: CategoryProps){
    setCategorySelected(item);
  }

  function handleChangeProduct(item: ProductsProps){
    setProductSelected(item);
  }

  async function handleAdd(){
    const response = await api.post('/order/add', {
      order_id: route.params?.order_id,
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    let data = {
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }

    setItems(oldArray => [...oldArray, data])
  }

  async function handleDeleteItem(item_id: string){
    await api.delete('/order/remove', {
      params:{
        item_id: item_id
      }
    })

    let removeItem = items.filter( item => {
      return (item.id !== item_id)
    })

    setItems(removeItem)

  }

  return(
    <ImageBackground 
      source={require('../../assets/background-image.jpg')} 
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          Table {route.params.number}
        </Text>

        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name='trash-2' size={30} color='#EC5453' />
          </TouchableOpacity>
        )}
      </View>

      {category.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setModalCategoryVisible(true) }>
          <Text style={{color: '#000', fontSize: 18}}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>
      )}

      {products.length !== 0 && (
        <TouchableOpacity style={styles.input} onPress={ () => setModalProductVisible(true) }>
        <Text style={{color: '#000', fontSize: 18}}>
          {productSelected?.name}
        </Text>
      </TouchableOpacity>
      )}

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Amount</Text>
        <TextInput
          placeholder='1'
          placeholderTextColor='#000'
          keyboardType='numeric'
          style={[styles.input, {width: '70%', textAlign: 'center', fontSize: 18}]}
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.buttonAdd} onPress={handleAdd}>
          <Text style={styles.buttonAddText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, {opacity: items.length ===0 ? 0.3 : 1}]}
          disabled={items.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList 
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}
        keyExtractor={ (item) => item.id }
        renderItem={ ({item}) => <ListItem data={item} deleteItem={handleDeleteItem} /> }
      />

      {/** Modal for categories */}
      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType='fade'
      >
        <ModalPicker
          handleCloseModal={ () => setModalCategoryVisible(false) }
          options={category}
          selectedItem={ handleChangeCategory }
        />
      </Modal>

      {/** Modal for products from a category */}
      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType='fade'
      >
        <ModalPicker
          handleCloseModal={ () => setModalProductVisible(false) }
          options={products}
          selectedItem={ handleChangeProduct }
        />
      </Modal>      

    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: '10%',
    paddingEnd: '8%',
    paddingStart: '8%', 
    backgroundColor: '#b8e7f4'
  },
  header:{
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 30,
  },
  title:{
    fontSize: 30,
    fontWeight: '300',
    color: '#f5f5f5',
    paddingRight: 30
  }, 
  input:{
    backgroundColor: '#f5f5f5',
    marginBottom: 25,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#000',
    width: '100%',
    height: 40,
    justifyContent: 'center',
  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText:{
    fontSize: 18,
    color: '#fff'
  },
  actions:{
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 30
  },
  buttonAdd:{
    backgroundColor: '#086500',
    borderRadius: 8,
    height: 40,
    width: '25%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonAddText:{
    color: '#f5f5f5',
    fontSize: 22,
    fontWeight: 'bold'
  },
  button:{
    backgroundColor: '#EC5453',
    width: '70%',
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText:{
    color: '#f5f5f5',
    fontSize: 18,
    fontWeight: '600'
  }
})