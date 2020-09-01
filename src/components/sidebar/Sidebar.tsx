import React from 'react';

// Libs
import { useRecoilValue } from "recoil/dist";
import { sidebarState } from "../../global-state/atoms";

// TODO Refactor list into own component
/**
 * Sidebar of the app, displays shopping list
 */
function Sidebar() {
  const localState: any = useRecoilValue(sidebarState);

  return (
    <div className="w-1/3 bg-primary-light">
      <h1 className="text-2xl">Sidebar</h1>
      { localState.items.map((item: any) => (
        <h2>
          {
            item.name
          }
        </h2>
      ))}
    </div>
  );
}

export default Sidebar;