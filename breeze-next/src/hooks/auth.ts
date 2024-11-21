import useSWR from 'swr'
import axios from '@/lib/axios'
import {useEffect} from 'react'
import {useParams, useRouter} from 'next/navigation'

interface User {
  // Define your user properties here
  id: number
  name: string
  email: string
  // Add other user properties as needed
}

interface RegisterProps {
  name: string
  email: string
  password: string
  password_confirmation: string
  setErrors: (errors: any[]) => void
}

interface LoginProps {
  email: string
  password: string
  remember?: boolean
  setErrors: (errors: any[]) => void
  setStatus: (status: string | null) => void
}

interface ForgotPasswordProps {
  email: string
  setErrors: (errors: any[]) => void
  setStatus: (status: string | null) => void
}

interface ResetPasswordProps {
  email: string
  password: string
  password_confirmation: string
  setErrors: (errors: any[]) => void
  setStatus: (status: string | null) => void
}

interface UseAuthProps {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}

export const useAuth = ({middleware, redirectIfAuthenticated}: UseAuthProps = {}) => {
  const router = useRouter()
  const params = useParams()

  const {data: user, error, mutate} = useSWR<User>('/user', () =>
    axios
      .get('/user')
      .then(res => res.data)
      .catch(error => {
        if (error.response.status !== 409) throw error

        router.push('/verify-email')
      }),
  )

  const csrf = () => axios.get('/csrf-cookie')

  const register = async ({
                            setErrors,
                            ...props
                          }: Omit<RegisterProps, 'setErrors'> & {
    setErrors: (errors: any[]) => void
  }) => {
    await csrf()

    setErrors([])

    axios
      .post('/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const login = async ({
                         setErrors,
                         setStatus,
                         ...props
                       }: Omit<LoginProps, 'setErrors' | 'setStatus'> & {
    setErrors: (errors: any[]) => void
    setStatus: (status: string | null) => void
  }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const forgotPassword = async ({
                                  setErrors,
                                  setStatus,
                                  email,
                                }: ForgotPasswordProps) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/forgot-password', {email})
      .then(response => setStatus(response.data.status))
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const resetPassword = async ({
                                 setErrors,
                                 setStatus,
                                 ...props
                               }: Omit<ResetPasswordProps, 'setErrors' | 'setStatus'> & {
    setErrors: (errors: any[]) => void
    setStatus: (status: string | null) => void
  }) => {
    await csrf()

    setErrors([])
    setStatus(null)

    axios
      .post('/reset-password', {token: params.token, ...props})
      .then(response =>
        router.push('/login?reset=' + btoa(response.data.status)),
      )
      .catch(error => {
        if (error.response.status !== 422) throw error

        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate())
    }

    window.location.pathname = '/login'
  }

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated)

    if (middleware === 'auth' && error) logout()
  }, [user, error, middleware, redirectIfAuthenticated, router])

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout,
  }
}
