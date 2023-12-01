import { Outlet, Link } from 'react-router-dom';
import { Fragment } from 'react';
import './navigation-route-styles.scss'

const Nav = () => {
    return (
        <Fragment>
            <div className="row m-0 justify-content-center mt-3">
                <Link to='/' className="navlink col-auto mx-2">Home</Link>
                <Link to='/posts' className='navlink col-auto mx-2'> Posts</Link>
            </div>
            <Outlet />
        </Fragment>
    )
}

export default Nav;