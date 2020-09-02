import React from 'react';

// Libs
import { Link } from 'react-router-dom';

/**
 * Simple navbar component
 */
// TODO refactor
function Navbar() {
  return (
    <nav className="w-24">
      <ul>
        <li>
          <Link to="/items">Items</Link>
        </li>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/statistics">Statistics</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;