// 1. import “useReducer” hook
import React, { useState, useEffect, useReducer } from "react";
import { getPokemon } from "./api"

// 4.2. setup reducer function with state and action as args to produce a new state variable
function reducer(state, action) {
    // set conditions
    if (action.type === "startFetch") {
        return {data: null, status: "pending", error: null}
    } else if (action.type === "resolvedFetch") {
        return {data: action.payload, status: "resolved", error: null}
    } else if (action.type === "errorFetch") {
        return {data: null, status: "rejected", error: action.payload}
    }
    return state
}


function Pokemon({ name = "pikachu" }) {

    // multiple state variables
    // const [data, setData] = useState(null);
    // const [status, setStatus] = useState("idle"); // status of the fetch request -idle/pending/resolved/rejected
    // const [error, setError] = useState(null);     // to show error message
    // console.log({ status, error, data })

    // 2. call the useReducer hook, pass in reducer fn and initial state, it returns an array with state obj abd fn()
    // 3. assign useReducer to a destructure variable - an array with the initial state and dispatch()
    const [state, dispatch] = useReducer(reducer, {
        data: null,
        status: "idle",
        error: null
    })

    const {data, status, error} = state


    useEffect(() => {
        dispatch( {type: "startFetch"} ) // 4.1call dispatch() instead of setter()
        // setStatus("pending");
        getPokemon(name)
        .then((data) => {
            dispatch( {type: "resolvedFetch", payload: data} )
          // setData(data);
          // setStatus("resolved");
        })
        .catch((error) => {
            dispatch( {type: "errorFetch", payload: error} )
          // setError(error);
          // setStatus("rejected");
        });
    }, [name]);

    // got an error? display error status
    if (status === "rejected") {
        return (
            <pre>
                <code>{JSON.stringify(error, null, 2)}</code>
             </pre>
        );
    }

    // still fetching? display loading
    if (status !== "resolved") {
        return <p>Loading...</p>;
    }

    // all good! display pokemon
    return (
      <div>
        <h3>{data.name}</h3>
        <img src={data.sprite} alt={`${data.name} sprite`} />
      </div>
    );
}

export default Pokemon