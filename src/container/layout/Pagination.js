import React, { useEffect} from 'react'

const Pagination = props => {
    const paginateHandler = (url) => {
        props.history.replace('?'+url);
    };
    useEffect(() => {
        console.log('meeed');
        const url = props.location.search.split('?');
        if(props.location.search){
            props.onClick(url[1]+'?'+url[2]);
            console.log(url)
        }
    }, [props.location.search]);
    return <React.Fragment>
        <ul className="pagination">
            <li className={"page-item" + (props.previous === null ? ' disabled' : null) }>
                <span className="page-link" onClick={() => props.onClick() }>
                        First
                    </span>
            </li>
            { (props.previous === null) ? (
                <li className="page-item disabled">
                    <a
                        className="page-link"
                        href="#" >Previous</a></li>
            ) : (
                <li className="page-item">
                    <span className="page-link" onClick={() => paginateHandler(props.previous) }>
                        Previous
                    </span>
                    </li>
            )}

            { (props.next === null) ? (
                <li className="page-item disabled">
                    <a
                        className="page-link"
                        href="#" >Next</a></li>
            ) : (
                <li className="page-item">
                    <span className="page-link" onClick={() => paginateHandler(props.next) }>
                        Next
                    </span>
                </li>
            )}
            <li className={"page-item" + (props.next === null ? ' disabled' : null) }>
                <span className="page-link" onClick={() => paginateHandler('pokemon?offset=952&limit=12') }>
                        Last
                    </span>
            </li>
        </ul>
    </React.Fragment>
};

export default Pagination;