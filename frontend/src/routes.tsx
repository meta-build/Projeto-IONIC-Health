import { BrowserRouter, Route, Routes } from "react-router-dom";
import {Home} from "./pages";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}