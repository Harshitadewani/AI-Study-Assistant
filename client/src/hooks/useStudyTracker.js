import { useEffect, useRef } from "react";
import axios from "axios";

const useStudyTracker = () => {
  const startTimeRef = useRef(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    startTimeRef.current = Date.now();

    return () => {
      const endTime = Date.now();
      const minutes = (endTime - startTimeRef.current) / 1000 / 60;

      if (minutes > 0.5) { // ignore very short time
        saveTime(minutes);
      }
    };
  }, []);

  const saveTime = async (minutes) => {
    try {
      await axios.post("/api/study/add", {
        userId,
        hours: minutes / 60,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export default useStudyTracker;