import React from "react";

export interface Props {
  selectedOption: string;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterDropDown = ({ selectedOption, handleChange }: Props) => {
  return (
    <div className="container mt-3">
      <h2>Filter By</h2>
      <div className="form-group">
        <select
          id="fruitSelect"
          className="form-control" // Bootstrap class for form control
          value={selectedOption}
          onChange={handleChange}
        >
          <option value="All">All</option>
          <option value="completed">completed</option>
          <option value="uncompleted">uncompleted</option>
        </select>
      </div>
    </div>
  );
};

export default FilterDropDown;
