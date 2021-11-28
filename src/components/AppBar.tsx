import { FC, useState } from 'react'
import {
  BsFillHouseDoorFill,
  BsFillPersonLinesFill,
  BsFillFileCheckFill,
} from 'react-icons/bs'
import SDCLogo from '../assets/logos/sdc-right.svg'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Pages } from '../features/interfaceSlice'
import { useLocation } from 'react-router-dom'
import { signOut } from '../features/userSlice'

const AppBar: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleNavigationtoPage = (page: Pages) => {
    navigate(page)
  }

  const { isSignedIn } = useAppSelector((state) => state.user)
  const [toggleAccountMenu, setToggleAccountMenu] = useState(false)

  return (
    <div className="w-full rtl relative">
      <nav className="w-full z-1 flex justify-center bg-mist z-50 shadow-2xl py-7">
        <a
          className="absolute top-6 right-6 2xl:right-14 noselect cursor-pointer z-50 hidden xl:block"
          href="https://soudah.sa/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={SDCLogo} alt="SDCLogo" className="nodrag h-6 xl:h-10" />
        </a>
        <div className="w-full flex flex-col gap-4 justify-between items-center">
          <div className="w-full flex md:hidden justify-center items-center gap-4 noselect my-4">
            <a href="https://soudah.sa/" target="_blank" rel="noreferrer">
              <img src={SDCLogo} alt="SDCLogo" className="nodrag h-14" />
            </a>
          </div>
          <div className="relative w-full list-none flex justify-evenly items-center gap-4 md:gap-14">
            <div
              className={`flex justify-center items-center gap-3 ${
                location.pathname === Pages.MAIN
                  ? 'text-sky'
                  : 'text-rock hover-rise cursor-pointer'
              }`}
              onClick={() => {
                if (location.pathname !== Pages.MAIN)
                  handleNavigationtoPage(Pages.MAIN)
              }}
            >
              <BsFillHouseDoorFill className="text-sm md:text-xl xl:text-2xl" />
              <span className="font-bold text-sm md:text-xl xl:text-2xl noselect">
                الرئيسية
              </span>
            </div>
            <div
              className={`flex justify-center items-between gap-2 noselect ${
                location.pathname === Pages.APPLICATION
                  ? 'text-sky'
                  : 'text-rock hover-rise cursor-pointer'
              }`}
              onClick={() => {
                if (location.pathname !== Pages.APPLICATION)
                  handleNavigationtoPage(Pages.APPLICATION)
              }}
            >
              <BsFillFileCheckFill className="text-sm md:text-xl xl:text-2xl mt-1 md:mt-2" />
              <span className="font-bold text-sm md:text-xl xl:text-2xl noselect">
                متابعة الطلب
              </span>
            </div>
            {isSignedIn ? (
              <div
                className={`relative flex justify-center items-center gap-3 noselect cursor-pointer ${
                  toggleAccountMenu ? 'text-sky' : 'text-rock'
                }`}
                onClick={() => {
                  setToggleAccountMenu(!toggleAccountMenu)
                }}
              >
                <BsFillPersonLinesFill className="text-sm md:text-xl xl:text-2xl mt-1" />
                <span className="font-bold text-sm md:text-xl xl:text-2xl noselect">
                  حسابي
                </span>
                <div className="w-24 md:w-32 absolute top-10 md:top-12 -left-4 rounded-lg overflow-hidden z-50 shadow-2xl">
                  <div
                    className={`md-left-16 flex justify-between gap-3 items-center cursor-pointer bg-mist text-rock hover:text-orange font-bold px-2 pt-2 pb-4 ${
                      toggleAccountMenu ? 'block' : 'hidden'
                    }`}
                    onClick={() => {
                      dispatch(signOut())
                      handleNavigationtoPage(Pages.SIGNUP)
                    }}
                  >
                    <p className="text-xs md:text-base text-center w-full">
                      تسجيل خروج
                    </p>
                  </div>
                  {/* <div
                    className={`md-left-16 flex justify-between items-center gap-3 cursor-pointer bg-mist text-rock hover:text-orange font-bold px-6 pt-2 pb-4 ${
                      toggleAccountMenu ? 'block' : 'hidden'
                    }`}
                    onClick={() => {
                      dispatch(clearStorage())
                      window.location.reload()
                    }}
                  >
                    <BsTrash className="text-sm md:text-lg mt-1" />
                    <p className="text-xs md:text-base text-center w-full">
                      حذف الذاكرة
                    </p>
                  </div> */}
                </div>
              </div>
            ) : (
              <div
                className={`flex justify-center items-between gap-2 noselect ${
                  location.pathname === Pages.APPLICATION
                    ? 'text-sky'
                    : 'text-rock hover-rise cursor-pointer'
                }`}
                onClick={() => {
                  if (location.pathname !== Pages.SIGNUP)
                    handleNavigationtoPage(Pages.SIGNUP)
                }}
              >
                <div className="bg-rock p-1 pb-3 px-2 md:px-8 mt-1 rounded flex justify-center items-center gap-4 text-sky">
                  <span className="font-bold text-sm md:text-lg xl:text-xl noselect">
                    سجل الان
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default AppBar
