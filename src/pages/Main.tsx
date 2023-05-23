import { Box, Button, TextField } from '@mui/material'
import { useAppSelector } from '../hooks/storeHooks'
import { useDispatch } from 'react-redux'
import { resetState, setEmail, setName } from '../store/userSlice'
import { ChangeEvent } from 'react'

function Main() {
  const email = useAppSelector((state) => state.user.email)
  const name = useAppSelector((state) => state.user.name)
  const dispatch = useDispatch()

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value))
  }

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setName(e.target.value))
  }

  const displayUserInfo = () => {
    alert(JSON.stringify({email, name}))
  }

  const resetInfo = () => {
    dispatch(resetState)
  }

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',

    }}>
      <TextField value={email} variant='outlined' onChange={onChangeEmail} />
      <TextField value={name} variant='outlined' onChange={onChangeName} />
      <Button variant='contained' onClick={displayUserInfo}>Display</Button>
      <Button variant='text' onClick={resetInfo}>Reset</Button>
    </Box>
  )
}

export default Main
