import React from "react";

function InputControl(props) {
  return (
    <div className="flex flex-col gap-8">
      {props.label && (
        <label className="font-bold text-base text-gray-700">
          {props.label}
        </label>
      )}
      <input
        type="text"
        {...props}
        className="border rounded-md border-gray-300 outline-none px-4 py-2 text-black transition duration-150"
      />
    </div>
  );
}

export default InputControl;
