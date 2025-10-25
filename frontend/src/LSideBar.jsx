import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
function IconsRows(props){
    return(
        <div className="logo hover:bg-gray-400 hover:rounded-full hover:cursor-pointer p-2 flex flex-row justify-start items-center gap-2">
            <div><img className="w-[35px] h-[35px] invert-100 object-contain" src={`/${props?.img}.svg`} alt="home" /></div>
            <div className="sm:hidden lg:block"><span className="sm:text-sm md:text-md lg:text-lg capitalize">{props?.img}</span></div>
        </div>
    )
}

function Button(props){
    return(
        <div className="flex flex-row items-center justify-center w-full p-4">
            <button className="sm:text-lg md:text-xl lg:text-2xl rounded-2xl w-full bg-white pt-2 pb-2 cursor-pointer hover:bg-blue-600 text-black">{props?.name}</button>
        </div>
    )
}
function Icons(){
    const user_id=useSelector((state)=>state.user.user)
    return(
        <div className="icons h-fit flex flex-col gap-2 lg:items-start lg:justify-center sm:items-center">
            <div className="logo hover:bg-gray-400 hover:rounded-full hover:cursor-pointer p-2"><img className=" w-[40px] h-[40px] invert-100 object-contain" src="/logo.svg" alt="" /></div>
            <Link to="/"><IconsRows img="home" /></Link>
            <IconsRows img="explore" />
            <Link to={`/profile/${user_id?._id}`}><IconsRows img="profile"/></Link>
            <IconsRows img="notification" />
            <IconsRows img="bookmark" />
            <Link to="/logout"><IconsRows img="logout" /></Link>
            <Button name="Post"/>
        </div>
    )
}
export default function LSideBar(){
    return(
        <div className="bg-black h-[100%] w-[20%] p-2">
            <Icons/>
        </div>
    )
}