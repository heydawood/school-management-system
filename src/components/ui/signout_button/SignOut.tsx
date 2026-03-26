// import { signOut } from '@/auth.ts'
import React from 'react'
import { TbLogout2 } from 'react-icons/tb'

const SignOutButton = () => {
  return (
    <form>
      <button
        type='submit'
        className='flex gap-2 flex-nowrap items-center rounded-md w-full px-4 py-2 text-left hover:bg-gray-lighter'
      >
        {' '}
        <span className='text-error'>
          <TbLogout2 size={24} />
        </span>
        <span className='text-error text-lg'>Logout</span>
      </button>
    </form>
  )
}

export default SignOutButton
