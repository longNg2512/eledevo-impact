import React, { Component } from 'react'
import moment from 'moment'
import CreateDialog from './dialog/Create'
import UpdateDialog from './dialog/Update'
import DeleteDialog from './dialog/Delete'
import ReadDialog from './dialog/Read'
import LockDialog from './dialog/Lock'
import * as style from './style'
import {
    Table,
    TableBody,
    TableContainer,
    TableHead,
    Paper,
    Pagination,
    Stack,
    Box,
    TextField,
    Button,
} from '@mui/material'
import {
    Circle,
    CircleOutlined,
    Lock,
    LockOpen,
    PersonSearch,
    DeleteForeverRounded,
    VisibilityRounded,
    EditRounded,
    Add,
} from '@mui/icons-material'

export default class User extends Component {
    state = {
        openCreate: false,
        openUpdate: false,
        openDelete: false,
        openRead: false,
        openLock: false,
        showPassword: false,
        textSearch: '',
        id: '',
        username: '',
        password: '',
        userStatus: '',
        dateOfBirth: '',
    }

    handleClickOpenCreate = () => {
        this.setState({ openCreate: true })
    }

    handleCloseCreate = () => {
        this.setState({ openCreate: false })
    }

    handleClickOpenUpdate = () => {
        this.setState({ openUpdate: true })
    }

    handleCloseUpdate = () => {
        this.setState({ openUpdate: false })
    }

    handleClickOpenDelete = () => {
        this.setState({ openDelete: true })
    }

    handleCloseDelete = () => {
        this.setState({ openDelete: false })
    }

    handleClickOpenRead = () => {
        this.setState({ openRead: true })
    }

    handleCloseRead = () => {
        this.setState({ openRead: false })
    }

    handleClickOpenLock = () => {
        this.setState({ openLock: true })
    }

    handleCloseLock = () => {
        this.setState({ openLock: false })
    }

