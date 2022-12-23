import React, { Component } from 'react'
import moment from 'moment'
import UpdateDialog from './dialog/Update'
import DeleteDialog from './dialog/Delete'
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
    Alert,
    CircularProgress,
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
        textSearch: '',
        id: '',
        username: '',
        password: '',
        userStatus: '',
        dateOfBirth: moment().format('YYYY-MM-DD'),
        dialogName: '',
    }

    handleClearState = () => {
        this.setState({
            openCreate: false,
            openUpdate: false,
            openDelete: false,
            openRead: false,
            openLock: false,
            textSearch: '',
            id: '',
            username: '',
            password: '',
            userStatus: '',
            dateOfBirth: moment().format('YYYY-MM-DD'),
            dialogName: '',
        })
    }

    handleClickOpenCreate = () => {
        this.setState({ openCreate: true })
    }

    handleClickOpenUpdate = () => {
        this.setState({ openUpdate: true })
    }

    handleCloseUpdate = () => {
        this.handleClearState()
    }

    handleClickOpenDelete = () => {
        this.setState({ openDelete: true })
    }

    handleCloseDelete = () => {
        this.handleClearState()
    }

    handleClickOpenRead = () => {
        this.setState({ openRead: true })
    }

    handleClickOpenLock = () => {
        this.setState({ openLock: true })
    }

    handleCloseLock = () => {
        this.setState({ openLock: false })
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
                                        dialogName: 'Xem tài khoản',
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
                                        dialogName: 'Sửa tài khoản',
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
                                            dialogName: 'Khoá tài khoản',
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
                                            dialogName: 'Khoá tài khoản',
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
                                        dialogName: 'Xoá tài khoản',
                                    })
                                    this.handleClickOpenDelete()
                                }}
                            />
                        </style.StyledTableCell>
                    </style.StyledTableRow>
                )
            })
        }

        if (this.props.isLoading) {
            return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <CircularProgress size={100} />
                </Box>
            )
        } else {
            return (
                <div>
                    <div>
                        <UpdateDialog
                            {...this.state}
                            handleCloseUpdate={this.handleCloseUpdate}
                            updateUser={this.props.updateUser}
                            registerUser={this.props.registerUser}
                        />

                        <DeleteDialog
                            {...this.state}
                            handleCloseDelete={this.handleCloseDelete}
                            deleteUser={this.props.deleteUser}
                            updateUser={this.props.updateUser}
                        />
                    </div>
                    <div>
                        <div>
                            <Box
                                sx={{ display: 'flex', alignItems: 'flex-end' }}
                            >
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
                                                textSearch:
                                                    this.state.textSearch,
                                                activePage: 1,
                                            })
                                        }
                                    }}
                                />
                                <PersonSearch
                                    color={
                                        this.state.textSearch
                                            ? 'primary'
                                            : 'action'
                                    }
                                    sx={{ mr: 1, my: 0.5 }}
                                    onClick={() => {
                                        this.props.searchPaginationUser({
                                            textSearch: this.state.textSearch,
                                            activePage: 1,
                                        })
                                    }}
                                />
                                <Button
                                    style={{ left: '50%' }}
                                    variant="contained"
                                    endIcon={<Add />}
                                    onClick={() => {
                                        this.handleClickOpenCreate()
                                        this.setState({
                                            dialogName: 'Thêm tài khoản',
                                        })
                                    }}
                                >
                                    Thêm tài khoản
                                </Button>
                            </Box>
                        </div>
                        <div>
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
                                <Alert
                                    severity="info"
                                    variant="outlined"
                                    style={{
                                        display:
                                            this.props.listUser.length === 0
                                                ? 'flex'
                                                : 'none',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    Không có dữ liệu!
                                    <Button
                                        onClick={() => {
                                            this.handleClickOpenCreate()
                                            this.setState({
                                                dialogName: 'Thêm tài khoản',
                                            })
                                        }}
                                    >
                                        Thêm tài khoản
                                    </Button>
                                    để bắt đầu!
                                </Alert>
                                <Stack spacing={2} style={{ marginTop: '3em' }}>
                                    <Pagination
                                        style={{
                                            display:
                                                this.props.listUser.length === 0
                                                    ? 'none'
                                                    : 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                        color="primary"
                                        count={this.props.totalPage}
                                        page={this.props.activePage}
                                        onChange={(event, page) => {
                                            if (
                                                page !== this.props.activePage
                                            ) {
                                                if (this.props.textSearch) {
                                                    this.props.searchPaginationUser(
                                                        {
                                                            textSearch:
                                                                this.props
                                                                    .textSearch,
                                                            activePage: page,
                                                        },
                                                    )
                                                } else {
                                                    this.props.paginationUser(
                                                        page,
                                                    )
                                                }
                                            }
                                        }}
                                    />
                                </Stack>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
