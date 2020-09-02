import React, { useState, useEffect, useCallback } from "react";
import { format } from "date-fns";

import { useRecoilValue } from "recoil";
import { userState } from "../../App";
import List from "../../components/cards/List";

function HistoryPage() {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const user: any = useRecoilValue(userState);

  const fetchLists = useCallback(async () => {
    try {
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${user.token}`);

      const response = await fetch("http://localhost:3000/api/lists", {
        method: "GET",
        headers,
      });
      const { data } = await response.json();
      const sorted = sortByDate(data);

      setLists(() => sorted);
      console.log(sorted);
    } catch (e) {
      console.log("error", e);
    } finally {
      setLoading(false);
    }
  }, []);

  const sortByDate = (data: any) => {
    return data.reduce((acc: any, value: any) => {
      const date = format(new Date(value.created_at), "MMMM yyyy");

      if (acc.length === 0) {
        acc.push({
          date,
          lists: [].concat(value),
        });
      } else {
        const index: number = acc.findIndex((i: any) => i.date === date);
        if (index !== -1) {
          acc[index].lists.push(value);
        } else {
          acc.push({
            date,
            lists: [].concat(value),
          });
        }
      }
      // console.log("date", date);
      console.log("value", value);
      return acc;
    }, []);
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return (
    <div className="px-4 bg-gray-extra-light">
      <h1 className="text-4xl">Shopping History</h1>

      {loading && <div>Loading...</div>}
      {lists.map((item: any) => (
        <div className="mb-4" key={item.date}>
          <h3 className="text-2xl text-center mb-4">{item.date}</h3>
          <ul>
            {item.lists.map((list: any) => (
              <List key={list.id} list={list} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default HistoryPage;