    onChangePagination = (event, value) => {
        if (event.target.page !== value) {
            if (this.props.textSearch) {
                this.props.searchPaginationUser({
                    textSearch: this.props.textSearch,
                    activePage: value,
                })
            } else {
                this.props.paginationUser(value)
            }
        }
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: this.state.showPassword ? false : true })
    }

    handleMouseDownPassword = event => {
        event.preventDefault()
    }

    onChangeInput = e =>
        this.setState({
            [e.target.name]: e.target.value,
        })

    render() {
        let userItem = []
        if (this.props.listUser) {
            userItem = this.props.listUser.map((user, index) => {
                return (
                    <style.StyledTableRow key={user._id}>
                        <style.StyledTableCell align="center">
                            {index + 1 + this.props.skip}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            {user.username}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            {moment(user.createdAt).format(
                                'DD/MM/YYYY HH:mm:ss',
                            )}
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            <Button
                                color={
                                    user.userStatus === 'Hoạt động'
                                        ? 'success'
                                        : 'error'
                                }
                            >
                                {user.userStatus === 'Hoạt động' ? (
                                    <Circle sx={{ mr: 1, my: 0.5 }} />
                                ) : (
                                    <CircleOutlined sx={{ mr: 1, my: 0.5 }} />
                                )}
                                {user.userStatus}
                            </Button>
                        </style.StyledTableCell>
                        <style.StyledTableCell align="center">
                            <VisibilityRounded
                                sx={{ mr: 2, my: 0.5 }}
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                        password: user.password,
                                        dateOfBirth: user.dateOfBirth,
                                        userStatus: user.userStatus,
                                    })
                                    this.handleClickOpenRead()
                                }}
                            />
                            <EditRounded
                                sx={{ mr: 2, my: 0.5 }}
                                color="primary"
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                        password: user.password,
                                        dateOfBirth: user.dateOfBirth,
                                        userStatus: user.userStatus,
                                    })
                                    this.handleClickOpenUpdate()
                                }}
                            />
                            {user.userStatus === 'Hoạt động' ? (
                                <LockOpen
                                    sx={{ mr: 2, my: 0.5 }}
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({
                                            id: user._id,
                                            username: user.username,
                                            password: user.password,
                                            dateOfBirth: user.dateOfBirth,
                                            userStatus: user.userStatus,
                                        })
                                        this.handleClickOpenLock()
                                    }}
                                />
                            ) : (
                                <Lock
                                    sx={{ mr: 2, my: 0.5 }}
                                    color="secondary"
                                    onClick={() => {
                                        this.setState({
                                            id: user._id,
                                            username: user.username,
                                            password: user.password,
                                            dateOfBirth: user.dateOfBirth,
                                            userStatus: user.userStatus,
                                        })
                                        this.handleClickOpenLock()
                                    }}
                                />
                            )}
                            <DeleteForeverRounded
                                sx={{ color: 'red', mr: 0, my: 0.5 }}
                                onClick={() => {
                                    this.setState({
                                        id: user._id,
                                        username: user.username,
                                    })
                                    this.handleClickOpenDelete()
                                }}
                            />
                        </style.StyledTableCell>
                    </style.StyledTableRow>
                )
            })
        }
        return (
            <div>
                <div>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                        <TextField
                            id="input-with-sx"
                            label="tìm kiếm"
                            variant="standard"
                            name="textSearch"
                            value={this.state.textSearch}
                            onChange={this.onChangeInput}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    this.props.searchPaginationUser({
                                        textSearch: this.state.textSearch,
                                        activePage: 1,
                                    })
                                }
                            }}
                        />
                        <PersonSearch
                            sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                            onClick={() => {
                                this.props.searchPaginationUser({
                                    textSearch: this.state.textSearch,
                                    activePage: 1,
                                })
                            }}
                        />
                        <Button
                            style={{ left: '28em' }}
                            variant="contained"
                            onClick={this.handleClickOpenCreate}
                        >
                            Thêm tài khoản
                            <Add
                                style={{ marginLeft: '0.5em' }}
                                sx={{ my: 0.5 }}
                            />
                        </Button>
                    </Box>

                    <CreateDialog
                        openCreate={this.state.openCreate}
                        showPassword={this.state.showPassword}
                        registerUser={this.props.registerUser}
                        handleClickOpenCreate={this.handleClickOpenCreate}
                        handleCloseCreate={this.handleCloseCreate}
                        handleClickShowPassword={this.handleClickShowPassword}
                        handleMouseDownPassword={this.handleMouseDownPassword}
                        message={this.props.message}
                    />

                    <UpdateDialog
                        openUpdate={this.state.openUpdate}
                        showPassword={this.state.showPassword}
                        handleClickOpenUpdate={this.handleClickOpenUpdate}
                        handleCloseUpdate={this.handleCloseUpdate}
                        id={this.state.id}
                        username={this.state.username}
                        password={this.state.password}
                        dateOfBirth={this.state.dateOfBirth}
                        userStatus={this.state.userStatus}
                        handleClickShowPassword={this.handleClickShowPassword}
                        handleMouseDownPassword={this.handleMouseDownPassword}
                        updateUser={this.props.updateUser}
                    />

                    <DeleteDialog
                        username={this.state.username}
                        id={this.state.id}
                        handleClickOpenDelete={this.handleClickOpenDelete}
                        handleCloseDelete={this.handleCloseDelete}
                        openDelete={this.state.openDelete}
                        deleteUser={this.props.deleteUser}
                    />

                    <ReadDialog
                        openRead={this.state.openRead}
                        showPassword={this.state.showPassword}
                        handleClickOpenRead={this.handleClickOpenRead}
                        handleCloseRead={this.handleCloseRead}
                        id={this.state.id}
                        username={this.state.username}
                        password={this.state.password}
                        dateOfBirth={this.state.dateOfBirth}
                        userStatus={this.state.userStatus}
                        handleClickShowPassword={this.handleClickShowPassword}
                        handleMouseDownPassword={this.handleMouseDownPassword}
                    />

                    <LockDialog
                        id={this.state.id}
                        username={this.state.username}
                        password={this.state.password}
                        dateOfBirth={this.state.dateOfBirth}
                        userStatus={this.state.userStatus}
                        updateUser={this.props.updateUser}
                        openLock={this.state.openLock}
                        handleClickOpenLock={this.handleClickOpenLock}
                        handleCloseLock={this.handleCloseLock}
                    />
                </div>
                <TableContainer
                    component={Paper}
                    className="table-main"
                    style={{ marginTop: '5vh' }}
                >
                    <Table
                        sx={{ minWidth: 800, border: 1 }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <style.StyledTableRow>
                                <style.StyledTableCell align="center">
                                    STT
                                </style.StyledTableCell>
                                <style.StyledTableCell align="center">
                                    Tên đăng nhập
                                </style.StyledTableCell>
                                <style.StyledTableCell align="center">
                                    Ngày tạo
                                </style.StyledTableCell>
                                <style.StyledTableCell align="center">
                                    Trạng thái
                                </style.StyledTableCell>
                                <style.StyledTableCell align="center">
                                    Thao tác
                                </style.StyledTableCell>
                            </style.StyledTableRow>
                        </TableHead>
                        <TableBody>{userItem}</TableBody>
                    </Table>
                </TableContainer>
                <div>
                    <Stack spacing={2} style={{ margin: '1vh' }}>
                        <Pagination
                            color="primary"
                            count={this.props.totalPage}
                            page={this.props.activePage}
                            onChange={this.onChangePagination}
                        />
                    </Stack>
                </div>
            </div>
        )
    }
}
