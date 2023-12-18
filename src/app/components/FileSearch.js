"use client";
import React, { useState, useRef } from "react";
import styles from "./FileSearch.module.css";

function FileSearch(props) {
  const [searchResults, setSearchResults] = useState({
    area: "",
    waterbody: "",
    year: "",
  });

  const areaRef = useRef(null);
  const waterbodyRef = useRef(null);
  const yearRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setSearchResults({
      ...searchResults,
      [name]: trimmedValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSearch(searchResults);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setSearchResults({
      area: "",
      waterbody: "",
      year: "",
    });

    // Clear input values or select options
    areaRef.current.value = "";
    waterbodyRef.current.value = "";
    yearRef.current.value = "";

    props.onSearch({
      area: "",
      waterbody: "",
      year: "",
    });
  };

  return (
    <div className={styles.allWrapper}>
      <div className={styles.wrapper}>
        <label htmlFor="area">Area</label>
        <select id="area" name="area" onChange={handleChange} ref={areaRef}>
          <option defaultValue value="">
            All
          </option>
          <option value="area 2e">Area 2E</option>
          <option value="area 23">Area 23</option>
          {/* <option value="area1">Area 1</option>
          <option value="area2">Area 2</option>
          <option value="area3">Area 3</option> */}
        </select>
        <label htmlFor="waterbody">Waterbody</label>
        <input
          name="waterbody"
          onChange={handleChange}
          id="waterbody"
          type="text"
          placeholder="search name"
          ref={waterbodyRef}
        />
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          onChange={handleChange}
          type="number"
          placeholder="1990"
          ref={yearRef}
        />
      </div>
      <div className={styles.buttonBox}>
        <button className={styles.search} onClick={handleSubmit}>
          Search
        </button>
        <button className={styles.reset} onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default FileSearch;
