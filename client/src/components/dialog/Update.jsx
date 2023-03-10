import React, { Component } from 'react'

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    FormControl,
    InputLabel,
    InputAdornment,
    Input,
    Button,
    Select,
    MenuItem,
    Alert,
} from '@mui/material'
import {
    Visibility,
    VisibilityOff,
    Add,
    EditRounded,
} from '@mui/icons-material'
import moment from 'moment'
export default class Update extends Component {
    state = {
        showPassword: false,
        id: '',
        username: '',
        password: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        userStatus: '',
        alertMessage: '',
        openAlert: 'none',
    }

    componentDidUpdate() {
        if (this.props.id !== this.state.id) {
            this.setState({
                id: this.props.id,
                username: this.props.username,
                password: this.props.password,
                dateOfBirth: this.props.dateOfBirth,
                userStatus: this.props.userStatus,
            })
        }
    }

    onChangeInput = e =>
        this.setState({
            [e.target.name]: e.target.value,
        })

    handleClickOpenAlert = () => {
        this.setState({ openAlert: '' })
    }

    handleCloseAlert = () => {
        this.setState({ openAlert: 'none' })
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: this.state.showPassword ? false : true })
    }

    render() {
        return (
            <div>
                <Dialog
                    open={
                        this.props.openUpdate ||
                        this.props.openRead ||
                        this.props.openCreate
                    }
                    onClose={() => {
                        this.props.handleCloseUpdate()
                        this.handleCloseAlert()
                    }}
                >
                    <DialogTitle>{this.props.dialogName}</DialogTitle>
                    <DialogContent>
                        <FormControl
                            sx={{ m: 1, width: '95%' }}
                            variant="standard"
                        >
                            <InputLabel>T??n ????ng nh???p *</InputLabel>
                            <Input
                                autoFocus
                                id="username"
                                type={'text'}
                                name="username"
                                value={this.state.username}
                                onChange={this.onChangeInput}
                                disabled={this.props.openCreate ? false : true}
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '95%' }}
                            variant="standard"
                        >
                            <InputLabel>M???t Kh???u *</InputLabel>
                            <Input
                                id="password"
                                name="password"
                                value={this.state.password}
                                onChange={this.onChangeInput}
                                disabled={this.props.openRead ? true : false}
                                type={
                                    this.state.showPassword
                                        ? 'text'
                                        : 'password'
                                }
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={
                                                this.handleClickShowPassword
                                            }
                                            onMouseDown={
                                                this.props
                                                    .handleMouseDownPassword
                                            }
                                        >
                                            {this.state.showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl
                            sx={{ m: 1, width: '95%' }}
                            variant="standard"
                        >
                            <InputLabel shrink>Ng??y sinh</InputLabel>
                            <Input
                                id="date-of-birth"
                                type={'date'}
                                style={{ textDecoration: 'none' }}
                                name="dateOfBirth"
                                value={this.state.dateOfBirth}
                                onChange={this.onChangeInput}
                                disabled={this.props.openRead ? true : false}
                            />
                        </FormControl>

                        <FormControl
                            sx={{
                                m: 1,
                                width: '95%',
                                display: this.props.openCreate
                                    ? 'none'
                                    : 'flex',
                            }}
                            variant="standard"
                        >
                            <InputLabel>Tr???ng th??i</InputLabel>
                            <Select
                                name="userStatus"
                                value={this.state.userStatus}
                                onChange={this.onChangeInput}
                                label="Age"
                                disabled={this.props.openRead ? true : false}
                            >
                                <MenuItem value={'Ho???t ?????ng'}>
                                    Ho???t ?????ng
                                </MenuItem>
                                <MenuItem value={'Kh??ng ho???t ?????ng'}>
                                    Kh??ng ho???t ?????ng
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <Alert
                            severity="error"
                            style={{ display: this.state.openAlert }}
                        >
                            {this.state.alertMessage}
                        </Alert>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.props.handleCloseUpdate}>
                            ????ng
                        </Button>
                        <Button
                            style={{
                                display: this.props.openRead ? 'none' : 'flex',
                            }}
                            endIcon={
                                this.props.openCreate ? (
                                    <Add />
                                ) : (
                                    <EditRounded />
                                )
                            }
                            variant="contained"
                            color="success"
                            type="submit"
                            onClick={() => {
                                if (!this.state.username) {
                                    this.setState({
                                        alertMessage:
                                            'Vui l??ng nh???p t??n ????ng nh???p !',
                                    })
                                    this.handleClickOpenAlert()
                                } else if (!this.state.password) {
                                    this.setState({
                                        alertMessage:
                                            'Vui l??ng nh???p m???t kh???u !',
                                    })
                                    this.handleClickOpenAlert()
                                } else if (this.props.openCreate) {
                                    this.props.registerUser({
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: 'Ho???t ?????ng',
                                    })
                                    this.props.handleCloseUpdate()
                                } else if (this.props.openUpdate) {
                                    this.props.updateUser({
                                        id: this.state.id,
                                        username: this.state.username,
                                        password: this.state.password,
                                        dateOfBirth: this.state.dateOfBirth,
                                        userStatus: this.state.userStatus,
                                    })
                                    this.props.handleCloseUpdate()
                                }
                            }}
                        >
                            {this.props.dialogName}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
