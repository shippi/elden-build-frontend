interface Props {
    text: string,
    img?: string
}

function PanelTitle({text, img}: Props) {
  return (
    <div className="panel-title">
        {img && <img src={img}/>}
        {text}
    </div>
  )
}

export default PanelTitle