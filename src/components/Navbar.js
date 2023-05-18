
const Navbar = ({menuOnClick}) => {
    return (
        <nav id="navbar">
            <div onClick={menuOnClick}>
                <i className="fa-solid fa-bars"></i>
            </div>
            <div>
                <h3>launchPad&emsp;<i className="fa-brands fa-space-awesome"></i></h3> 
            </div>
            <div>
                <i className="fa-solid fa-gear"></i>
            </div>
        </nav>
    )
}

export default Navbar;