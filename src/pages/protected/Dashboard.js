import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Dashboard from '../../features/dashboard/index'
import ErrorBoundary from "./ErrorBoundry"
function InternalPage() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title: "Dashboard" }))
    }, [])


    return (
        <ErrorBoundary>
            <Dashboard />
        </ErrorBoundary>
    )
}

export default InternalPage