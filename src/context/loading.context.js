import { createContext, useState } from "react";
import axios from 'axios'

const LoadingContext = createContext()

const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [notes, setNotes ] = useState([])

    const getNotes = () => {
        
        axios.get("https://ih-countries-api.herokuapp.com/countries")
            .then((results) => {
                setNotes(results.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <LoadingContext.Provider value={{ notes, user, isLoading, setIsLoading, setUser, getNotes }} >
            {children}
        </LoadingContext.Provider>
    )

}

export { LoadingContext, LoadingProvider }