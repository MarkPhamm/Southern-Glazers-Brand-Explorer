"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/supabase'

function Page() {
  const [data, setData] = useState([])
  const [recommendations, setRecommendations] = useState([])

  // Fetch data from Supabase on component mount
  useEffect(() => {
    async function getData() {
      const { data: fetchedData, error } = await supabase.from('products').select('*')
      if (error) {
        console.error("Error fetching data:", error)
      } else if (fetchedData) {
        setData(fetchedData)
      }
    }
    getData()
  }, [])

  // Function to calculate similarity and get recommendations
  function recommendWines(itemDesc) {
    const selectedWine = data.find(item => item.item_desc === itemDesc)
    if (!selectedWine) {
      console.error("Item description not found.")
      return
    }

    const features = ['alcohol_percentage', 'sweetness_level', 'bitterness_level', 'acidity_level', 'tannin_level', 'serving_temperature', 'price']

    // Calculate similarity scores
    const recommendations = data.map(item => {
      const similarity = features.reduce((acc, feature) => {
        const diff = (item[feature] || 0) - (selectedWine[feature] || 0)
        return acc + diff ** 2
      }, 0)

      return { ...item, similarity: Math.sqrt(similarity) }
    })

    // Sort by similarity score in ascending order (lower is more similar) and take the top 3
    const topRecommendations = recommendations
      .filter(item => item.item_desc !== itemDesc) // Exclude the selected wine itself
      .sort((a, b) => a.similarity - b.similarity)
      .slice(0, 3)

    setRecommendations(topRecommendations)
  }

  useEffect(() => {
    // Run recommendations on a specific wine description
    if (data.length > 0) {
      recommendWines('-196 CKTL VOD DBL LEM 12 CAN 6/4PK')
    }
  }, [data])

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {data.map((item) => (
          <li key={item.item_desc}>
            {item.corp_item_brand_name} - {item.item_desc}
          </li>
        ))}
      </ul>

      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((item) => (
          <li key={item.item_desc}>
            {item.corp_item_brand_name} - {item.item_desc} (${item.price.toFixed(2)})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page
