import React, { useEffect, useState } from 'react';

// Libs
import { useRecoilValue } from "recoil/dist";
import { userState } from "../../App";
import { v4 as uuidv4 } from 'uuid';
import Item from "../../components/cards/Item";


interface List {
  category: string;
  items: Array<any>;
}

// TODO refactor, example of a bad component. Refactor the logic into its own components
/**
 * Simple items page component
 */
function ItemsPage() {

  const user = useRecoilValue(userState);

  // Local state
  const [lists, setLists] = useState([]);

  useEffect(() => {

    async function getItems() {
      const headers = new Headers();
      headers.append('Authorization', `Bearer ${user.token}`);

      const response = await fetch('http://localhost:3000/api/items', {
        method: 'GET',
        headers
      });
      const { status, data } = await response.json();

      console.log(data);

      if(status === 'success' && data) setLists(data)
    }

    if(user.token && user.valid) {
      // Fetch items
      getItems();
    }
  }, [])

  return (
    <div className="bg-gray-extra-light px-20">
      <h1 className="text-4xl mb-5">Items page</h1>
      <ul>
        {
          lists.map((list: List) => (
            <li key={uuidv4()} className="mb-5">
              <h3 className="text-2xl font-bold">{ list.category}</h3>
              { list.items.length > 0 && (
                <ul className="grid grid-cols-4 gap-5">
                  {
                    list.items.map((item: any) => (
                      <Item
                        data={item}
                        key={uuidv4()}
                      />
                    ))
                  }
                </ul>
              )}
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default ItemsPage;