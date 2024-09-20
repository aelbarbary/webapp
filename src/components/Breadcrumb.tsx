// Breadcrumb.js

import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Breadcrumb = () => {
    const location = useLocation()
    const pathnames = location.pathname.split('/').filter((x) => x)

    return (
        <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
        >
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
            </Link>
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
                const isLast = index === pathnames.length - 1

                return isLast ? (
                    <Typography key={name} color="textPrimary">
                        {name}
                    </Typography>
                ) : (
                    <Link
                        key={name}
                        to={routeTo}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                        {name}
                    </Link>
                )
            })}
        </Breadcrumbs>
    )
}

export default Breadcrumb
