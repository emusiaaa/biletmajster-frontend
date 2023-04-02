import ResponsiveAppBar from "@/components/ResponsiveAppBar";
import {useRecoilState} from "recoil";
import {drawerWide} from "../recoil/drawerState";
import Box from "@mui/material/Box";
import {CssBaseline} from "@mui/material";


export const PageLayout = (props:any) => {
    //const [wideList, setWideList] = useRecoilState(drawerWide);
    return (
        <>
            <ResponsiveAppBar/>
       </>
    )
}

export default PageLayout