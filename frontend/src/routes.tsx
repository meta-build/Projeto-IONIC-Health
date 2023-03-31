import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home, Tests} from "./pages";
import Menu from "./components/Menu";

export default function AppRouter() {
    return (
        <>
            <Menu />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/tests' element={<Tests />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}