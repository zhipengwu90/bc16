"use client";
import SingleForm from "./SingleForm";
import All_data from "../../dataStorage/All_data.json";
import { useState } from "react";
const FormRender = () => {
  const [itemIndex, setItemIndex] = useState(0);
  const item1 = All_data[itemIndex];

  return (
    <div>
      <select onChange={(e) => setItemIndex(e.target.value)}>
        {All_data.map((item, index) => (
          <option key={index} value={index}>
            {index}
          </option>
        ))}
      </select>
      <SingleForm items={item1} />
    </div>
  );
};

export default FormRender;
