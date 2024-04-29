import BuildItem from "./UIElements/BuildItem"

interface Props {
    builds: any[]
}

function BuildsList({ builds } : Props) {
    return (
        <div className="builds-list">
            {
                builds.map(build => {
                    return <BuildItem build={build} key={build.id}/>
                })
            }
            
        </div>
    )
}

export default BuildsList