import { SongBreadcrumbs } from "../components/molecules/SongBreadcrumbs"
import { Base } from "../components/templates/Base"
import songs from "../assets/json/songs.json"
import { SongCard } from "../components/molecules/SongCard"

export const Home = () => {
    return (
        <Base>
            <SongBreadcrumbs title="Recently played" />
            <div className="grid grid-cols-4 gap-2 mb-5">
                {songs.map((song, index) => {
                    if (index < 4) {
                        return (
                            <SongCard song={song} key={song.id} />
                        )
                    }
                })}
            </div>
            <SongBreadcrumbs title="Today's biggest hits" />
            <div className="grid grid-cols-4 gap-2 mb-5">
                {songs.map((song, index) => {
                    if (index > 3 && index < 8) {
                        return (
                            <SongCard song={song} key={song.id} />
                        )
                    }
                })}
            </div>
            <SongBreadcrumbs title="Fresh new music" />
            <div className="grid grid-cols-4 gap-2 mb-8">
                {songs.map((song, index) => {
                    if (index > 5 && index < 10) {
                        return (
                            <SongCard song={song} key={song.id} />
                        )
                    }
                })}
            </div>
        </Base>
    )
}
