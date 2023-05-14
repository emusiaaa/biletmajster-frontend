import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import BookOnlineRoundedIcon from '@mui/icons-material/BookOnlineRounded';
import EventIcon from '@mui/icons-material/Event';
import { useRouter } from 'next/router';
import { Person } from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import { sessionTokenState } from '../recoil/sessionTokenState';

interface Page {
    title: string,
    url: string
}
export const pages: (Page)[] = [
    {
        title: "Add new event",
        url: "/events/add"
    },
    {
        title: "My events",
        url: "/events/my"
    }]
function ResponsiveAppBar() {
    const setSessionToken = useSetRecoilState(sessionTokenState);
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const router = useRouter();
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="fixed" sx={{ bgcolor: '#538D7A' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters >
                    <img
                        src="/favicon.svg"
                        alt="BiletMajster"
                        style={{
                            width: '40px'
                        }}
                    />
                    <Typography
                        noWrap
                        sx={{
                            display: { xs: 'flex', md: 'flex' },
                            fontWeight: 600,
                            color: 'white',
                            mr: 4
                        }}
                    >
                        &nbsp;BiletMajster
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                variant="contained"
                                key={page.title}
                                onClick={() => {
                                    if (!(router.route === page.url))
                                        router.push(page.url);
                                    handleCloseNavMenu();
                                }}
                                sx={{
                                    my: 2, color: 'white', display: 'block',
                                    bgcolor: '#73A896', mr: '10px', ":hover": { bgcolor: '#A2ADCD' }
                                }}
                            >
                                {page.title}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar>
                                    <Person />
                                </Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={() => {
                                setSessionToken(undefined);
                                router.push('/login');
                                console.log("clicku")
                            }}>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
