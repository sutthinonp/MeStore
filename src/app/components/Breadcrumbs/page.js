import React from "react";

function Page() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="text-sm breadcrumbs p-2">
        <ul>
          <li>
            <a>Shop all</a>
          </li>
          <li>
            <a>Ready to ship</a>
          </li>
          <li>
            <a>Shoes</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Page;
