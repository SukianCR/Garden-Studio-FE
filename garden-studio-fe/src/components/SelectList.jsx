import React from "react";

export default function SelectList({
  theList,
  theListName,
  theParentForm,
  onChangeFunction,
  theCurrentValue,
  theFieldName,
  the2FieldName,
}) {
  const ConsoleTheSelected = (e) => {
    console.log(e.target.value);
  };

  return (
    <div className="col-12  ">
      {/*<label
        htmlFor={`${theListName}_${theParentForm}`}
        className="form-label mt-4"
      >
        {`${theListName}`}
      </label>*/}
      <select
        className=" form-control   w-100 p-2"
        name={theListName}
        id={`${theListName}_${theParentForm}`}
        onChange={onChangeFunction || ConsoleTheSelected}
        value={theCurrentValue}
      >
        {theList && theList.length > 0
          ? theList?.map((opt) => {
              return (
                // eslint-disable-next-line react/jsx-key
                <option value={String(opt?.id)} key={String(opt?.id)}>
                  {opt[theFieldName] +
                    ((opt[the2FieldName] && " (" + opt[the2FieldName] + ")") ||
                      " ")}
                </option>
              );
            })
          : "<option>No items</option>"}
      </select>
    </div>
  );
}
