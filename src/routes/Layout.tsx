import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

const SIDEBAR_WIDTH = 300

function Layout() {
  return (
    <Box>
      <Box sx={{
        position: 'fixed',
        left: 0,
        width: SIDEBAR_WIDTH
      }} >side bar</Box>
      <Box
        sx={(theme) => ({
          minHeight: '100vh',
          width: '100vw',
          paddingLeft: SIDEBAR_WIDTH + 'px'
        })}
      ><Outlet/>
      </Box>
    </Box>
  )
}

export default Layout
