import { changelogs } from "@/public/data"
import { todos } from "@/public/data/todos"

function Changelogs() {
  return (
    <div className="changelogs">
        <div style={{height: "40px"}}/>
        <div className="page-content">
            <div className="header">
                <h1>Changelogs</h1>
            </div>
            <div className="list">
            {
                changelogs.map((change, i) => (
                    <div className="change" key={i}>
                        <h3>{change.date}</h3>
                        <ul>
                            {change.changes.map((change, i) => (
                                <li key={i}>{change}</li>
                            ))}
                        </ul>
                    </div>
                ))
            }
            </div>
            <div style={{height:"24px"}}/>
            <div className="header">
                <h1>Todo List</h1>
            </div>
            <div className="list">
            <ul>
            {
                todos.map((todo, i) => (
                    <li style={{paddingBottom: "10px"}}key={i}>{todo}</li>
                ))
            }
            </ul>
            </div>
        </div>
    </div>
  )
}

export default Changelogs