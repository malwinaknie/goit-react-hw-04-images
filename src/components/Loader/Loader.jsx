import React, { Component } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import css from './loader.module.css';

export default class LoaderSpinner extends Component {
    render() {
        return(
            <div className={css.Loader}>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }
}