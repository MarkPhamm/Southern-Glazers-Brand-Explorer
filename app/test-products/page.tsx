
"use client"
import { useState, useEffect } from 'react'
import { supabase } from '../utils/supabase/supabase'

function Page() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {
      const { data: fetchedData } = await supabase.from('products').select() // Fetching from the test_table

      if (fetchedData.length > 0) {
        setData(fetchedData)
      }
    }

    getData()
  }, [])

  return (
    <div>
      {data.map((item) => (
        <li key={item.item_desc}> 
          {item.corp_item_brand_name} - {item.item_desc} 
        </li> // Displaying item_desc next to corp_item_brand_name
      ))}
    </div>
  )
}
export default Page