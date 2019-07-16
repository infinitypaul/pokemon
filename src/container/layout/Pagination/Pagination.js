import React, { useEffect} from 'react'
import cx from 'classnames';
import classes from './Pagination.module.css';

const Pagination = props => {
    const paginateHandler = (url) => {
        props.history.push('?'+url);
    };
    useEffect(() => {
        const url = props.location.search.split('?');
        if(props.location.search){
            props.onClick(url[1]+'?'+url[2]);
        }
    }, [props.location.search]);
    return <React.Fragment>
        <ul className="pagination">
            <li className={"page-item" + (props.previous === null ? ' disabled' : null) }>
                <span className={cx("page-link", classes.page)} onClick={() => props.onClick() }>
                        First
                    </span>
            </li>
            { (props.previous === null) ? (
                <li className="page-item disabled">
                    <span
                        className={cx("page-link", classes.page)}
                         >Previous</span></li>
            ) : (
                <li className="page-item">
                    <span className={cx("page-link", classes.page)} onClick={() => paginateHandler(props.previous) }>
                        Previous
                    </span>
                    </li>
            )}

            { (props.next === null) ? (
                <li className="page-item disabled">
                    <span
                        className={cx("page-link", classes.page)}
                        >Next</span></li>
            ) : (
                <li className="page-item">
                    <span className={cx("page-link", classes.page)} onClick={() => paginateHandler(props.next) }>
                        Next
                    </span>
                </li>
            )}
            <li className={"page-item" + (props.next === null ? ' disabled' : null) }>
                <span className={cx("page-link", classes.page)} onClick={() => paginateHandler('pokemon?offset=952&limit=12') }>
                        Last
                    </span>
            </li>
        </ul>
    </React.Fragment>
};

export default Pagination;