import Link from "next/link"

interface Props {
    image?: string,
    text?: string
}

function ListItem({image, text} : Props) {
  return (
    <div className="list-item">
        {
          image ?
          <img src={image}/>
          :
          <div className="blank" />
        }
        {
          text ? 
          <Link href={process.env.NEXT_PUBLIC_WIKI_URL + text.replace(/[0-9+]/g, "")} target="_blank">
            { text }
          </Link>
          : "None"
        }
    </div>
  )
}

export default ListItem