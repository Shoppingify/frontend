import React, { useEffect, useState } from 'react';

// Libs
import { useRecoilValue } from "recoil/dist";
import { userState } from "../../App";

interface List {
  category: string;
  items: Array<any>;
}

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
    <div>
      <h1 className="text-4xl">Items page</h1>
      <ul>
        {
          lists.map((list: List) => (
            <li key={list.category}>
              { list.category}
              { list.items.length > 0 && (
                <ul>
                  {
                    list.items.map((item: any) => (
                      <li>
                        {
                          item.name
                        }
                      </li>
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