import { useEffect, useRef, useState } from "react"


export const useFetch = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null });

    useEffect(() => {
        return () => {
            isMounted.current = false;
        }
    }, [])

    useEffect(() => {

        setState({ data: null, loading: true, error: null });
        
        fetch( url )
            .then( resp => resp.json() )
            .then( data => {
                //compruebo si el componente sigue montado, porque si se llama el setSate y el componente se demontó da error
                if (isMounted.current) {
                    setState({
                        loading: false,
                        error: null,
                        data
                    })
                }
            })
            .catch( () => {
                setState({
                    loading: false,
                    error: 'error al obtener la información',
                    data: null
                })
            })
            
    }, [url])
        
    return state;
}
