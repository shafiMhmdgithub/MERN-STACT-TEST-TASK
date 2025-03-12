import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userSliceActions } from '../../redux/userSlice';
import { fetchStatusSliceActions } from '../../redux/fetchStatusSlice';
const FetchAllUsers = () => {
    const fetchStatus = useSelector((store) => store.fetchStatus);
    
    const dispatch = useDispatch();
      useEffect(() => {
        if (fetchStatus.fetchDone) return;
    
        const controller = new AbortController();
        const signal = controller.signal;
    
        dispatch(fetchStatusSliceActions.markFetchingStarted());
    
        fetch("http://localhost:8080/api/get-users", { signal })
      .then((res) => res.json())
      .then((users) => {
        console.log("Fetched data:", users); // Add this line
        dispatch(fetchStatusSliceActions.markFetchDone());
        dispatch(fetchStatusSliceActions.markFetchingFinished());
        dispatch(userSliceActions.addNewUser(users)); 
      })
      .catch((error) => {
        console.error('Fetch error:', error);
      });
    
    
        // Cleanup on component unmount or dependency change
        return () => {
          controller.abort();
        };
      }, [fetchStatus]);  // Ensure `dispatch` is in the dependency array
    
  return (
    <>Here Fetching..</>
  )
}

export default FetchAllUsers;