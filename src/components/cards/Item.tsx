import React from 'react';

// Icons TODO check if correct
import { FaPlus } from 'react-icons/fa';

// Recoil
import { useRecoilState } from "recoil/dist";
import { sidebarState } from "../../global-state/atoms";

// TODO how to handle long item names? Fix word breaking
// TODO how to align plus symbol to the item name, multilines item name issue
// TODO check if this card is reused somewhere else, if it is reconsider onClick function
/**
 *
 * Component that displays a simple card for single item
 * When clicking the button it adds a new item to the sidebar state
 *
 * @param {string} name
 *  Name of the item
 * @param {string} note
 *  Note of the item
 * @param {string} id
 *  Id of the item
 * @param {string} image
 *  Image src of the item
 */
function Item({ data: { name, note, id, image } }: any) {

  const [sidebarValues, setSidebarValues] = useRecoilState(sidebarState);

  function handleClick() {


    setSidebarValues((current: any) => {
      const currentItem = { name, note, id, image }
      const newItems = [...current.items];
      newItems.push(currentItem)

      return {
        ...current,
        items: newItems
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      className="bg-white rounded-lg flex justify-between p-4"
    >
      <h4 className="font-medium flex-grow-1 break-all pr-4">{ name }</h4>
      <FaPlus className="w-1/6" />
    </button>
  );
}

export default Item;