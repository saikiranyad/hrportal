
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Badge } from './ui/badge';
import { Badge } from '../ui/Badge';


function Edulisting({job}) {
    const navigate = useNavigate();
    const {allJobs} = useSelector(store=>store.job);
    console.log(allJobs.education)
    const requiremnts = allJobs.filter(job=>job.jobType === 'education');
    
    
  return (
    <div>
      

      <div onClick={()=> navigate(`/description/${job._id}`)} 
      className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
            <div>
                <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500'>India</p>
            </div>
            <div>
                <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600'>{job?.description}</p>
                <p className='text-sm text-gray-600'>{job?.education}</p>

            </div>
            <div className='flex items-center gap-2 mt-4'>
                <Badge className={'text-blue-700 font-bold'} variant="ghost">{job?.position} Positions</Badge>
                <Badge className={'text-[#F83002] font-bold'} variant="ghost">{job?.jobType}</Badge>
                <Badge className={'text-[#7209b7] font-bold'} variant="ghost">{job?.salary}LPA</Badge>
            </div>

        </div>


    </div>
  )
}

export default Edulisting
