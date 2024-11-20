import React, { useEffect } from 'react'
import Index from "../../features/AgencyAccounts/index"
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'

const AgencyAccount = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setPageTitle({ title: "Agency Account" }))
  }, [])
  return (
    <Index />
  )
}

export default AgencyAccount
