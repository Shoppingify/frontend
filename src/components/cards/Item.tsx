import React from 'react';

// Icons TODO check if correct
import { FaPlus } from 'react-icons/fa';

// TODO how to handle long item names? Fix word breaking
// TODO how to align plus symbol to the item name, multilines item name issue
function Item({ data: { name, note, id, image } }: any) {
  return (
    <button className="bg-white rounded-lg flex justify-between p-4">
      <h4 className="font-medium flex-grow-1 break-all pr-4">{ name }</h4>
      <FaPlus className="w-1/6" />
    </button>
  );
}

export default Item;