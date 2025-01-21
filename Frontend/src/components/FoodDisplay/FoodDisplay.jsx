import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreCotext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {
    const {food_list} = useContext(StoreCotext)
    let updatedList = food_list.reverse()
    
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes for you</h2>
      <div className="food-display-list">
        {updatedList.map((item, index)=>{
            if(category==="All" || category === item.category){
                return(
                    <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                )
            }  
        })}
      </div>
    </div>
  )
}

export default FoodDisplay
