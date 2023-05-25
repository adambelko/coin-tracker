import Navlinks from "./Navlinks";
import "../../styles/Navigation.scss";

const Navigation = ({ scrollDown }) => {
    return (
        <nav className="navigation">
            <Navlinks scrollDown={scrollDown} />
        </nav>
    );
};

export default Navigation;
