import { TextField } from '@mui/material'
import { createTheme, useTheme } from '@mui/material/styles';
import React from 'react'

const FormInput = ({ ...ortherProps }) => <TextField {...ortherProps} sx={{ textTransform:'capitalize'}}/>;

export default FormInput
