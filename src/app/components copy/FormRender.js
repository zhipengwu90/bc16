import SingleForm from "./SingleForm";
import All_data from "../../dataStorage/All_data.json";
const FormRender = () => {
  const item1 = All_data[0].Pages[0].Lines;

  return (
    <div>
      <SingleForm item={item1} />
    </div>
  );
};

export default FormRender;
