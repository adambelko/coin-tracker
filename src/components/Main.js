import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

const Main = () => {
    const StyledMain = styled``

    return ( 
        <StyledMain>
            <Routes>
                <Route to="/">
                    <Route index element={} />
                </Route>
                <Route to="/Cryptocurrencies">
                    <Route element={} />
                </Route>
                <Route to="/News">
                    <Route index element={} />
                </Route>
                <Route to="/Portfolio">
                    <Route index element={} />
                </Route>
            </Routes>
        </StyledMain>
     );
}
 
export default Main;