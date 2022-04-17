import axios from "axios";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:3001";

// Import this wherever you make calls to backend
const AxiosBackend = axios.create({
  baseURL,
});

function getStorageValue(key, defaultValue) {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    console.log(saved);
    const initial = saved !== null ? JSON.parse(saved) : defaultValue;
    return initial;
  }
  return null;
}

function setStorageValue(key, value) {
  // setting stored value
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
  return null;
}

function setUserId(userId) {
  setStorageValue("currUserId", { id: userId });
}

function getUserId() {
  try {
    const { id: userId } = getStorageValue("currUserId", null);
    return userId;
  } catch (err) {
    return null;
  }
}

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    // storing input name
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export {
  setStorageValue,
  getStorageValue,
  useLocalStorage,
  setUserId,
  getUserId,
  AxiosBackend,
};
