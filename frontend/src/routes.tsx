import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./pages";
import Menu from "./components/Menu";

export default function AppRouter() {
    return (
        <>
            <Menu />
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}