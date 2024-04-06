import { ColumnProps } from '@/types/table'
import React from 'react'

import bgHeader from '@/images/analytics/owners.png'
import Image from 'next/image'

type PropsTable<T> = {
  columns: Array<ColumnProps<T>>
  data?: T[]
  isLoading?: boolean
}

const TableComponent = <T,>({ columns, data, isLoading }: PropsTable<T>) => {
  const headers = columns.map((column, index) => {
    return (
      <>
        {column.renderColumn ? (
          <>{column.renderColumn(column)}</>
        ) : (
          <p key={`headCell-${index}`} className='!z-0 text-base font-medium text-[#4E473F]'>
            {column.title}
          </p>
        )}
      </>
    )
  })

  const rows = !data?.length ? (
    <p className='text-center'>No data</p>
  ) : (
    data?.map((row, index) => {
      return (
        <div
          key={`row-${index}`}
          className='flex items-center rounded-lg bg-[#FAF5F0] p-4 transition-all hover:bg-[#F6EEE3] lg:h-[72px]'
        >
          {columns.map((column, index2) => {
            const value = column.render
              ? column.render(column, row as T)
              : (row[column.key as keyof typeof row] as string)
            return column.render ? (
              column.render(column, row as T)
            ) : (
              <>
                <p key={`cell-${index2}`} className='text-center'>
                  {value}
                </p>
              </>
            )
          })}
        </div>
      )
    })
  )
  return (
    <div className='w-full overflow-x-auto px-4'>
      <div className='relative flex h-[72px] w-full items-center overflow-x-auto overflow-y-hidden p-4'>
        <Image src={bgHeader} alt='bgHeader' fill priority className='' />
        {headers}
      </div>
      <div className='mt-6 flex w-full flex-col gap-y-3 overflow-x-auto'>
        {isLoading ? (
          <p className='flex h-[400px] items-center justify-center'>Loading...</p>
        ) : (
          rows
        )}
      </div>
    </div>
  )
}

export default TableComponent
