import React, { SetStateAction, useState } from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({
  className,
  itemsPerPage,
  pageCount,
  setPage,
}: {
  className?: string
  itemsPerPage: number
  pageCount: number
  setPage: React.Dispatch<SetStateAction<number>>
}) => {

  const handlePageClick = (event: any) => {
    setPage?.(event.selected + 1)
  }

  return (
    <div
      className={`${className} relative mx-auto mt-[48px] flex h-[58px] min-w-fit justify-center`}
    >
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel='<'
        pageLinkClassName='w-8 h-8 flex items-center justify-center'
        className='relative flex items-center px-5'
        pageClassName='text-[12px] font-semibold text-[#66605B]'
        activeClassName='text-[#fff] bg-[#2D8B6F] rounded'
        previousClassName={`mr-2 rounded border border-[#D4C79C] ${pageCount < 0 ? 'hidden' : ''}`}
        previousLinkClassName={'w-8 h-8 py-3 block px-[10px] flex items-center justify-center'}
        nextClassName={`ml-2 rounded border border-[#D4C79C] ${pageCount < 0 ? 'hidden' : ''}`}
        nextLinkClassName='w-8 h-8 px-[10px] flex items-center justify-center py-3 '
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination

const PreviousButton = () => {
  return <button>{`<`}</button>
}
