'use server'
import Search from "../ui/browse/BrowseSearch"
import { Suspense } from "react";
import Pagination from "../ui/browse/Pagination";
import { getTotalBrowsePages } from "@/lib/data/customerBrowse";
type BrowsePageProps = {
    searchParams?: Promise<{
        query?: string;
        page?: string
    }>;
}

export default async function CustomerBrowsePage(props : BrowsePageProps) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage  = Number(searchParams?.page) || 1;

    const totalPages = await getTotalBrowsePages()
    return (
       <div>
           <Search
            placeholder="Search for Products..."
            />

            <Suspense>
                {/* Add Card display, and add search function
                CardDisplay
                query = {query}
                currentPage = {currentPage}
                */}
            </Suspense>

            <Pagination
            totalPages={totalPages}
                />

            
       </div>
    )
}