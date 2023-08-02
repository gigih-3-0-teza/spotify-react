import {Base} from "../components/templates/Base.jsx";
import {useParams} from "react-router-dom";

const Playlist = () => {
    const {id} = useParams();
    console.log(id);
    return (
        <Base>

        </Base>
    )
}
export default Playlist;
