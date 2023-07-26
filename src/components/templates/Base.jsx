import Card from "../atoms/Card"
import { Header } from "../organisms/Header"
import { Sidebar } from "../organisms/Sidebar"
import songs from "../../assets/json/songs.json"
import { Footer } from "../organisms/Footer"

export const Base = ({ children }) => {
    return (
        <div className="text-slate-300 bg-slate-950 p-2 min-h-screen box-border">
            <div className="flex flex-row gap-x-2">
                <Sidebar songs={songs} />
                <div className="basis-2/3">
                    <Card className="px-4">
                        <Header />
                        <main>
                            {children}
                        </main>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    )
}