import { Outlet } from "react-router-dom"
const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-center w-full h-screen bg-gradient-to-br from-gray-600 to-black">
      <Outlet/>
    </div>
  )
}

export default AuthLayout