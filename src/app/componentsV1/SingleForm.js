'use client'
import StreamID from "./SingleFormPart.js/StreamID";
const SingleForm = ({ item }) => {
  //   console.log(item);

  return (
    <div>
       <StreamID item={item} />
      {/* {item.map((item, index, array) => {
        // Check if the current LineContent contains ':'
        const isColonPresent = item.LineContent.includes(":");

        // Check if the previous item LineContent contains ':'
        const previousItem = array[index - 1];
        const isPreviousColonPresent = previousItem
          ? previousItem.LineContent.includes(":")
          : false;

        // If the previous line has ':' skip the current line
        if (isPreviousColonPresent) {
          return null;
        }

        // If the current line has ':' and there is a next item, concatenate them
        const nextItem = array[index + 1];
        const combinedContent =
          isColonPresent && nextItem && !nextItem.LineContent.includes(":")
            ? `${item.LineContent} ${nextItem.LineContent}`
            : item.LineContent;

        return (
          <div key={combinedContent}>
            <p>{combinedContent}</p>
          </div>
        );
      })} */}
    </div>
  );
};

export default SingleForm;
