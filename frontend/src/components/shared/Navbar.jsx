import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
                <div>
                    
                  <Link to="/" className='flex items-center gap-2'>
                  <h1 className='text-2xl font-bold text-[#9b9790]'>HR<span className='text-[#336659]'>|PORTAL</span></h1>
                  
                  </Link> 
                </div>
                <div className='flex items-center gap-12'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && (user.role === 'Employeer' || user.role === 'Hr') ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/EmployerDashboard">Token</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                            </div>
                        ) : (
                            // <Popover>
                            //     <PopoverTrigger asChild>
                            //         <Avatar className="cursor-pointer">
                            //             <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                            //         </Avatar>
                            //     </PopoverTrigger>
                            <Popover>
                            <PopoverTrigger asChild>
                                {/* <Avatar className="cursor-pointer bg-green-200">
                                    <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                </Avatar> */}
                                {
                                           user?.gender === 'male' ? (
                                            <Avatar className="cursor-pointer bg-green-200">
                                            <AvatarImage src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAABgUHAQMEAv/EADUQAAIBAwIDBAgEBwAAAAAAAAABAgMEEQUhBhIxE0GBkTJRYWJxobHhFCNCwSIkQ1JTg/D/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3KAAAAAAAAAAPms5xg+ySc+7J56NS7lNdrTjCPf7fmeoAAAAAAAAAAAAAAAAAAAAAAA6q11b2+O3rU6eenPJIw/EGuOxf4e2SddrLk/0fckK1WpXqOpVnKcn1cnlgX15q9lZ0lUqVoz5vRjTeWzDz4tipfl2bcfeqb/QlvAAXFjxHY3WI1JOhN91R7PxMummk4tNPo0awMjper3OnzSjJzo99KT28PUBfA6LK7pXttGvQbcZdz6p+pneAAAAAAAAAAAAAADk4Dzh469wGuNQrO4vriq9+ao3/wB4YPOczTU5KXVNnAAAAAABT8F1nzXNu3thTj9GVBH8GpvUKz7lS38ywAAAAAAAAAAAAAAByupwdN8pOyuFD0nTljyAhdbp06ep1+wnGdOUuZcrzhvqjwDHtyAAAAAACu4Nt+S0rXLW9SXKn7F92UJJ8GzqO6rQc5OkqeeXOyeSsAAAAAAAAAAAAAAAAA1/rNhOyvq0Iwl2KeYyxth9NzwGxNVtvxmnV6CW7jmPxW6NeNY2fVAcAAAAZPh20d3qlLK/Lp/xz+C6fPAGd4PtHSs6lxNNOtLC+C+5nwkkkkkkumAAAAAAAAAAAAAAAAAAIHiCjChq9xGntFvmx6m9y+clFOUnhJbtmvNXuY3epXFaHoSm+X4LZAeMAAC34XtadHS4VY+nWfNJ/JIiC04TuoVdN7DK7SlJrHsff9QM2AAAAAAAAAAAAAA8l9qVpYr+YrRjLGVBbyfgT99xVUnmNlSVNf5JvL8gKqc404805RjH1t4MXe8QWFsmoVe2n/bT3+ZF3N1cXcua4rTqP3n+x0gZPU9autQzBvs6L/pxfX4+sxgAAAADsoVqtvUVSjNwnHpKLwzrAFRp3FKwqeoQ/wBsF9UZ62v7S6S/D3FObfcpb+RrkLZpptNd+QNnghLHXr6zxHte1pr9FTf5lBY8S2dxiNfNvP3nmPmBmwcRlGcVKElKL3TTymcgAAAPFrF8tPsZ1us+lNetntJPjK45rihbxe0Iub+L2An6tWpXqSq1Zuc5PLk+8+AAAAAAAAAAAAAAAAAAM9wvqkre5jaVZN0arxFP9MixNYxbjJSi8NPKNk2lZXFtRrR6TgpfIDtAAAgNer9vq1xJPKjLlXhsXlaoqNKdV9IRcvI1rObnOU31k234gfIAAAAAAAAAAAAAAAAAAFxwrX7bSIRzvSk4P6/uQ5TcF1v4rmg31SmvoBUgADwa/Jx0e6cXh8mPNkDgAAAAAAAAAAAAAAAAAAAABl+FJOOrwSe0oST8sgAWwAA//9k=" alt="@shadcn" />
                                        </Avatar>

                                           ) :
                                           (
                                            <Avatar className="cursor-pointer bg-green-200">
                                            <AvatarImage src="data:image/png;base64,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" alt="@shadcn" />
                                        </Avatar>
                                           ) 
                                        }
                              
                            </PopoverTrigger>
                       
                                <PopoverContent className="w-80">
                                    <div className=''>
                                        <div className='flex gap-2 space-y-2'>
                                            {/* <Avatar className="cursor-pointer">
                                                <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                            </Avatar> */}
                                             {
                                           user?.gender === 'male' ? (
                                            <Avatar className="cursor-pointer bg-green-200">
                                            <AvatarImage src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAbAAEBAAIDAQAAAAAAAAAAAAAABgUHAQMEAv/EADUQAAIBAwIDBAgEBwAAAAAAAAABAgMEEQUhBhIxE0GBkTJRYWJxobHhFCNCwSIkQ1JTg/D/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A3KAAAAAAAAAAPms5xg+ySc+7J56NS7lNdrTjCPf7fmeoAAAAAAAAAAAAAAAAAAAAAAA6q11b2+O3rU6eenPJIw/EGuOxf4e2SddrLk/0fckK1WpXqOpVnKcn1cnlgX15q9lZ0lUqVoz5vRjTeWzDz4tipfl2bcfeqb/QlvAAXFjxHY3WI1JOhN91R7PxMummk4tNPo0awMjper3OnzSjJzo99KT28PUBfA6LK7pXttGvQbcZdz6p+pneAAAAAAAAAAAAAADk4Dzh469wGuNQrO4vriq9+ao3/wB4YPOczTU5KXVNnAAAAAABT8F1nzXNu3thTj9GVBH8GpvUKz7lS38ywAAAAAAAAAAAAAAByupwdN8pOyuFD0nTljyAhdbp06ep1+wnGdOUuZcrzhvqjwDHtyAAAAAACu4Nt+S0rXLW9SXKn7F92UJJ8GzqO6rQc5OkqeeXOyeSsAAAAAAAAAAAAAAAAA1/rNhOyvq0Iwl2KeYyxth9NzwGxNVtvxmnV6CW7jmPxW6NeNY2fVAcAAAAZPh20d3qlLK/Lp/xz+C6fPAGd4PtHSs6lxNNOtLC+C+5nwkkkkkkumAAAAAAAAAAAAAAAAAAIHiCjChq9xGntFvmx6m9y+clFOUnhJbtmvNXuY3epXFaHoSm+X4LZAeMAAC34XtadHS4VY+nWfNJ/JIiC04TuoVdN7DK7SlJrHsff9QM2AAAAAAAAAAAAAA8l9qVpYr+YrRjLGVBbyfgT99xVUnmNlSVNf5JvL8gKqc404805RjH1t4MXe8QWFsmoVe2n/bT3+ZF3N1cXcua4rTqP3n+x0gZPU9autQzBvs6L/pxfX4+sxgAAAADsoVqtvUVSjNwnHpKLwzrAFRp3FKwqeoQ/wBsF9UZ62v7S6S/D3FObfcpb+RrkLZpptNd+QNnghLHXr6zxHte1pr9FTf5lBY8S2dxiNfNvP3nmPmBmwcRlGcVKElKL3TTymcgAAAPFrF8tPsZ1us+lNetntJPjK45rihbxe0Iub+L2An6tWpXqSq1Zuc5PLk+8+AAAAAAAAAAAAAAAAAAM9wvqkre5jaVZN0arxFP9MixNYxbjJSi8NPKNk2lZXFtRrR6TgpfIDtAAAgNer9vq1xJPKjLlXhsXlaoqNKdV9IRcvI1rObnOU31k234gfIAAAAAAAAAAAAAAAAAAFxwrX7bSIRzvSk4P6/uQ5TcF1v4rmg31SmvoBUgADwa/Jx0e6cXh8mPNkDgAAAAAAAAAAAAAAAAAAAABl+FJOOrwSe0oST8sgAWwAA//9k=" alt="@shadcn" />
                                        </Avatar>

                                           ) :
                                           (
                                            <Avatar className="cursor-pointer bg-green-200">
                                            <AvatarImage src="data:image/png;base64,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" alt="@shadcn" />
                                        </Avatar>
                                           ) 
                                        }
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col my-2 text-gray-600'>
                                            {
                                                user && (user.role === 'jobseeker' || user.role === 'Hr' || user.role ==='Employeer') && (
                                                    <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                        <User2 />
                                                        <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                                    </div>
                                                )
                                            }

                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }

                </div>
            </div>

        </div>
    )
}

export default Navbar