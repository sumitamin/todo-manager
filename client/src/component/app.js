import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Header } from './common/header'

 const AppLayout = (props) => {

    useEffect(() => {
        if (window.location.pathname !== '/login' && window.location.pathname !== '/signup' && !localStorage.getItem('utoken')){
            window.location.href = '/login'
        }else if (window.location.pathname !== '/task' && window.location.pathname !== '/archive-task' && localStorage.getItem('utoken')){
            window.location.href = '/task'
        }
        
    })

    return (
        <div onContextMenu={(e)=> e.preventDefault()}>
            <Header />
            <div className="container main-body" >
                {props.children}
            </div>
        </div>
    )
}

// const mapStateToProps = state => ({
//     router: state.router,
//     interaction: state.interaction,
//     interactionVideos: state.interactionVideos,
// });

// export default withRouter(connect(mapStateToProps)(AppLayout));
export default AppLayout;