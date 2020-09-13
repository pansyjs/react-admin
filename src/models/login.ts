import { useState, useCallback } from 'react';

export default function useAuthModel() {
  const signin = useCallback((account, password) => {
    // signin implementation
    // setUser(user from signin API)
  }, [])
  const signout = useCallback(() => {
    // signout implementation
    // setUser(null)
  }, [])
  return {
    signin,
    signout
  }
}
