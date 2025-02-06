import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import { Button } from "./button";
// import Edulisting from "../Edulisting";
import Edulisting from "../ui/Edulisting";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";


function Education() {
    const { allJobs } = useSelector((store) => store.job);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load all jobs initially
    useEffect(() => {
        if (allJobs) {
            setFilterData(allJobs);
            setLoading(false);
        }
    }, [allJobs]);

    // Memoized job count by education (Handles string values)
    const countJobs = useMemo(() => {
        if (!allJobs) return {};

        return allJobs.reduce((acc, job) => {
            if (job.education) {
                acc[job.education] = (acc[job.education] || 0) + 1;
            }
            return acc;
        }, {});
    }, [allJobs]);

    // Handle filtering by education
    const handleClick = (req) => {
        const filtered = allJobs.filter((job) => job.education === req);

        console.log("Clicked Education:", req);
        console.log("Filtered Data:", filtered);  // ✅ Check filtered jobs in the console

        setFilterData([...filtered]);  // ✅ Ensure state updates
    };

    return (
        <div className="max-w-7xl mx-auto my-20">
            <h1 className="text-4xl font-bold ms-7">Jobs By Education</h1>

            {/* Loading State */}
            {loading ? (
                <p className="text-center text-lg font-semibold mt-10">Loading jobs...</p>
            ) : (
                <>
                    {/* Education Filter Buttons */}
                    <div className="flex flex-wrap gap-4  text-lg font-semibold text-gray-800">
                     

                        <Carousel className="w-full max-w-xl mx-auto my-10">
                            <CarouselContent>

                                {Object.keys(countJobs).map((req, index) => (
                                    <CarouselItem className="md:basis-1/3 lg-basis-1/3">
                                        <Button
                                            key={index}
                                            variant="outline"
                                            onClick={() => handleClick(req)}
                                            className="rounded-full px-4 py-2 border border-gray-300 hover:bg-gray-100"
                                        >
                                            {req} ({countJobs[req]})
                                        </Button>
                                    </CarouselItem>

                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>

                    </div>

                    {/* Job Listings */}
                    <div className="grid grid-cols-3 gap-4 my-5">
                        {filterData.length > 0 ? (
                            filterData.slice(0, 6).map((job) => <Edulisting key={job.id} job={job} />)
                        ) : (
                            <div className="col-span-3 text-center text-gray-500 text-lg">
                                <p>No jobs found for the selected education criteria.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Education;


