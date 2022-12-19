import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import React, { Component } from 'react'
import UserContainer from '../container/User'

export default class User extends Component {
    render() {
        return (
            <div>
                <Grid2
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '20vh', margin: '10vh' }}
                >
                    <UserContainer />
                </Grid2>
            </div>
        )
    }
}
