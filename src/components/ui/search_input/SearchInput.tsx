import { IoSearchOutline } from 'react-icons/io5'

interface SearchInputProps {
  placeholder: string
  onSearch?: (query: string) => void
  handleKeyDown?: (query: string) => void
  searchLoading?: boolean
  results?: IResult[]
  selectedResults?: IResult[]
  onSelectResult?: (result: IResult) => void
  onScrollBottom?: () => void
  paginationLoading?: boolean
  classNames?: string
  searchIcon?: boolean
}

interface IResult {
  id: number
  firstName: string
  lastName: string
}

export const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  onSearch,
  results,
  selectedResults,
  onSelectResult,
  onScrollBottom,
  handleKeyDown,
  paginationLoading,
  classNames,
  searchLoading,
  searchIcon = false,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    onSearch!(value)
  }

  const handleScroll = (e: any) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget
    if (scrollHeight - scrollTop === clientHeight) {
      onScrollBottom!()
    }
  }

  const handleKeyDownWrapper = (e: any) => {
    if (handleKeyDown) {
      handleKeyDown!(e)
    } else {
      return
    }
  }

  const isSelected = (result: IResult) => {
    return selectedResults!.some((selected) => selected.id === result.id)
  }

  return (
    <div className='w-[100%] relative me-2'>
      <input
        type='text'
        placeholder={placeholder}
        className={`block  w-full bg-input py-3 px-3 rounded-[12px] border border-gray-light text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-primary focus:outline-none sm:text-sm sm:leading-6 ${classNames}`}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDownWrapper}
      />
      {searchIcon && (
        <div className='absolute inset-y-0 font-semibold pl-3 flex items-center cursor-pointer right-4'>
          <IoSearchOutline size={24} color='#9e9e9e' />
        </div>
      )}
      {searchLoading && (
        <div className='p-2 flex justify-center w-full absolute top-20 z-10'>
          <div
            className='w-6 h-6 rounded-full  animate-spin
       border-2 border-solid border-primary border-t-transparent'
          ></div>
        </div>
      )}
      {results!.length > 0 && (
        <div className='relative'>
          <ul
            className='absolute pb-6 left-0 h-64 overflow-y-auto scrollbar-thin right-0 mt-2 bg-white rounded-md shadow-lg z-[1100]'
            onScroll={handleScroll}
          >
            <div className='relative'>
              {results!.map((result, index) => (
                <li
                  key={result.id}
                  className={`py-1 cursor-pointer ${
                    index < results!.length - 1
                      ? 'border-b border-gray-light'
                      : ''
                  }`}
                  onClick={() => onSelectResult!(result)}
                >
                  <div
                    className={`px-2 py-2 flex items-center ${
                      isSelected(result)
                        ? 'bg-primary-lightest'
                        : 'hover:bg-gray-lighter'
                    }`}
                  >
                    <span>
                      {result.firstName} {result.lastName}
                    </span>
                  </div>
                </li>
              ))}
              {paginationLoading && (
                <div className='p-2 flex justify-center w-full absolute -bottom-3 z-[1100]'>
                  <div className='w-6 h-6 rounded-full animate-spin border-2 border-solid border-primary border-t-transparent'></div>
                </div>
              )}
            </div>
          </ul>
        </div>
      )}
    </div>
  )
}
