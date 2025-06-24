import { RightComponent } from "./RightComponent"
import "./index.scss"

export const HomeScreen = () => {
    return (
        <div className="home-container">
            <div className="left">
                <div className="subleft">
                    <img src="logo-small.png"></img>
                    <h1>Code Box</h1>
                    <h2>Code. Compile. Conclude.</h2>
                    <button>Create Folder +</button>
                </div>
            </div>
            <div className="right">
                <RightComponent />
            </div>
        </div>
    )
}