import BuildItem from "./UIElements/BuildItem"

interface Props {
    buildsData: any[]
}

function BuildsList({ buildsData } : Props) {
    return (
        <div className="builds-list">
            {
                buildsData.map(build => {
                    return <BuildItem build={build} key={build.id}/>
                })
            }
            
        </div>
    )
}

export default BuildsList