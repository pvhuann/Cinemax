import Navbar from '@/components/Navbar'
import SearchResult from '@/components/SearchResult'

const page = ({params}:{params:{query: string}}) => {
  const query= params.query

  return (
    <>
      <Navbar/>
      <SearchResult query={query}/>
    </>
  )
}

export default page