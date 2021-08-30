import react from 'react'

const SignInButton = ({ onClick = null, children = null}) => (
  <button className='button' onClick={onClick}>{children}</button>
)

export default SignInButton