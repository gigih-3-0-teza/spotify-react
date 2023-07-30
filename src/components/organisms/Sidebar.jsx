import Card from "../atoms/Card"
import ListItem from "../atoms/ListItem"
import List from "../molecules/List"
import { SongCardVertical } from "../molecules/SongCardVertical"

export const Sidebar = ({ songs }) => {
    return (
        <aside className="basis-1/3 flex flex-col gap-y-2">
            <Card className="sticky top-0">
                <List>
                    <ListItem icon="home" text="Home" />
                    <ListItem icon="search" text="Search" />
                </List>
            </Card>
            <Card>
                <List className="mb-4">
                    <ListItem icon="book" text="Your Library" />
                </List>
                <div className="max-h-80 hover:overflow-y-scroll overflow-hidden hover:overscroll-none">
                    {songs.map((song) => {
                        return (
                            <SongCardVertical song={song} key={song.id} />
                        )
                    })}
                </div>
            </Card>
        </aside>
    )
}