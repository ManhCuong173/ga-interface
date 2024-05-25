import React from 'react'

const SearchInfoHelper = () => {
  return (
    <div>
      <span>{`Enter the NFT ID here. Use "X" to represent unspecified digits.`}</span> <br />
      For example:
      <ul className="list-disc pl-10">
        <li>{`To find an NFT starting with "123", enter "123X".`}</li>
        <li>{`To find an NFT ending with "456", enter "X456".`}</li>
      </ul>
    </div>
  )
}

export default SearchInfoHelper
