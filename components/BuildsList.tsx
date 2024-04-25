import BuildItem from "./UIElements/BuildItem"

interface Props {
    builds: any[]
}

function BuildsList({ builds } : Props) {
    return (
        <div className="builds-list">
            {
                builds.map(build => {
                    return <BuildItem build={build}/>
                })
            }
        </div>
    )
}

export default BuildsList