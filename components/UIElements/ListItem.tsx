interface Props {
    image?: string,
    text: string
}

function ListItem({image, text} : Props) {
  return (
    <div className="list-item">
        <img src={image}/>
        {text}
    </div>
  )
}

export default ListItem