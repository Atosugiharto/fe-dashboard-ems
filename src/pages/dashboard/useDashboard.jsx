import { useEffect } from "react";
import { fetchData } from "../../slices/dataSlice";
import { useDispatch, useSelector } from "react-redux";

export const useDashboard = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  return {items, status, error};
}

