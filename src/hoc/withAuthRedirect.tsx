import React, { Component, ComponentType, FC } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router";
import { AppStateType } from '../redax/reduxStore';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
});

export function WithAuthRedirect<WCP>(WrappedComponent: ComponentType<WCP>) {
    const RedirectComponent: FC<MapPropsType & DispatchPropsType> = (props) => {
        const { isAuth, ...restProps } = props
        if (!isAuth) return <Redirect to='/Login' />;
        return <WrappedComponent {...restProps as WCP} />;
    }
    const ConnectAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>
        (mapStateToPropsForRedirect)(RedirectComponent);

    return ConnectAuthRedirectComponent;
}

type MapPropsType = {
    isAuth: boolean
}

type DispatchPropsType = {}